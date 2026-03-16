"use client";

import DashboardAreaChart from "@/components/charts/DashboardAreaChart";
import DashboardDonutChart from "@/components/charts/DashboardDonutChart";
import DashboardHorizontalBarChart from "@/components/charts/DashboardHorizontalBarChart";
import YearSelect from "@/components/dashboard/YearSelect";
import {
  alertIcon,
  categoryShareByYear,
  contentAlerts,
  contentMetrics,
  dashboardStats,
  dashboardYears,
  monthlyUserGrowthByYear,
  premiumByProductByYear,
  premiumHighlightsByYear,
  recentUsers,
  salesBreakdownByYear,
  type DashboardYear,
} from "@/lib/dashboard-sample-data";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  CircleAlert,
  Crown,
  UserRoundCheck,
  UserRoundMinus,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

function Surface({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <section className={cn("rounded-lg border border-[#dce7f2] bg-white", className)}>
      {children}
    </section>
  );
}

function StatIcon({ index }: { index: number }) {
  const items = [Users, UserRoundCheck, UserRoundMinus, Crown] as const;
  const Icon = items[index] ?? Users;

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#d6e5f3] bg-[#eff5fc] text-[#2f86d8]">
      <Icon className="h-4 w-4" />
    </div>
  );
}

function getCategoryClass(category: string) {
  if (category === "Matura") return "bg-[#eaf2fb] text-[#4d93d9] border-[#d6e5f4]";
  if (category === "Semimatura") return "bg-[#edf0fb] text-[#748ccc] border-[#dce4f6]";
  return "bg-[#e9f5f1] text-[#3b9b81] border-[#d5ece5]";
}

function getPlanClass(plan: string) {
  if (plan === "Free") return "bg-[#f2f6fb] text-[#6d839a] border-[#dee8f2]";
  if (plan.includes("Matura")) return "bg-[#ebf3fc] text-[#4d93d9] border-[#d6e6f4]";
  if (plan.includes("Semimatura")) return "bg-[#f1edfb] text-[#8468c4] border-[#e4ddf4]";
  return "bg-[#edf4fd] text-[#5f88bd] border-[#dbe7f4]";
}

function getStatusClass(status: "Active" | "Suspended") {
  return status === "Active"
    ? "bg-[#e9f8ef] text-[#3ea666] border-[#d0ecd9]"
    : "bg-[#fdeeee] text-[#db6f6f] border-[#f4d7d7]";
}

function SalesSnapshot({
  years,
  year,
  onYearChange,
}: {
  years: readonly DashboardYear[];
  year: DashboardYear;
  onYearChange: (year: DashboardYear) => void;
}) {
  const chartData = premiumByProductByYear[year];
  const rows = salesBreakdownByYear[year];

  return (
    <Surface className="p-4 sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-[#3f5f7a]">Plans / Sales Snapshot</h3>
          <p className="text-xs text-[#8ea1b4]">Active subscriptions by product</p>
        </div>
        <div className="flex items-center gap-2">
          <YearSelect
            years={[...years]}
            value={year}
            onChange={(v) => onYearChange(v as DashboardYear)}
          />
          <button className="text-xs font-medium text-[#2f86d8]">Sales Report</button>
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <DashboardHorizontalBarChart data={chartData} height={258} />
        <div className="space-y-2.5 rounded-md border border-[#dce7f2] p-3">
          <p className="text-[11px] font-semibold tracking-wide text-[#90a2b5] uppercase">
            Product Breakdown
          </p>
          {rows.map((item) => (
            <div
              key={item.label}
              className="grid grid-cols-[1fr_auto] items-center gap-2 border-b border-[#ecf2f8] pb-2 text-xs last:border-b-0 last:pb-0"
            >
              <div>
                <p className="font-medium text-[#4f6d87]">{item.label}</p>
                <p className="text-[11px] text-[#8fa2b5]">
                  {item.amount} / {item.users} users
                </p>
              </div>
              <span className="text-[11px] font-medium text-[#3ea666]">{item.change}</span>
            </div>
          ))}
        </div>
      </div>
    </Surface>
  );
}

