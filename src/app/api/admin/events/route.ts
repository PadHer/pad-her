import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { success } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const title = body.title?.trim();
    const type = body.type;
    const date = body.date;
    const location = body.location;
    const capacity = body.capacity;
    const imageUrl = body.imageUrl.trim();
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
    if (!date) {
      return NextResponse.json(
        {
          success: false,
          message: "Event date is required",
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

    if (!imageUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "Event poster is required",
        },
        { status: 400 },
      );
    }

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
  } catch (error) {}
}
