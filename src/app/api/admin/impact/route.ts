import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateKey } from "@/helpers/generateKey";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const impactStats = await prisma.impactStat.findMany({
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
    console.error("Error fetching impact stats:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch impact stats",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { label, value, description, icon } = body;

    if (typeof value !== "number" || value < 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Value must be a non-negative number",
        },
        { status: 400 },
      );
    }

    if (!label) {
      return NextResponse.json(
        {
          success: false,
          message: "Label is required",
        },
        { status: 400 },
      );
    }

    const key = generateKey(label);

    const existingStat = await prisma.impactStat.findUnique({
      where: { key },
    });

    if (existingStat) {
      return NextResponse.json(
        {
          success: false,
          message: "An impact stat with this key already exists",
        },
        { status: 409 },
      );
    }

    const impactStat = await prisma.impactStat.create({
      data: {
        key,
        label,
        value,
        description: description || null,
        icon: icon || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Impact stat created successfully",
        data: impactStat,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating impact stat:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create impact stat",
      },
      { status: 500 },
    );
  }
}
