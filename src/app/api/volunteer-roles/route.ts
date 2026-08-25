import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  

  try {
    const volunteerRoles = await prisma.volunteerRole.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            applicants: true,
          },
        },
      },
    });

    const roles = volunteerRoles.map((role) => ({
      id: role.id,
      roleTitle: role.roleTitle,
      description: role.description,
      requirements: role.requirements,
      isOpen:
        role._count.applicants < role.slots &&
        (!role.applicationDeadline || new Date() < role.applicationDeadline),
    }));

    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    console.error("Error fetching volunteer roles:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch volunteer roles",
      },
      { status: 500 },
    );
  }
}