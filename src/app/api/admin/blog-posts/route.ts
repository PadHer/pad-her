import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/middleware/adminAuth";
import prisma from "@/lib/prisma";
import { blogPostInputSchema, BlogStatus } from "@/schemas/BlogSchema";
import { Prisma } from "@/generated/prisma/client";


export async function POST(request: NextRequest) {
  if (!(await adminAuth())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const parsed = blogPostInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid blog post data",
          errors: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const existingPost = await prisma.blogPost.findUnique({
      where: {
        slug: data.slug,
      },
    });

    if (existingPost) {
      return NextResponse.json(
        {
          message: "A blog post with this slug already exists",
        },
        { status: 409 }
      );
    }

    const status = data.status ?? BlogStatus.DRAFT;

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt ?? "",
        content: data.content as Prisma.InputJsonValue,
        featuredImage: data.featuredImage ?? null,
        author: data.author ?? "PadHer Team",
        category: data.category,
        tags: data.tags ?? [],
        status,
        publishedAt:
          status === BlogStatus.PUBLISHED ? new Date() : null,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Create blog post error:", error);

    return NextResponse.json(
      {
        message: "Failed to create blog post",
      },
      { status: 500 }
    );
  }
};

export async function GET(request: NextRequest) {
  if (!(await adminAuth())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim();
    const statusParam = searchParams.get("status");
    const status = Object.values(BlogStatus).includes(statusParam as BlogStatus)
      ? (statusParam as BlogStatus)
      : undefined;

    const posts = await prisma.blogPost.findMany({
      where: {
        ...(status && { status }),
        ...(search && {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { author: { contains: search, mode: "insensitive" } },
            { excerpt: { contains: search, mode: "insensitive" } },
            { tags: { has: search } },
          ],
        }),
      },
      orderBy: {
        updatedAt: "desc",
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