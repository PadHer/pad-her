// app/api/donations/verify/route.ts

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";
import { PaystackVerifyResponse } from "@/types/paystack";
import { z } from "zod";

const verifySchema = z.object({
  reference: z.string().min(1, "Reference is required"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = verifySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            parsed.error.issues[0]?.message ??
            "Invalid verification request",
        },
        { status: 400 }
      );
    }

    const { reference } = parsed.data;

    // Find our donation first
    const donation = await prisma.donation.findUnique({
      where: { reference },
    });

    if (!donation) {
      return NextResponse.json(
        {
          success: false,
          message: "Donation not found",
        },
        { status: 404 }
      );
    }

    // Don't process an already successful donation again
    if (donation.status === "successful") {
      return NextResponse.json({
        success: true,
        message: "Payment already verified",
      });
    }

    // Verify transaction with Paystack
    const response = await axios.get<PaystackVerifyResponse>(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(
        reference
      )}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paymentData = response.data.data;

    // Confirm reference matches
    if (paymentData.reference !== donation.reference) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment reference mismatch",
        },
        { status: 400 }
      );
    }

    // Confirm currency matches
    if (paymentData.currency !== donation.currency) {
      await prisma.donation.update({
        where: { reference },
        data: {
          status: "failed",
        },
      });

      return NextResponse.json(
        {
          success: false,
          message: "Payment currency mismatch",
        },
        { status: 400 }
      );
    }

    // Confirm amount matches
    if (paymentData.amount !== donation.donationAmount) {
      await prisma.donation.update({
        where: { reference },
        data: {
          status: "failed",
        },
      });

      return NextResponse.json(
        {
          success: false,
          message: "Payment amount mismatch",
        },
        { status: 400 }
      );
    }

    // Payment successful
    if (paymentData.status === "success") {
      await prisma.donation.update({
        where: { reference },
        data: {
          status: "successful",
        },
      });

      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
      });
    }

    // Payment was not successful
    await prisma.donation.update({
      where: { reference },
      data: {
        status: "failed",
      },
    });

    return NextResponse.json(
      {
        success: false,
        message: "Payment was not successful",
      },
      { status: 400 }
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