// app/api/donations/initialize/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import axios from "axios";
import crypto from "crypto";
import { z } from "zod";
import { PaystackInitializeResponse } from "@/types/paystack";

const supportedCurrencies = ["NGN", "USD"] as const;

const donationSchema = z.object({
  donationAmount: z.number().positive("Donation amount must be greater than 0"),

  currency: z.enum(supportedCurrencies).default("NGN"),

  donationType: z.string().min(1, "Donation type is required"),

  donorName: z.string().min(1, "Donor name is required"),

  donorEmail: z.string().email("Invalid email address"),

  isAnon: z.boolean().default(false),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = donationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message ?? "Invalid donation data",
        },
        { status: 400 },
      );
    }

    const {
      donationAmount,
      currency,
      donationType,
      donorName,
      donorEmail,
      isAnon,
    } = parsed.data;

    // Currency-specific minimum donation
    const minimumDonation = currency === "NGN" ? 1000 : 1;

    if (donationAmount < minimumDonation) {
      return NextResponse.json(
        {
          success: false,
          message:
            currency === "NGN"
              ? "Minimum donation is ₦1,000"
              : "Minimum donation is $1",
        },
        { status: 400 },
      );
    }

    // Convert amount to the smallest currency unit:
    // NGN → Kobo
    // USD → Cents
    const amountInSubunit = Math.round(donationAmount * 100);

    // Generate unique transaction reference
    const reference = crypto.randomUUID();

    // Initialize transaction with Paystack
    const paystackResponse = await axios.post<PaystackInitializeResponse>(
      "https://api.paystack.co/transaction/initialize",
      {
        email: donorEmail,
        amount: amountInSubunit,
        currency,
        reference,

        metadata: {
          donorName,
          donationType,
          isAnon,
          currency,
        },

        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/donate/success`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const authorizationUrl = paystackResponse.data.data.authorization_url;

    if (!authorizationUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to generate payment authorization URL",
        },
        { status: 502 },
      );
    }

    // Save the pending donation only after
    // Paystack successfully initializes it.
    await prisma.donation.create({
      data: {
        donationAmount: amountInSubunit,
        currency,
        donationType,
        donorName,
        donorEmail,
        isAnon,
        reference,
        status: "pending",
      },
    });

    return NextResponse.json(
      {
        success: true,
        authorization_url: authorizationUrl,
        reference,
        currency,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "response" in error) {
      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
          };
          status?: number;
        };
      };

      console.error(
        "Donation initialization error:",
        axiosError.response?.data,
      );

      return NextResponse.json(
        {
          message:
            axiosError.response?.data?.message ||
            "Unable to initialize donation",
        },
        {
          status: axiosError.response?.status || 500,
        },
      );
    }

    console.error("Donation initialization error:", error);

    return NextResponse.json(
      {
        message: "Unable to initialize donation",
      },
      { status: 500 },
    );
  }
}
