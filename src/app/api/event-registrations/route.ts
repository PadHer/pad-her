// app/api/events/register/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const fullName = body.fullName?.trim();
    const emailAddress = body.emailAddress?.trim().toLowerCase();
    const phoneNumber = body.phoneNumber?.trim();
    const location = body.location?.trim();
    const whyInterest = body.whyInterest?.trim();
    const isAgreed = body.isAgreed;

    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: "Full name is required",
        },
        { status: 400 }
      );
    }

    if (
      !emailAddress ||
      !/\S+@\S+\.\S+/.test(emailAddress)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "A valid email address is required",
        },
        { status: 400 }
      );
    }

    if (!phoneNumber || phoneNumber.length < 11) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number is required",
        },
        { status: 400 }
      );
    }

    if (!location) {
      return NextResponse.json(
        {
          success: false,
          message: "Location is required",
        },
        { status: 400 }
      );
    }

    if (!whyInterest || whyInterest.length < 20) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please share at least a sentence (min 20 characters)",
        },
        { status: 400 }
      );
    }

    if (!isAgreed) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You must agree to the terms to continue",
        },
        { status: 400 }
      );
    }

    const registration =
      await prisma.eventRegistration.create({
        data: {
          fullName,
          emailAddress,
          phoneNumber,
          location,
          whyInterest,
          isAgreed,
        },
      });

    return NextResponse.json(
      {
        success: true,
        message: "Event registration submitted successfully",
        data: registration,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Event registration error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}