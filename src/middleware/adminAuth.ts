import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function adminAuth() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "admin") {
    return null;
  }

  return session;
}