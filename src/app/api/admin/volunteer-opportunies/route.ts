import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const roleTitle = body.roleTitle?.trim();
    const description = body.description?.trim();
    const requirements = body.requirements?.trim();
    const slots = body.slots;

    if (!roleTitle) {
      return NextResponse.json(
        {
          success: false,
          message: "Role title is required",
        },
        { status: 400 },
      );
    }

    if (!description) {
      return NextResponse.json(
        {
          success: false,
          message: "Role Description is required",
        },
        { status: 400 },
      );
    }

    if (!requirements) {
        return NextResponse.json(
            {
                success: false,
                message: " Role requirements is required"
            },
            { status: 400 }
        )
    }
    if (!slots) {
        return NextResponse.json(
            {
                success: false,
                message: "Number slots for the role is required"
            },
            { status: 400}
        )
    }

    const volunteerRole = await prisma.volunteerRole.create({
        data: {
            roleTitle,
            description,
            requirements,
            slots
        },
    });

    return NextResponse.json(
        {
            success: true,
            message: "New Volunteer role added",
            data: volunteerRole
        },
        { status: 200 }
    )
  } catch (error) {}
}
