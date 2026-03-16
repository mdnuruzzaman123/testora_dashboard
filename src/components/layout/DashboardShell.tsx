"use client";

import DashboardHeader from "@/components/layout/Header";
import DashboardSidebar from "@/components/layout/Sidebar";
import { useState } from "react";

type DashboardShellProps = {
  children: React.ReactNode;
};

export default function DashboardShell({ children }: DashboardShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-dvh bg-[#f4f8fc] text-[#4f6d87]">
      <DashboardSidebar open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader onOpenSidebar={() => setMobileMenuOpen(true)} />
        <main className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4 lg:p-5">{children}</main>
      </div>
    </div>
  );
}
