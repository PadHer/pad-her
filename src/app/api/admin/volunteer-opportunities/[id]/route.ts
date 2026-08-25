import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const volunteerRole = await prisma.volunteerRole.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            applicants: true,
          },
        },
      },
    });

    if (!volunteerRole) {
      return NextResponse.json(
        {
          message: "Volunteer role not found",
        },
        { status: 404 },
      );
    }

    const applicantCount = volunteerRole._count.applicants;

    return NextResponse.json(
      {
        ...volunteerRole,
        applicantCount,
        isOpen:
          applicantCount < volunteerRole.slots &&
          (!volunteerRole.applicationDeadline ||
            new Date() < volunteerRole.applicationDeadline),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching volunteer role:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch volunteer role",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { roleTitle, description, requirements, slots, applicationDeadline } =
      body;

    // Check if role exists
    const existingRole = await prisma.volunteerRole.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            applicants: true,
          },
        },
      },
    });

    if (!existingRole) {
      return NextResponse.json(
        {
          message: "Volunteer role not found",
        },
        { status: 404 },
      );
    }

    // Validate slots if provided
    if (slots !== undefined && (!Number.isInteger(slots) || slots < 1)) {
      return NextResponse.json(
        {
          message: "Slots must be a positive integer",
        },
        { status: 400 },
      );
    }

    // Don't allow reducing slots below current applicants
    if (slots !== undefined && slots < existingRole._count.applicants) {
      return NextResponse.json(
        {
          message: `Slots cannot be less than the current number of applicants (${existingRole._count.applicants})`,
        },
        { status: 400 },
      );
    }

    // Validate deadline
    if (applicationDeadline) {
      const deadline = new Date(applicationDeadline);

      if (Number.isNaN(deadline.getTime())) {
        return NextResponse.json(
          {
            message: "Invalid application deadline",
          },
          { status: 400 },
        );
      }
    }

    const volunteerRole = await prisma.volunteerRole.update({
      where: {
        id,
      },
      data: {
        ...(roleTitle !== undefined && { roleTitle }),
        ...(description !== undefined && { description }),
        ...(requirements !== undefined && { requirements }),
        ...(slots !== undefined && { slots }),
        ...(applicationDeadline !== undefined && {
          applicationDeadline: applicationDeadline
            ? new Date(applicationDeadline)
            : null,
        }),
      },
    });

    return NextResponse.json(
      {
        message: "Volunteer role updated successfully",
        volunteerRole,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating volunteer role:", error);

    return NextResponse.json(
      {
        message: "Failed to update volunteer role",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const existingRole = await prisma.volunteerRole.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            applicants: true,
          },
        },
      },
    });

    if (!existingRole) {
      return NextResponse.json(
        {
          message: "Volunteer role not found",
        },
        { status: 404 },
      );
    }

    // Prevent deleting a role that already has applicants
    if (existingRole._count.applicants > 0) {
      return NextResponse.json(
        {
          message:
            "This volunteer role cannot be deleted because it has applicants.",
        },
        { status: 400 },
      );
    }

    await prisma.volunteerRole.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        message: "Volunteer role deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting volunteer role:", error);

    return NextResponse.json(
      {
        message: "Failed to delete volunteer role",
      },
      { status: 500 },
    );
  }
}
