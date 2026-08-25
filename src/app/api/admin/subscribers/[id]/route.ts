import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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

    const { id } = await params;
    const { action } = await req.json();

    if (!["unsubscribe", "reactivate"].includes(action)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid action",
        },
        { status: 400 }
      );
    }

    const subscriber =
      await prisma.newsletterSubscriber.findUnique({
        where: { id },
      });

    if (!subscriber) {
      return NextResponse.json(
        {
          success: false,
          message: "Subscriber not found",
        },
        { status: 404 }
      );
    }

    const updatedSubscriber =
      await prisma.newsletterSubscriber.update({
        where: { id },
        data:
          action === "unsubscribe"
            ? {
                unsubscribedAt: new Date(),
                unsubscribeRequestedAt: null,
              }
            : {
                unsubscribedAt: null,
                unsubscribeRequestedAt: null,
              },
      });

    return NextResponse.json(
      {
        success: true,
        message:
          action === "unsubscribe"
            ? "Subscriber unsubscribed successfully"
            : "Subscriber reactivated successfully",
        data: updatedSubscriber,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscriber update error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}