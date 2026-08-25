import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    if (!/\S+@\S+\.\S+/.test(normalizedEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email address",
        },
        { status: 400 }
      );
    }

    const existingSubscriber =
      await prisma.newsletterSubscriber.findUnique({
        where: {
          email: normalizedEmail,
        },
      });

    if (existingSubscriber) {
      return NextResponse.json(
        {
          success: true,
          message: "You are already subscribed",
          data: existingSubscriber,
        },
        { status: 200 }
      );
    }

    const subscriber =
      await prisma.newsletterSubscriber.create({
        data: {
          email: normalizedEmail,
        },
      });

    return NextResponse.json(
      {
        success: true,
        message: "Subscribed successfully",
        data: subscriber,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}