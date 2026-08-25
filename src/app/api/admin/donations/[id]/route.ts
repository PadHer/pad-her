import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {

    const { id } = await params;

    const body = await req.json();
    const { action } = body;

    if (action !== "confirm") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid action",
        },
        { status: 400 },
      );
    }

    const donation = await prisma.donation.findUnique({
      where: { id },
    });

    if (!donation) {
      return NextResponse.json(
        {
          success: false,
          message: "Donation not found",
        },
        { status: 404 },
      );
    }

    // Only pending donations can be confirmed.
    if (donation.status !== "pending") {
      return NextResponse.json(
        {
          success: false,
          message: `This donation cannot be confirmed because its status is "${donation.status}".`,
        },
        { status: 400 },
      );
    }

    const updatedDonation = await prisma.donation.update({
      where: { id },
      data: {
        status: "successful",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Donation confirmed successfully",
        donation: updatedDonation,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Donation confirmation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to confirm donation",
      },
      { status: 500 },
    );
  }
}
