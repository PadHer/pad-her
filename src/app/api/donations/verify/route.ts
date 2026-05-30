// app/api/donations/verify/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import axios from "axios";
import { PaystackVerifyResponse } from "@/types/paystack";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { reference } = body;

    if (!reference) {
      return NextResponse.json(
        {
          success: false,
          message: "Reference is required",
        },
        { status: 400 }
      );
    }

    const response = await axios.get<PaystackVerifyResponse>(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const paymentData = response.data.data;

    if (paymentData.status === "success") {
      await prisma.donation.update({
        where: { reference },
        data: {
          status: "successful",
        },
      });

      return NextResponse.json({
        success: true,
        message: "Payment verified",
      });
    }

    await prisma.donation.update({
      where: { reference },
      data: {
        status: "failed",
      },
    });

    return NextResponse.json(
      {
        success: false,
        message: "Payment failed",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Verification error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Verification failed",
      },
      { status: 500 }
    );
  }
}