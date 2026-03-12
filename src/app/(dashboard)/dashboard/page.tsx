"use client";

import {
  Users,
  UserCheck,
  UserX,
  Crown,
  CircleHelp,
  FileCheck,
  FilePen,
  Newspaper,
  ShoppingBag,
  AlertTriangle,
  ChevronRight,
  Clock,
} from "lucide-react";
import dynamic from "next/dynamic";
import {
  dashboardStats,
  recentUsersData,
  platformContentStats,
  contentAlerts,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const UserGrowthChart = dynamic(() => import("@/components/charts/UserGrowthChart"), {
  ssr: false,
});
const PremiumByProductChart = dynamic(() => import("@/components/charts/PremiumByProductChart"), {
  ssr: false,
});
const CategoryDonutChart = dynamic(() => import("@/components/charts/CategoryDonutChart"), {
  ssr: false,
});

// ─── Helpers ────────────────────────────────────────────────────────────────

function categoryBadge(cat: string) {
  const map: Record<string, string> = {
    Matura: "text-blue-600",
    Semimatura: "text-purple-600",
    "Entrance Exams": "text-teal-600",
  };
  return map[cat] ?? "text-gray-600";
}

function planBadge(plan: string) {
  if (plan === "Free") return null;
  const map: Record<string, string> = {
    "Matura Pack": "bg-orange-100 text-orange-700",
    "Semimatura Pack": "bg-purple-100 text-purple-700",
    "Medicine Entrance": "bg-rose-100 text-rose-700",
    "Law Entrance": "bg-amber-100 text-amber-700",
    "Economics Entrance": "bg-yellow-100 text-yellow-700",
    Entrance: "bg-teal-100 text-teal-700",
  };
  const key = Object.keys(map).find((k) => plan.includes(k.replace(" Pack", "").split(" ")[0]));
  return key ? map[key] : "bg-blue-100 text-blue-700";
}

function statusBadge(status: string) {
  if (status === "Active") return "bg-green-100 text-green-700";
  if (status === "Suspended") return "bg-red-100 text-red-600";
  return "bg-yellow-100 text-yellow-700";
}

const contentIconMap: Record<string, React.ElementType> = {
  "help-circle": CircleHelp,
  "file-check": FileCheck,
  "file-edit": FilePen,
  newspaper: Newspaper,
  "shopping-bag": ShoppingBag,
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const statsCards = [
    {
      label: "Total Users",
      value: dashboardStats.totalUsers.toLocaleString(),
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Active Users",
      value: dashboardStats.activeUsers.toLocaleString(),
      icon: UserCheck,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Inactive Users (30 Days)",
      value: dashboardStats.inactiveUsers.toLocaleString(),
      icon: UserX,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      label: "Premium Users",
      value: dashboardStats.premiumUsers.toLocaleString(),
      icon: Crown,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <div className="min-h-full p-6">
      {/* Page header */}
      <h1 className="mb-6 text-xl font-semibold text-gray-900">Admin Dashboard</h1>

      {/* Stats cards */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        {statsCards.map((card) => (
          <div
            key={card.label}
            className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm"
          >
            <div
              className={cn(
                "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
                card.iconBg
              )}
            >
              <card.icon className={cn("h-5 w-5", card.iconColor)} />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">{card.value}</p>
              <p className="text-xs text-gray-500">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        {/* Monthly User Growth */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Monthly User Growth</h2>
            <button className="rounded-md border border-gray-200 px-2.5 py-1 text-xs text-gray-500 hover:bg-gray-50">
              July ▾
            </button>
          </div>
          <UserGrowthChart />
        </div>

        {/* Premium Users by Product */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Premium Users by Product</h2>
            <button className="rounded-md border border-gray-200 px-2.5 py-1 text-xs text-gray-500 hover:bg-gray-50">
              More ▾
            </button>
          </div>
          <p className="mb-3 text-xs text-gray-400">
            Select data to view various subcategory and categories
          </p>
          <PremiumByProductChart />
        </div>
      </div>

      {/* Recent Users */}
      <div className="mb-6 rounded-xl bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h2 className="text-sm font-semibold text-gray-900">Recent User</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/60 text-left text-xs font-medium text-gray-500">
                <th className="px-5 py-3">#</th>
                <th className="px-5 py-3">User</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Active Plan</th>
                <th className="px-5 py-3">Last Activity</th>
                <th className="px-5 py-3">Joined Date</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentUsersData.map((user, i) => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-5 py-3.5 text-gray-400">{i + 1}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                        {user.initials}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={cn("text-sm font-medium", categoryBadge(user.category))}>
                      {user.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    {user.activePlan === "Free" ? (
                      <span className="text-sm text-gray-400">Free</span>
                    ) : (
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-medium",
                          planBadge(user.activePlan)
                        )}
                      >
                        {user.activePlan}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-gray-500">{user.lastActivity}</td>
                  <td className="px-5 py-3.5 text-gray-500">{user.joinedDate}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-medium",
                        statusBadge(user.status)
                      )}
                    >
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Platform Content Summary */}
      <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-gray-900">Platform Content Summary</h2>
        <div className="grid grid-cols-5 gap-3">
          {platformContentStats.map((stat) => {
            const Icon = contentIconMap[stat.icon] ?? CircleHelp;
            return (
              <div key={stat.label} className="rounded-lg border border-gray-100 p-4">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                  <Icon className="h-4 w-4 text-blue-500" />
                </div>
                <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                <p className="mt-0.5 text-xs text-gray-500">{stat.label}</p>
                <p className="mt-1.5 text-xs font-medium text-green-600">↑ {stat.change}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom row: Content Alerts + Most Used Category */}
      <div className="grid grid-cols-2 gap-4">
        {/* Content Alerts */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Content Alerts</h2>
              <p className="text-xs text-gray-400">Items that need your attention</p>
            </div>
            <button className="text-xs font-medium text-blue-600 hover:underline">All now</button>
          </div>
          <div className="flex flex-col gap-3">
            {contentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 rounded-lg border border-gray-100 p-3"
              >
                <div
                  className={cn(
                    "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                    alert.type === "warning"
                      ? "bg-amber-100"
                      : alert.type === "error"
                        ? "bg-red-100"
                        : "bg-blue-100"
                  )}
                >
                  <AlertTriangle
                    className={cn(
                      "h-3.5 w-3.5",
                      alert.type === "warning"
                        ? "text-amber-600"
                        : alert.type === "error"
                          ? "text-red-600"
                          : "text-blue-600"
                    )}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-900">{alert.title}</p>
                  <p className="mt-0.5 text-xs text-gray-400">{alert.description}</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-gray-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Most Used Category */}
        <div className="rounded-xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Most Used Category</h2>
              <p className="text-xs text-gray-400">Study category distribution</p>
            </div>
            <Clock className="h-4 w-4 text-gray-300" />
          </div>
          <CategoryDonutChart />
        </div>
      </div>
    </div>
  );
}
