"use client";

import {
  alertIcon,
  categoryShare,
  contentAlerts,
  contentMetrics,
  dashboardStats,
  monthLabels,
  monthlyUserGrowth,
  premiumByProduct,
  premiumHighlights,
  recentUsers,
  salesBreakdown,
} from "@/lib/dashboard-sample-data";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  CircleAlert,
  Crown,
  Menu,
  UserRoundCheck,
  UserRoundMinus,
  Users,
} from "lucide-react";

function Surface({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <section className={cn("rounded-lg border border-slate-200 bg-white", className)}>
      {children}
    </section>
  );
}

function StatIcon({ index }: { index: number }) {
  const items = [Users, UserRoundCheck, UserRoundMinus, Crown] as const;
  const Icon = items[index] ?? Users;
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#d8e6f5] bg-[#eff5fc] text-[#2f86d8]">
      <Icon className="h-4 w-4" />
    </div>
  );
}

function TrendAreaChart() {
  const maxValue = Math.max(...monthlyUserGrowth);
  const minValue = Math.min(...monthlyUserGrowth);
  const normalized = monthlyUserGrowth.map((value, index) => {
    const x = (index / (monthlyUserGrowth.length - 1)) * 100;
    const y = 80 - ((value - minValue) / (maxValue - minValue || 1)) * 60;
    return `${x},${y}`;
  });

  const linePoints = normalized.join(" ");
  const fillPoints = `0,86 ${linePoints} 100,86`;

  return (
    <div className="h-[210px] w-full">
      <svg viewBox="0 0 100 90" preserveAspectRatio="none" className="h-full w-full">
        <polyline points={fillPoints} fill="#d9ebfa" stroke="none" />
        <polyline
          points={linePoints}
          fill="none"
          stroke="#5ea2df"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="mt-2 grid grid-cols-12 text-[10px] text-slate-400">
        {monthLabels.map((month) => (
          <span key={month} className="text-center">
            {month}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProductBars() {
  const maxValue = Math.max(...premiumByProduct.map((item) => item.value));

  return (
    <div className="space-y-2 pt-1">
      {premiumByProduct.map((item, index) => {
        const percent = Math.round((item.value / maxValue) * 100);
        return (
          <div key={item.label} className="grid grid-cols-[90px_1fr_44px] items-center gap-2">
            <span className="text-[11px] text-slate-500">{item.label}</span>
            <div className="h-2 overflow-hidden rounded-sm bg-[#eaf2fb]">
              <div
                className={cn("h-full rounded-sm", index === 0 ? "bg-[#4c93d9]" : "bg-[#9bc2e8]")}
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="text-right text-[10px] text-slate-400">{item.value}</span>
          </div>
        );
      })}
    </div>
  );
}

function getCategoryClass(category: string) {
  if (category === "Matura") return "bg-[#eaf2fb] text-[#4c93d9]";
  if (category === "Semimatura") return "bg-[#eff2fb] text-[#6d8fd8]";
  return "bg-[#e8f5f1] text-[#359b80]";
}

function getPlanClass(plan: string) {
  if (plan === "Free") return "bg-slate-100 text-slate-500";
  if (plan.includes("Matura")) return "bg-[#ebf3fc] text-[#4d93d9]";
  if (plan.includes("Semimatura")) return "bg-[#f1edfb] text-[#8368c4]";
  return "bg-[#edf4fd] text-[#5f88bd]";
}

function getStatusClass(status: "Active" | "Suspended") {
  return status === "Active" ? "bg-[#e9f8ef] text-[#39a463]" : "bg-[#fdeeee] text-[#de6a6a]";
}

function CategoryDonut() {
  const total = categoryShare.reduce((sum, item) => sum + item.value, 0);
  const segments = categoryShare.reduce<
    Array<(typeof categoryShare)[number] & { dash: number; offset: number }>
  >((acc, item) => {
    const offset = acc.length === 0 ? 0 : acc[acc.length - 1].offset + acc[acc.length - 1].dash;
    acc.push({ ...item, dash: (item.value / total) * 100, offset });
    return acc;
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-[180px_1fr]">
      <div className="relative mx-auto h-[160px] w-[160px]">
        <svg viewBox="0 0 42 42" className="h-full w-full -rotate-90">
          <circle cx="21" cy="21" r="15.915" fill="none" stroke="#edf2f8" strokeWidth="4" />
          {segments.map((item) => (
            <circle
              key={item.label}
              cx="21"
              cy="21"
              r="15.915"
              fill="none"
              stroke={
                item.colorClass === "bg-[#2f86d8]"
                  ? "#2f86d8"
                  : item.colorClass === "bg-[#84b8e8]"
                    ? "#84b8e8"
                    : "#d4e5f7"
              }
              strokeWidth="4"
              strokeDasharray={`${item.dash} ${100 - item.dash}`}
              strokeDashoffset={-item.offset}
            />
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-semibold text-slate-700">13,610</span>
          <span className="text-[10px] text-slate-400">total users</span>
        </div>
      </div>
      <div className="space-y-2.5">
        {categoryShare.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-500">
              <span className={cn("h-2.5 w-2.5 rounded-full", item.colorClass)} />
              {item.label}
            </div>
            <div className="text-slate-600">{item.value.toLocaleString()}</div>
          </div>
        ))}
        <div className="rounded-md border border-[#dce9f8] bg-[#f1f7fd] px-3 py-2 text-[11px] text-[#2f86d8]">
          Most used this month: Entrance Exams
        </div>
      </div>
    </div>
  );
}

function SalesSnapshot() {
  const max = Math.max(...premiumByProduct.map((item) => item.value));

  return (
    <Surface className="p-4 sm:p-5">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-700">Plans / Sales Snapshot</h3>
          <p className="text-xs text-slate-400">Active subscriptions by product - 13,610 total</p>
        </div>
        <button className="text-xs font-medium text-[#2f86d8]">Sales Report</button>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-3">
          {premiumByProduct.map((item, index) => (
            <div key={item.label} className="grid grid-cols-[100px_1fr_50px] items-center gap-2">
              <span className="text-xs text-slate-500">{item.label}</span>
              <div className="h-3 rounded-sm bg-[#edf3fb]">
                <div
                  className={cn("h-3 rounded-sm", index === 0 ? "bg-[#3289d9]" : "bg-[#9bc2e8]")}
                  style={{ width: `${Math.max((item.value / max) * 100, 6)}%` }}
                />
              </div>
              <span className="text-right text-[11px] text-slate-400">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2.5 rounded-md border border-slate-200 p-3">
          <p className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
            Product Breakdown
          </p>
          {salesBreakdown.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-[1fr_auto] items-center gap-2 border-b border-slate-100 pb-2 text-xs last:border-b-0 last:pb-0"
            >
              <div>
                <p className="font-medium text-slate-600">{item.label}</p>
                <p className="text-[11px] text-slate-400">
                  {item.amount} / {item.users} users
                </p>
              </div>
              <span className="text-[11px] font-medium text-[#39a463]">{item.change}</span>
            </div>
          ))}
        </div>
      </div>
    </Surface>
  );
}

export default function DashboardContent() {
  const AlertIcon = alertIcon;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((item, index) => (
          <Surface key={item.label} className="p-3.5">
            <div className="flex items-center gap-3">
              <StatIcon index={index} />
              <div>
                <p className="text-[11px] text-slate-400">{item.label}</p>
                <p className="text-[22px] leading-6 font-semibold text-slate-700">{item.value}</p>
              </div>
            </div>
          </Surface>
        ))}
      </div>

      <div className="grid gap-3 xl:grid-cols-2">
        <Surface className="p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-700">Monthly User Growth</h3>
            <button className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-500">
              2026 <Menu className="h-3.5 w-3.5" />
            </button>
          </div>
          <TrendAreaChart />
        </Surface>

        <Surface className="p-4 sm:p-5">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-700">Premium Users By Product</h3>
              <p className="text-xs text-slate-400">Active subscriptions by category</p>
            </div>
            <button className="inline-flex items-center rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-500">
              2026
            </button>
          </div>
          <ProductBars />
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {premiumHighlights.map((item) => (
              <div
                key={item.title}
                className="rounded-md border border-slate-200 bg-[#f9fbfe] p-2.5"
              >
                <p className="text-[10px] tracking-wide text-slate-400 uppercase">{item.title}</p>
                <p className="mt-0.5 text-sm font-semibold text-slate-700">{item.value}</p>
                <p className="text-[11px] text-slate-400">{item.sub}</p>
              </div>
            ))}
          </div>
        </Surface>
      </div>

      <Surface className="overflow-hidden">
        <div className="border-b border-slate-200 px-4 py-3 sm:px-5">
          <h3 className="text-sm font-semibold text-slate-700">Recent User</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <thead className="bg-[#f3f7fb] text-[11px] text-slate-500">
              <tr>
                <th className="px-4 py-2.5 font-medium sm:px-5">#</th>
                <th className="px-4 py-2.5 font-medium sm:px-5">User</th>
                <th className="px-4 py-2.5 font-medium sm:px-5">Category</th>
                <th className="px-4 py-2.5 font-medium sm:px-5">Active Plan</th>
                <th className="px-4 py-2.5 font-medium sm:px-5">Last Activity</th>
                <th className="px-4 py-2.5 font-medium sm:px-5">Joined Date</th>
                <th className="px-4 py-2.5 font-medium sm:px-5">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-100 text-xs text-slate-500 last:border-b-0"
                >
                  <td className="px-4 py-3 sm:px-5">{index + 1}</td>
                  <td className="px-4 py-3 sm:px-5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8f2fc] text-[11px] font-semibold text-[#4b92d9]">
                        {user.initials}
                      </div>
                      <div>
                        <p className="font-medium text-slate-700">{user.name}</p>
                        <p className="text-[11px] text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 sm:px-5">
                    <span
                      className={cn(
                        "rounded-sm px-2 py-0.5 text-[11px]",
                        getCategoryClass(user.category)
                      )}
                    >
                      {user.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 sm:px-5">
                    <span
                      className={cn(
                        "rounded-sm px-2 py-0.5 text-[11px]",
                        getPlanClass(user.activePlan)
                      )}
                    >
                      {user.activePlan}
                    </span>
                  </td>
                  <td className="px-4 py-3 sm:px-5">{user.lastActivity}</td>
                  <td className="px-4 py-3 sm:px-5">{user.joinedDate}</td>
                  <td className="px-4 py-3 sm:px-5">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[11px]",
                        getStatusClass(user.status)
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
      </Surface>

      <Surface className="p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-700">Platform Content Summary</h3>
            <p className="text-xs text-slate-400">Overview of all platform content and assets</p>
          </div>
          <button className="text-xs font-medium text-[#2f86d8]">Manage Content</button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {contentMetrics.map((item) => (
            <div key={item.label} className="rounded-md border border-slate-200 p-3">
              <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-md bg-[#eef4fd] text-[#4c93d9]">
                <item.icon className="h-4 w-4" />
              </div>
              <p className="text-2xl leading-6 font-semibold text-slate-700">{item.value}</p>
              <p className="mt-1 text-xs text-slate-500">{item.label}</p>
              <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-[#39a463]">
                <ArrowUpRight className="h-3 w-3" />
                {item.delta}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-3 xl:grid-cols-2">
          <div className="rounded-md border border-slate-200 p-3.5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-slate-700">Content Alerts</h4>
                <p className="text-xs text-slate-400">Items that need your attention</p>
              </div>
              <span className="rounded-sm border border-[#f1deb7] bg-[#fff8ea] px-2 py-0.5 text-[10px] font-medium text-[#b88424]">
                187 Total
              </span>
            </div>
            <div className="space-y-2">
              {contentAlerts.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-2.5 rounded-md border border-slate-200 p-2.5"
                >
                  <div
                    className={cn(
                      "mt-0.5 flex h-5 w-5 items-center justify-center rounded-sm",
                      item.variant === "warning"
                        ? "bg-[#fff3da] text-[#c48a2e]"
                        : item.variant === "error"
                          ? "bg-[#ffeaea] text-[#d66a6a]"
                          : "bg-[#eaf3fd] text-[#4c93d9]"
                    )}
                  >
                    <AlertIcon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-medium text-slate-700">{item.title}</p>
                      <span className="rounded-sm border border-slate-200 px-1 py-0 text-[10px] text-slate-500">
                        {item.count}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-slate-200 p-3.5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-slate-700">Most Used Category</h4>
                <p className="text-xs text-slate-400">Study category distribution</p>
              </div>
              <CircleAlert className="h-4 w-4 text-slate-300" />
            </div>
            <CategoryDonut />
          </div>
        </div>
      </Surface>

      <SalesSnapshot />
    </div>
  );
}
