import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const impactStats = await prisma.impactStat.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: impactStats,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching public impact stats:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch impact stats",
      },
      { status: 500 },
    );
  }
}
