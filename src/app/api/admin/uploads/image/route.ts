/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from "next/server";
import { adminAuth } from "@/middleware/adminAuth";

import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await adminAuth())) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No file uploaded",
        },
        {
          status: 400,
        },
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "padher-events",
          },
          (error, result) => {
            if (error || !result) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        )
        .end(buffer);
    });

    return NextResponse.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to upload image",
      },
      {
        status: 500,
      },
    );
  }
}
