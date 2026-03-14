"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutGrid, BookOpen, Archive, BookMarked, Upload, Eye } from "lucide-react";

const tabs = [
  { href: "/questions", label: "Overview", icon: LayoutGrid },
  { href: "/questions/question-bank", label: "Question Bank", icon: BookOpen },
  { href: "/questions/test-archive", label: "Test Archive", icon: Archive },
  { href: "/questions/passages", label: "Passages", icon: BookMarked },
  { href: "/questions/import", label: "Import", icon: Upload },
  { href: "/questions/preview-validation", label: "Preview & Validation", icon: Eye },
];

export default function QuestionsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-full bg-[#ECEFF3] p-6">
      <div>
        <header className="mb-4">
          <h1 className="text-3xl font-bold text-slate-900">Question &amp; Test System</h1>
          <p className="mt-1 text-sm text-slate-600">
            Centralized question workflow for authoring, structuring, validation, and publishing.
          </p>
        </header>

        <div className="sticky top-0 z-10 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
          <div className="flex flex-wrap items-center gap-1.5">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href;

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                  )}
                >
                  <tab.icon className="h-3.5 w-3.5" />
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
