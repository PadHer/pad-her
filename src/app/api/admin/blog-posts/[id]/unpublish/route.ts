import { NextResponse } from "next/server";
import { adminAuth } from "@/middleware/adminAuth";
import  prisma  from "@/lib/prisma";
import { BlogStatus } from "@/schemas/BlogSchema";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  _request: Request,
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

    if (post.status === BlogStatus.DRAFT) {
      return NextResponse.json(
        {
          message: "Blog post is already a draft",
        },
        { status: 400 }
      );
    }

    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: {
        status: BlogStatus.DRAFT,
        publishedAt: null,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Unpublish blog post error:", error);

    return NextResponse.json(
      {
        message: "Failed to unpublish blog post",
      },
      { status: 500 }
    );
  }
}