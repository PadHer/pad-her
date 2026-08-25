// app/api/events/register/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const eventId = body.eventId?.trim();
    const fullName = body.fullName?.trim();
    const emailAddress = body.emailAddress?.trim().toLowerCase();
    const phoneNumber = body.phoneNumber?.trim();
    const location = body.location?.trim();
    const whyInterest = body.whyInterest?.trim();
    const isAgreed = body.isAgreed;

    // Event
    if (!eventId) {
      return NextResponse.json(
        {
          success: false,
          message: "Event is required",
        },
        { status: 400 }
      );
    }

    // Full name
    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        {
          success: false,
          message: "Full name is required",
        },
        { status: 400 }
      );
    }

    // Email
    if (
      !emailAddress ||
      !/^\S+@\S+\.\S+$/.test(emailAddress)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "A valid email address is required",
        },
        { status: 400 }
      );
    }

    // Phone
    if (!phoneNumber || phoneNumber.length < 11) {
      return NextResponse.json(
        {
          success: false,
          message: "Phone number is required",
        },
        { status: 400 }
      );
    }

    // Location
    if (!location) {
      return NextResponse.json(
        {
          success: false,
          message: "Location is required",
        },
        { status: 400 }
      );
    }

    // Why interested
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

    // Agreement
    if (!isAgreed) {
      return NextResponse.json(
        {
          success: false,
          message: "You must agree to the terms to continue",
        },
        { status: 400 }
      );
    }

    // Check that event exists
    const event = await prisma.createEvent.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: "Event not found",
        },
        { status: 404 }
      );
    }

    // Check if applicant has already registered
    const existingRegistration =
      await prisma.eventRegistration.findUnique({
        where: {
          eventId_emailAddress: {
            eventId,
            emailAddress,
          },
        },
      });

    if (existingRegistration) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already registered for this event",
        },
        { status: 409 }
      );
    }

    // Check capacity
    if (event.capacity !== null) {
      const registrationCount =
        await prisma.eventRegistration.count({
          where: {
            eventId,
          },
        });

      if (registrationCount >= event.capacity) {
        return NextResponse.json(
          {
            success: false,
            message: "This event is already full",
          },
          { status: 409 }
        );
      }
    }

    // Create registration
    const registration =
      await prisma.eventRegistration.create({
        data: {
          eventId,
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