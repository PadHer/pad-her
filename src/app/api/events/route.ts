import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const createdEvents = await prisma.createEvent.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(createdEvents, { status: 200 });
  } catch (error) {
    console.error("Error fetching events", error);

    return NextResponse.json(
      {
        message: "Failed to fetch all events",
      },
      { status: 500 },
    );
  }
}
