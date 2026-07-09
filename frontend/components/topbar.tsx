"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  User as UserIcon,
} from "lucide-react";
import { getCurrentUser, logout, type AuthUser } from "@/lib/auth";
import type { Portal } from "./sidebar";

const PROFILE_HREF: Record<Portal, string> = {
  user: "/dashboard/profile",
  admin: "/admin/settings",
  super_admin: "/super-admin",
};

const SETTINGS_HREF: Record<Portal, string> = {
  user: "/dashboard/settings",
  admin: "/admin/settings",
  super_admin: "/super-admin",
};

const SEARCH_PLACEHOLDER: Record<Portal, string> = {
  user: "Search lessons, calculators...",
  admin: "Search users, content...",
  super_admin: "Search plans, audit log...",
};

export function Topbar({
  onMenuClick,
  portal = "user",
}: {
  onMenuClick: () => void;
  portal?: Portal;
}) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
    router.refresh();
  };

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "MS";

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-white/95 px-4 backdrop-blur sm:px-6">
      <button
        onClick={onMenuClick}
        className="rounded-md p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative hidden flex-1 max-w-md sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder={SEARCH_PLACEHOLDER[portal]}
          className="h-9 w-full rounded-md border border-border bg-slate-50 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button className="relative rounded-md p-2 text-slate-500 hover:bg-slate-100">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-500" />
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-md py-1.5 pl-1.5 pr-2 hover:bg-slate-100"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white">
              {initials}
            </div>
            <div className="hidden text-left sm:block">
              <p className="text-sm font-medium leading-tight text-slate-900">
                {user?.name || "Guest User"}
              </p>
              <p className="text-xs leading-tight text-slate-500">
                {user?.role || "Member"}
              </p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md border border-border bg-white py-1 shadow-card">
              <a
                href={PROFILE_HREF[portal]}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <UserIcon className="h-4 w-4" />
                Profile
              </a>
              <a
                href={SETTINGS_HREF[portal]}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <Settings className="h-4 w-4" />
                Settings
              </a>
              <div className="my-1 border-t border-border" />
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
