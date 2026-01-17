"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function TopBar() {
  return (
    <div className="flex items-center justify-between border-b bg-white px-4 py-3">
      <h1 className="text-lg font-semibold">AI Assistant</h1>

      <Button
        variant="destructive"
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        Logout
      </Button>
    </div>
  );
}
