"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function AdminLogoutButton() {
  return (
    <Button
      variant="destructive"
      className="w-full button-secondary"
      onClick={() =>
        signOut({
          callbackUrl: "/login",
        })
      }
    >
      Logout
    </Button>
  );
}