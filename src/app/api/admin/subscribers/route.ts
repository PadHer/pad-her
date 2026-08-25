import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (
    !session?.user ||
    session.user.role !== "admin"
  ) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const subscribers =
      await prisma.newsletterSubscriber.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      data: subscribers,
    });
  } catch (error) {
    console.error(
      "Failed to fetch newsletter subscribers:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch subscribers",
      },
      { status: 500 }
    );
  }
}