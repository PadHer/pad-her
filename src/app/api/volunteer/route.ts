// app/api/volunteer/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const email = body.email?.trim().toLowerCase();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email address",
        },
        { status: 400 }
      );
    }

    if (!body.firstName?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "First name is required",
        },
        { status: 400 }
      );
    }

    if (!body.lastName?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Last name is required",
        },
        { status: 400 }
      );
    }

    const volunteer = await prisma.volunteer.create({
      data: {
        email,
        firstName: body.firstName.trim(),
        lastName: body.lastName.trim(),
        phone: body.phone?.trim() || null,
        skills: body.skills || [],
        availability: body.availability || null,
        opportunityId: body.opportunityId || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Volunteer application submitted successfully",
        data: volunteer,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Volunteer submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}