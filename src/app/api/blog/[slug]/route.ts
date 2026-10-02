import { NextRequest, NextResponse } from "next/server";
import  prisma from "@/lib/prisma";
import { BlogStatus } from "@/schemas/BlogSchema";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { slug } = await params;

    const post = await prisma.blogPost.findFirst({
      where: { slug, status: BlogStatus.PUBLISHED },
    });

    if (!post) {
      return NextResponse.json(
        {
          message: "Blog post not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Get blog post error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch blog post",
      },
      { status: 500 }
    );
  }
}