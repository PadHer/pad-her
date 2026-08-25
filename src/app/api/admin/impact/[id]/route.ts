import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateKey } from "@/helpers/generateKey";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  req: Request,
  { params }: RouteContext
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const body = await req.json();

    const {
      label,
      value,
      description,
      icon,
    } = body;

    const existingStat = await prisma.impactStat.findUnique({
      where: { id },
    });

    if (!existingStat) {
      return NextResponse.json(
        {
          success: false,
          message: "Impact stat not found",
        },
        { status: 404 }
      );
    }

    if (value !== undefined && (typeof value !== "number" || value < 0)) {
      return NextResponse.json(
        {
          success: false,
          message: "Value must be a non-negative number",
        },
        { status: 400 }
      );
    }

    const key = generateKey(label);

    if (key && key !== existingStat.key) {
      const duplicateKey = await prisma.impactStat.findUnique({
        where: { key },
      });

      if (duplicateKey) {
        return NextResponse.json(
          {
            success: false,
            message: "An impact stat with this key already exists",
          },
          { status: 409 }
        );
      }
    }

    const updatedStat = await prisma.impactStat.update({
      where: { id },
      data: {
        ...(key !== undefined && { key }),
        ...(label !== undefined && { label }),
        ...(value !== undefined && { value }),
        ...(description !== undefined && { description }),
        ...(icon !== undefined && { icon }),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Impact stat updated successfully",
        data: updatedStat,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating impact stat:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update impact stat",
      },
      { status: 500 }
    );
  }
}