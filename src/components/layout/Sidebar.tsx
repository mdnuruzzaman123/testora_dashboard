"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  Crown,
  CircleHelp,
  FileText,
  ShoppingBag,
  Package,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/users", label: "User Management", icon: Users },
  { href: "/premium-users", label: "Premium Users", icon: Crown },
  { href: "/questions", label: "Question & Test Section", icon: CircleHelp },
  { href: "/blog", label: "Blog", icon: FileText },
  { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
  { href: "/orders", label: "Order", icon: Package },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="flex h-screen w-52 shrink-0 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-blue-500 shadow-sm">
          {/* Testora rocket/arrow mark */}
          <svg
            className="h-5 w-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L12 22M12 2L6 8M12 2L18 8" />
          </svg>
        </div>
        <span className="text-[15px] font-extrabold tracking-widest text-gray-900">TESTORA</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-2 py-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive(item.href)
                ? "bg-blue-600 text-white"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <item.icon className="h-[17px] w-[17px] shrink-0" />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-gray-100 px-2 py-3">
        <Link
          href="/settings"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
            isActive("/settings")
              ? "bg-blue-600 text-white"
              : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          )}
        >
          <Settings className="h-[17px] w-[17px] shrink-0" />
          Settings
        </Link>
        <button
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          onClick={() => {
            /* TODO: handle logout / dispatch logout action */
          }}
        >
          <LogOut className="h-[17px] w-[17px] shrink-0" />
          Log out
        </button>
      </div>
    </aside>
  );
}
