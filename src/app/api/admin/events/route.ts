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

    const title = body.title?.trim();
    const type = body.type;
    const date = body.date ? new Date(body.date) : null;
    const location = body.location;
    const capacity = body.capacity || null;
    const imageUrl = body.imageUrl.trim() || null;
    const description = body.description?.trim();

    if (!title) {
      return NextResponse.json(
        {
          success: false,
          message: "Event title is required",
        },
        { status: 400 },
      );
    }

    if (!type) {
      return NextResponse.json(
        {
          success: false,
          message: "Event type is required",
        },
        { status: 400 },
      );
    }

    if (!date || Number.isNaN(date.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid event date is required",
        },
        { status: 400 },
      );
    }

    if (!location) {
      return NextResponse.json(
        {
          success: false,
          message: "Even location is required",
        },
        { status: 400 },
      );
    }

    // if (!imageUrl) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Event poster is required",
    //     },
    //     { status: 400 },
    //   );
    // }

    if (!description) {
      return NextResponse.json(
        {
          success: false,
          message: "Event description is required",
        },
        { status: 400 },
      );
    }

    const createEvent = await prisma.createEvent.create({
      data: {
        title,
        type,
        date,
        location,
        capacity,
        imageUrl,
        description,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "New event created",
        data: createEvent,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error creating event", error);
    return NextResponse.json(
      {
        message: "Failed to create event",
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
    const createdEvents = await prisma.createEvent.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            registrations: true,
          },
        },
      },
    });

    const events = createdEvents.map((event) => ({
      id: event.id,
      title: event.title,
      type: event.type,
      date: event.date,
      location: event.location,
      capacity: event.capacity,
      imageUrl: event.imageUrl,
      description: event.description,
      attendees: event._count.registrations,
      isOpen: !event.date || new Date() < event.date,
    }));

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching events", error);

    return NextResponse.json(
      {
        message: "Failed to fetch all events",
      },
      { status: 500 },
    );
  }
}
