import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

const VALID_STATUSES = ["PENDING", "ACCEPTED", "REJECTED"] as const;

type ApplicationStatus = (typeof VALID_STATUSES)[number];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

  try {
    const { id } = await params;
    const body = await req.json();

    const status = body.status?.toUpperCase();

    if (!status || !VALID_STATUSES.includes(status as ApplicationStatus)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid application status",
        },
        { status: 400 }
      );
    }

    const applicationId = Number(id);

    if (isNaN(applicationId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid application ID",
        },
        { status: 400 }
      );
    }

    const application = await prisma.volunteer.findUnique({
      where: {
        id: applicationId,
      },
    });

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message: "Application not found",
        },
        { status: 404 }
      );
    }

    const updatedApplication = await prisma.volunteer.update({
      where: {
        id: applicationId,
      },
      data: {
        status: status as ApplicationStatus,
      },
      include: {
        role: {
          select: {
            id: true,
            roleTitle: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Application status updated successfully",
        data: {
          id: updatedApplication.id,
          name: `${updatedApplication.firstName} ${updatedApplication.lastName}`,
          email: updatedApplication.email,
          roleId: updatedApplication.opportunityId,
          roleName: updatedApplication.role?.roleTitle,
          appliedDate: updatedApplication.createdAt,
          status: updatedApplication.status.toLowerCase(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update application status:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update application status",
      },
      { status: 500 }
    );
  }
};



export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

  try {
    const { id } = await params;
    const applicationId = Number(id);

    if (isNaN(applicationId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid application ID",
        },
        { status: 400 }
      );
    }

    const application = await prisma.volunteer.findUnique({
      where: {
        id: applicationId,
      },
      include: {
        role: {
          select: {
            id: true,
            roleTitle: true,
            category: true,
            description: true,
            requirements: true,
            slots: true,
            applicationDeadline: true,
          },
        },
      },
    });

    if (!application) {
      return NextResponse.json(
        {
          success: false,
          message: "Application not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id: application.id,

          // Applicant details
          firstName: application.firstName,
          lastName: application.lastName,
          name: `${application.firstName} ${application.lastName}`,
          email: application.email,
          phone: application.phone,

          // Application details
          skills: application.skills,
          availability: application.availability,
          additionalNotes: application.additionalNotes,
          status: application.status,

          // Dates
          appliedDate: application.createdAt,
          updatedAt: application.updatedAt,

          // Role details
          role: application.role?.roleTitle,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch volunteer application:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch volunteer application",
      },
      { status: 500 }
    );
  }
}