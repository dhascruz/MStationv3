"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { Footer } from "@/components/footer";
import { useRequireRole } from "@/lib/require-role";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ready = useRequireRole(["ADMIN", "SUPER_ADMIN"]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!ready) return null;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} portal="admin" />

      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar onMenuClick={() => setSidebarOpen(true)} portal="admin" />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
