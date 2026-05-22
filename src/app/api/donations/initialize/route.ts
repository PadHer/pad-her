// app/api/donations/initialize/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import axios from "axios";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      donationAmount,
      donationType,
      donorName,
      donorEmail,
      isAnon,
    } = body;

    if (!donationAmount || donationAmount < 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Minimum donation is ₦100",
        },
        { status: 400 }
      );
    }

    if (!donorEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    // Generate unique reference
    const reference = crypto.randomUUID();

    // Save pending donation
    await prisma.donation.create({
      data: {
        donationAmount,
        donationType,
        donorName,
        donorEmail,
        isAnon,
        reference,
        status: "pending",
      },
    });

    // Initialize Paystack transaction
    const paystackResponse = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: donorEmail,
        amount: donationAmount * 100, // Kobo
        reference,
        metadata: {
          donorName,
          donationType,
        },
        callback_url:
          "http://localhost:3000/donation/success",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(
      {
        success: true,
        authorization_url:
          paystackResponse.data.data.authorization_url,
        reference,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Donation initialization error:",
      error?.response?.data || error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to initialize payment",
      },
      { status: 500 }
    );
  }
}