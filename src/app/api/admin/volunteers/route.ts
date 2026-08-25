import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const applications = await prisma.volunteer.findMany({
      where: status
        ? {
            status: status.toUpperCase() as "PENDING" | "ACCEPTED" | "REJECTED",
          }
        : undefined,

      include: {
        role: {
          select: {
            id: true,
            roleTitle: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    const applicants = applications.map((application) => ({
      id: application.id,
      name: `${application.firstName} ${application.lastName}`,
      email: application.email,
      roleId: application.opportunityId,
      roleName: application.role?.roleTitle,
      appliedDate: application.createdAt,
      status: application.status,
    }));

    return NextResponse.json(
      {
        success: true,
        data: applicants,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to fetch volunteer applications:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch volunteer applications",
      },
      { status: 500 },
    );
  }
}
