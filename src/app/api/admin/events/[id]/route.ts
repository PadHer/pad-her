import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const event = await prisma.eventRegistration.findUnique({
      where: {
        id,
      },
      
    });

    if (!event) {
      return NextResponse.json(
        {
          message: "Event not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    console.error("Error fetching event", error);

    return NextResponse.json(
      {
        message: "Failed to fetch event",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const body = await request.json();

    const { title, type, date, capacity, description, imageUrl } = body;

    const existingEvent = prisma.createEvent.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            registrations: true,
          },
        },
      },
    });

    if (!existingEvent) {
      return NextResponse.json(
        {
          message: "Event not found",
        },
        { status: 404 },
      );
    }
    if (capacity !== undefined && (!Number.isInteger(capacity) || capacity < 1)) {
      return NextResponse.json(
        {
          message: "Capacity must be a positive integer",
        },
        { status: 400 },
      );
    }

    const event = await prisma.createEvent.update({
        where: {
            id,
        },
        data: {
            ...(title !== undefined && { title }),
            ...(type !== undefined && { type }),
            ...(capacity !== undefined && { capacity }),
            ...(description !== undefined && { description }),
            ...(imageUrl !== undefined && { imageUrl }),
            ...(date !== undefined && { date }),
        }
    });

    return NextResponse.json(
        {
            message: "Event successfully updated",
            event,
        },
        { status: 200}
    )
  } catch (error) {
    console.error("Error updating event", error);

    return NextResponse.json(
      {
        message: "Failed to event",
      },
      { status: 500 },
    );
  }
};

export async function DELETE(_request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const existingEvent = await prisma.createEvent.findUnique({
      where: {
        id,
      },
    });

    if (!existingEvent) {
      return NextResponse.json(
        {
          message: "Event not found",
        },
        { status: 404 },
      );
    }

    await prisma.createEvent.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      {
        message: "Even deleted successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting event:", error);

    return NextResponse.json(
      {
        message: "Failed to delete event",
      },
      { status: 500 },
    );
  }
}
