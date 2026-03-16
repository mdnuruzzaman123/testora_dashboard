"use client";

import { Menu } from "lucide-react";

type DashboardHeaderProps = {
  onOpenSidebar: () => void;
};

export default function DashboardHeader({ onOpenSidebar }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-[#c9dbee] bg-[#d8e8f7] px-3 py-3 sm:px-4 lg:px-5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#b9d2ea] bg-white text-[#587189] lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-4 w-4" />
        </button>
        <h1 className="text-sm font-semibold text-[#3f5f7a] sm:text-base">Admin Dashboard</h1>
      </div>
    </header>
  );
}
