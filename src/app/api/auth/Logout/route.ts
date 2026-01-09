import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST() {
  const sessionId = (await cookies()).get("admin_session")?.value;

  if (sessionId) {
    await prisma.adminSession.delete({
      where: { id: sessionId },
    });
  }

  (await cookies()).delete("admin_session");

  return NextResponse.json({ success: true });
}
