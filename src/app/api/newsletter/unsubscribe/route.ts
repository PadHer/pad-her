import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const email = body.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "A valid email address is required",
        },
        { status: 400 }
      );
    }

    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (!subscriber) {
      return NextResponse.json(
        {
          success: false,
          message: "If this email is subscribed, your unsubscribe request has been submitted.",
        },
        { status: 404 }
      );
    }

    // Already unsubscribed
    if (subscriber.unsubscribedAt) {
      return NextResponse.json(
        {
          success: true,
          message: "This email is already unsubscribed",
        },
        { status: 200 }
      );
    }

    // Request already submitted
    if (subscriber.unsubscribeRequestedAt) {
      return NextResponse.json(
        {
          success: true,
          message: "Your unsubscribe request has already been submitted",
        },
        { status: 200 }
      );
    }

    const updatedSubscriber =
      await prisma.newsletterSubscriber.update({
        where: { email },
        data: {
          unsubscribeRequestedAt: new Date(),
        },
      });

    return NextResponse.json(
      {
        success: true,
        message:
          "Your unsubscribe request has been submitted. Our team will process it shortly.",
        data: updatedSubscriber,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter unsubscribe request error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}