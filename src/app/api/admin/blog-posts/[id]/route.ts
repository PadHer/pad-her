import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/middleware/adminAuth";
import  prisma from "@/lib/prisma";
import { blogPostUpdateSchema, BlogStatus } from "@/schemas/BlogSchema";
import { Prisma } from "@/generated/prisma/client";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  if (!(await adminAuth())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const post = await prisma.blogPost.findUnique({
      where: { id },
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

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  if (!(await adminAuth())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const parsed = blogPostUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid blog post data",
          errors: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json(
        {
          message: "Blog post not found",
        },
        { status: 404 }
      );
    }

    if (parsed.data.slug) {
      const slugExists = await prisma.blogPost.findFirst({
        where: {
          slug: parsed.data.slug,
          NOT: {
            id,
          },
        },
      });

      if (slugExists) {
        return NextResponse.json(
          {
            message: "A blog post with this slug already exists",
          },
          { status: 409 }
        );
      }
    }

    const data = parsed.data;

const post = await prisma.blogPost.update({
  where: { id },
  data: {
    ...(data.title !== undefined && {
      title: data.title,
    }),

    ...(data.slug !== undefined && {
      slug: data.slug,
    }),

    ...(data.excerpt !== undefined && {
      excerpt: data.excerpt,
    }),

    ...(data.content !== undefined && {
      content: data.content as Prisma.InputJsonValue,
    }),

    ...(data.featuredImage !== undefined && {
      featuredImage: data.featuredImage,
    }),

    ...(data.author !== undefined && {
      author: data.author,
    }),

    ...(data.category !== undefined && {
      category: data.category,
    }),

    ...(data.tags !== undefined && {
      tags: data.tags,
    }),

    ...(data.status !== undefined && {
      status: data.status,
    }),

    // Keep publishedAt in sync when the status changes through a regular save
    ...(data.status === BlogStatus.PUBLISHED &&
      existingPost.status !== BlogStatus.PUBLISHED && {
        publishedAt: new Date(),
      }),

    ...(data.status === BlogStatus.DRAFT && {
      publishedAt: null,
    }),
  },
});

    return NextResponse.json(post);
  } catch (error) {
    console.error("Update blog post error:", error);

    return NextResponse.json(
      {
        message: "Failed to update blog post",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {
  if (!(await adminAuth())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json(
        {
          message: "Blog post not found",
        },
        { status: 404 }
      );
    }

    await prisma.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    console.error("Delete blog post error:", error);

    return NextResponse.json(
      {
        message: "Failed to delete blog post",
      },
      { status: 500 }
    );
  }
}