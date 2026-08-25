// app/api/volunteer/route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const email = body.email?.trim().toLowerCase();
    const roleId = body.opportunityId?.trim();
    const skills = body.skills || [];
    const availability = body.availability || [];

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email address",
        },
        { status: 400 },
      );
    }

    if (!body.firstName?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "First name is required",
        },
        { status: 400 },
      );
    }

    if (!body.lastName?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Last name is required",
        },
        { status: 400 },
      );
    }

    if (!roleId) {
      return NextResponse.json(
        {
          success: false,
          message: "Volunteer role is required",
        },
        { status: 400 },
      );
    }

    const role = await prisma.volunteerRole.findUnique({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      return NextResponse.json(
        {
          success: false,
          message: "Selected volunteer role does not exist",
        },
        { status: 404 },
      );
    }

    const existingApplication = await prisma.volunteer.findFirst({
      where: {
        email,
        opportunityId: roleId,
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already applied for this role",
        },
        { status: 409 },
      );
    }

    const volunteer = await prisma.volunteer.create({
      data: {
        email,
        firstName: body.firstName.trim(),
        lastName: body.lastName.trim(),
        phone: body.phone?.trim() || null,
        skills: Array.isArray(skills)
          ? skills.map((skill: string) => skill.trim())
          : [],
        availability: Array.isArray(availability) ? availability : [],
        role: {
          connect: {
            id: roleId,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Volunteer application submitted successfully",
        data: volunteer,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Volunteer submission error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
