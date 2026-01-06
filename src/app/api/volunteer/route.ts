import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      emailAddress,
      phoneNumber,
      interest,
      whyVolunteer,
      isAgree,
    } = body;

    // Basic validation (server-side safety)
    if (
      !fullName ||
      !emailAddress ||
      !interest ||
      !whyVolunteer ||
      !isAgree
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const volunteer = await prisma.volunteer.create({
      data: {
        fullName,
        emailAddress,
        phoneNumber,
        interest,
        whyVolunteer,
        isAgree,
      },
    });

    return NextResponse.json(
      { message: "Volunteer registered successfully", volunteer },
      { status: 201 }
    );
  } catch (error) {
    console.error("Volunteer registration error:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
