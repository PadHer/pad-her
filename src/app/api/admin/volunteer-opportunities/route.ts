import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const roleTitle = body.roleTitle?.trim();
    const description = body.description?.trim();
    const requirements = body.requirements?.trim();
    const category = body.category?.trim();
    const slots = Number(body.slots);
    const applicationDeadline = body.applicationDeadline
      ? new Date(body.applicationDeadline)
      : null;

    if (!roleTitle) {
      return NextResponse.json(
        {
          success: false,
          message: "Role title is required",
        },
        { status: 400 },
      );
    }

    if (!description) {
      return NextResponse.json(
        {
          success: false,
          message: "Role Description is required",
        },
        { status: 400 },
      );
    }

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Role category is required",
        },
        { status: 400 },
      );
    }

    if (!requirements) {
      return NextResponse.json(
        {
          success: false,
          message: " Role requirements is required",
        },
        { status: 400 },
      );
    }
    if (isNaN(slots) || slots <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Slots must be a positive number",
        },
        { status: 400 },
      );
    }

    if (applicationDeadline && Number.isNaN(applicationDeadline.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid application deadline",
        },
        { status: 400 },
      );
    }

    const volunteerRole = await prisma.volunteerRole.create({
      data: {
        roleTitle,
        description,
        requirements,
        category,
        slots,
        applicationDeadline,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "New Volunteer role added",
        data: volunteerRole,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

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
      slots: role.slots,
      applicationDeadline: role.applicationDeadline,
      applicantCount: role._count.applicants,
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
