import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // 1. Validate username
  if (username !== process.env.ADMIN_USERNAME) {
    return NextResponse.json({ error: "Invalid username" }, { status: 401 });
  }

  // 2. Validate password
  const validPassword = await bcrypt.compare(
    password,
    process.env.ADMIN_PASSWORD_HASH!
  );

  if (!validPassword) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // 3. Create session
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

  await prisma.adminSession.create({
    data: {
      id: sessionId,
      ipAddress: req.headers.get("x-forwarded-for") ?? "unknown",
      userAgent: req.headers.get("user-agent") ?? "unknown",
      expiresAt,
    },
  });

  // 4. Set secure cookie
  (
    await cookies()
  ).set("admin_session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: expiresAt,
    path: "/",
  });

  return NextResponse.json({ success: true });
}
