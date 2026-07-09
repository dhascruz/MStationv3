"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, isAuthenticated } from "@/lib/auth";

// Client-side guard for portal layouts. This is a UX convenience layered on
// top of middleware.ts (which only checks for a token, not a role) — the
// real enforcement always happens on the backend via @Roles()/RolesGuard.
// Returns true once the current user has been confirmed to hold one of the
// allowed roles; false while redirecting.
export function useRequireRole(allowedRoles: string[]): boolean {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/login");
      return;
    }
    const user = getCurrentUser();
    if (!user || !allowedRoles.includes(user.role)) {
      router.replace("/dashboard");
      return;
    }
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ready;
}
