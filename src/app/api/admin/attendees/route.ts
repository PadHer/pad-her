import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  try {
    const registrations = await prisma.eventRegistration.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            date: true,
            location: true,
          },
        },
      },
    });

    const formattedRegistrations = registrations.map(
      (registration) => ({
        id: registration.id,
        fullName: registration.fullName,
        emailAddress: registration.emailAddress,
        phoneNumber: registration.phoneNumber,
        location: registration.location,
        whyInterest: registration.whyInterest,
        isAgreed: registration.isAgreed,
        registeredDate: registration.createdAt,

        event: {
          id: registration.event.id,
          title: registration.event.title,
          date: registration.event.date,
          location: registration.event.location,
        },
      })
    );

    return NextResponse.json(
      {
        success: true,
        data: formattedRegistrations,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch event registrations:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch event registrations",
      },
      { status: 500 }
    );
  }
}