export default function DashboardContent() {
  const [growthYear, setGrowthYear] = useState<DashboardYear>(2026);
  const [productYear, setProductYear] = useState<DashboardYear>(2026);
  const [categoryYear, setCategoryYear] = useState<DashboardYear>(2026);
  const [salesYear, setSalesYear] = useState<DashboardYear>(2026);

  const years = dashboardYears;
  const AlertIcon = alertIcon;

  const topCategory = useMemo(() => {
    const data = categoryShareByYear[categoryYear];
    return data.reduce((acc, item) => (item.value > acc.value ? item : acc), data[0]);
  }, [categoryYear]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((item, index) => (
          <Surface key={item.label} className="p-3.5">
            <div className="flex items-center gap-3">
              <StatIcon index={index} />
              <div>
                <p className="text-[11px] text-[#90a3b6]">{item.label}</p>
                <p className="text-[22px] leading-6 font-semibold text-[#3f5f7a]">{item.value}</p>
              </div>
            </div>
          </Surface>
        ))}
      </div>

      <div className="grid gap-3 xl:grid-cols-2">
        <Surface className="p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-[#3f5f7a]">Monthly User Growth</h3>
            <YearSelect
              years={[...years]}
              value={growthYear}
              onChange={(value) => setGrowthYear(value as DashboardYear)}
            />
          </div>
          <DashboardAreaChart data={monthlyUserGrowthByYear[growthYear]} />
        </Surface>

        <Surface className="p-4 sm:p-5">
          <div className="mb-2 flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-[#3f5f7a]">Premium Users By Product</h3>
              <p className="text-xs text-[#8ea1b4]">Active subscriptions by category</p>
            </div>
            <YearSelect
              years={[...years]}
              value={productYear}
              onChange={(value) => setProductYear(value as DashboardYear)}
            />
          </div>
          <DashboardHorizontalBarChart data={premiumByProductByYear[productYear]} height={228} />
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {premiumHighlightsByYear[productYear].map((item) => (
              <div
                key={item.title}
                className="rounded-md border border-[#dce7f2] bg-[#f9fbfe] p-2.5"
              >
                <p className="text-[10px] tracking-wide text-[#90a2b5] uppercase">{item.title}</p>
                <p className="mt-0.5 text-sm font-semibold text-[#3f5f7a]">{item.value}</p>
                <p className="text-[11px] text-[#90a2b5]">{item.sub}</p>
              </div>
            ))}
          </div>
        </Surface>
      </div>

      <Surface className="overflow-hidden">
        <div className="border-b border-[#dce7f2] px-4 py-3 sm:px-5">
          <h3 className="text-sm font-semibold text-[#3f5f7a]">Recent User</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-215 text-left">
            <thead className="bg-[#f3f7fb] text-[11px] text-[#6f859b]">
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
                  className="border-b border-[#ecf2f8] text-xs text-[#5e768e] last:border-b-0"
                >
                  <td className="px-4 py-3 sm:px-5">{index + 1}</td>
                  <td className="px-4 py-3 sm:px-5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8f2fc] text-[11px] font-semibold text-[#4b92d9]">
                        {user.initials}
                      </div>
                      <div>
                        <p className="font-medium text-[#4f6d87]">{user.name}</p>
                        <p className="text-[11px] text-[#90a2b5]">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 sm:px-5">
                    <span
                      className={cn(
                        "rounded-sm border px-2 py-0.5 text-[11px]",
                        getCategoryClass(user.category)
                      )}
                    >
                      {user.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 sm:px-5">
                    <span
                      className={cn(
                        "rounded-sm border px-2 py-0.5 text-[11px]",
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
                        "rounded-full border px-2 py-0.5 text-[11px]",
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
        <div className="mb-3 flex items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-[#3f5f7a]">Platform Content Summary</h3>
            <p className="text-xs text-[#8ea1b4]">Overview of all platform content and assets</p>
          </div>
          <button className="text-xs font-medium text-[#2f86d8]">Manage Content</button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {contentMetrics.map((item) => (
            <div key={item.label} className="rounded-md border border-[#dce7f2] p-3">
              <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-md border border-[#d7e6f4] bg-[#eef4fd] text-[#4c93d9]">
                <item.icon className="h-4 w-4" />
              </div>
              <p className="text-2xl leading-6 font-semibold text-[#3f5f7a]">{item.value}</p>
              <p className="mt-1 text-xs text-[#6e849a]">{item.label}</p>
              <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-[#3ea666]">
                <ArrowUpRight className="h-3 w-3" />
                {item.delta}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-3 xl:grid-cols-2">
          <div className="rounded-md border border-[#dce7f2] p-3.5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-[#3f5f7a]">Content Alerts</h4>
                <p className="text-xs text-[#8ea1b4]">Items that need your attention</p>
              </div>
              <span className="rounded-sm border border-[#f1deb7] bg-[#fff8ea] px-2 py-0.5 text-[10px] font-medium text-[#b88424]">
                187 Total
              </span>
            </div>
            <div className="space-y-2">
              {contentAlerts.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-2.5 rounded-md border border-[#dce7f2] p-2.5"
                >
                  <div
                    className={cn(
                      "mt-0.5 flex h-5 w-5 items-center justify-center rounded-sm border",
                      item.variant === "warning"
                        ? "border-[#f0dfb9] bg-[#fff3da] text-[#c48a2e]"
                        : item.variant === "error"
                          ? "border-[#f4d8d8] bg-[#ffeaea] text-[#d66a6a]"
                          : "border-[#d8e8f7] bg-[#eaf3fd] text-[#4c93d9]"
                    )}
                  >
                    <AlertIcon className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-medium text-[#4f6d87]">{item.title}</p>
                      <span className="rounded-sm border border-[#dce7f2] px-1 py-0 text-[10px] text-[#6e849a]">
                        {item.count}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8ea1b4]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-md border border-[#dce7f2] p-3.5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-semibold text-[#3f5f7a]">Most Used Category</h4>
                <p className="text-xs text-[#8ea1b4]">Study category distribution</p>
              </div>
              <div className="flex items-center gap-2">
                <YearSelect
                  years={[...years]}
                  value={categoryYear}
                  onChange={(value) => setCategoryYear(value as DashboardYear)}
                />
                <CircleAlert className="h-4 w-4 text-[#a8b7c6]" />
              </div>
            </div>
            <DashboardDonutChart data={categoryShareByYear[categoryYear]} />
            <div className="mt-3 rounded-md border border-[#dce9f8] bg-[#f1f7fd] px-3 py-2 text-[11px] text-[#2f86d8]">
              Most used this year: {topCategory.label}
            </div>
          </div>
        </div>
      </Surface>

      <SalesSnapshot years={years} year={salesYear} onYearChange={setSalesYear} />
    </div>
  );
}
