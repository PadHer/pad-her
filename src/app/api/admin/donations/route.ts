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
    const donations = await prisma.donation.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedDonations = donations.map((donation) => ({
      ...donation,
      donationAmount: donation.donationAmount / 100,
    }));

    return NextResponse.json(
      {
        success: true,
        donations: formattedDonations,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Fetch donations error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch donations",
      },
      { status: 500 },
    );
  }
}
