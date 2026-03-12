"use client";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleSidebar } from "@/store/slices/uiSlice";
import { APP_NAME, ROUTES } from "@/constants";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen);

  const navItems = [
    { label: "Dashboard", href: ROUTES.DASHBOARD },
    { label: "Users", href: ROUTES.USERS },
    { label: "Settings", href: ROUTES.SETTINGS },
  ];

  return (
    <aside
      className={`${
        sidebarOpen ? "w-64" : "w-16"
      } flex shrink-0 flex-col border-r border-gray-200 bg-white transition-all duration-300 dark:border-gray-800 dark:bg-gray-900`}
    >
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800">
        {sidebarOpen && (
          <span className="text-lg font-semibold text-gray-900 dark:text-white">{APP_NAME}</span>
        )}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {sidebarOpen ? item.label : item.label[0]}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
