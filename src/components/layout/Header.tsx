"use client";

import Link from "next/link";
import { APP_NAME } from "@/constants";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-900">
      <h1 className="text-base font-medium text-gray-900 dark:text-white">{APP_NAME}</h1>
      <div className="flex items-center gap-4">{/* User menu / actions will go here */}</div>
    </header>
  );
}
