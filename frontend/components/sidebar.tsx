"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  LayoutDashboard,
  GraduationCap,
  Calculator,
  Home,
  Users,
  CalendarClock,
  Settings,
  Shield,
  KeyRound,
  FileClock,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type Portal = "user" | "admin" | "super_admin";

const NAV_ITEMS: Record<Portal, { label: string; href: string; icon: typeof LayoutDashboard }[]> = {
  user: [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "Education", href: "/dashboard/education", icon: GraduationCap },
    { label: "Calculators", href: "/dashboard/calculators", icon: Calculator },
    { label: "Property Scenarios", href: "/dashboard/scenarios", icon: Home },
    { label: "Consultations", href: "/dashboard/consultations", icon: CalendarClock },
    { label: "Brokers", href: "/dashboard/brokers", icon: Users },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ],
  admin: [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ],
  super_admin: [
    { label: "Overview", href: "/super-admin", icon: LayoutDashboard },
    { label: "Plans & Entitlements", href: "/super-admin/plans", icon: KeyRound },
    { label: "Audit Log", href: "/super-admin/audit", icon: FileClock },
  ],
};

const PORTAL_META: Record<Portal, { title: string; home: string; blurbTitle: string; blurbBody: string }> = {
  user: {
    title: "Mortgage Station",
    home: "/dashboard",
    blurbTitle: "Talk to a broker",
    blurbBody: "Book a free consultation with Kuya Jerry.",
  },
  admin: {
    title: "Admin Console",
    home: "/admin",
    blurbTitle: "Admin Console",
    blurbBody: "Manage users and platform content.",
  },
  super_admin: {
    title: "Super Admin",
    home: "/super-admin",
    blurbTitle: "Super Admin",
    blurbBody: "Full control over plans, entitlements and roles.",
  },
};

export function Sidebar({
  open,
  onClose,
  portal = "user",
}: {
  open: boolean;
  onClose: () => void;
  portal?: Portal;
}) {
  const pathname = usePathname();
  const items = NAV_ITEMS[portal];
  const meta = PORTAL_META[portal];

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-white transition-transform lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between gap-2 border-b border-border px-5">
          <Link href={meta.home} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
              {portal === "super_admin" ? (
                <Shield className="h-4 w-4" />
              ) : (
                <Building2 className="h-4 w-4" />
              )}
            </div>
            <span className="text-sm font-semibold text-slate-900">
              {meta.title}
            </span>
          </Link>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4 scrollbar-thin">
          {items.map((item) => {
            const active =
              item.href === meta.home
                ? pathname === item.href
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-4">
          <div className="rounded-lg bg-brand-50 p-3">
            <p className="text-xs font-medium text-brand-800">{meta.blurbTitle}</p>
            <p className="mt-1 text-xs text-brand-700/80">{meta.blurbBody}</p>
          </div>
        </div>
      </aside>
    </>
  );
}
