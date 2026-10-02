import prisma from "@/lib/prisma";
import { BlogStatus } from "@/schemas/BlogSchema";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const { searchParams } = new URL(request.url);

    const { slug } = await params;
    const tagsParam = searchParams.get("tags");

    if (!slug) {
      return NextResponse.json(
        {
          message: "Slug is required.",
        },
        { status: 400 },
      );
    }

    const tags = tagsParam
      ? tagsParam
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [];

    if (!tags.length) {
      return NextResponse.json([]);
    }

    const posts = await prisma.blogPost.findMany({
      where: {
        status: BlogStatus.PUBLISHED,

        // Don't recommend the article currently being viewed
        slug: {
          not: slug,
        },

        // At least one tag must match
        tags: {
          hasSome: tags,
        },
      },

      orderBy: {
        publishedAt: "desc",
      },

      take: 3,

      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        featuredImage: true,
        author: true,
        category: true,
        tags: true,
        status: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Related blog posts error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch related blog posts.",
      },
      { status: 500 },
    );
  }
}