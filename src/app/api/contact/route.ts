// app/api/contact/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const fullName = body.fullName?.trim();
    const organisation = body.organisation?.trim();
    const emailAddress = body.emailAddress?.trim().toLowerCase();
    const phoneNumber = body.phoneNumber?.trim();
    const typeOfEnquiry = body.typeOfEnquiry?.trim();
    const website = body.website?.trim();
    const message = body.message?.trim();

    if (!fullName) {
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

   

    if (!typeOfEnquiry) {
      return NextResponse.json(
        {
          success: false,
          message: "Type of enquiry is required",
        },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          message: "Message is required",
        },
        { status: 400 }
      );
    }

    const contactMessage =
      await prisma.contactMessage.create({
        data: {
          fullName,
          organisation,
          emailAddress,
          phoneNumber,
          typeOfEnquiry,
          website,
          message,
        },
      });

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
        data: contactMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}