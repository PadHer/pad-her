import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { BlogStatus } from "@/schemas/BlogSchema";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: BlogStatus.PUBLISHED,
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("List blog posts error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch blog posts",
      },
      { status: 500 }
    );
  }
}