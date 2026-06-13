"use client";

import DashboardAreaChart from "@/components/charts/DashboardAreaChart";
import DashboardDonutChart from "@/components/charts/DashboardDonutChart";
import DashboardHorizontalBarChart from "@/components/charts/DashboardHorizontalBarChart";
import YearSelect from "@/components/dashboard/YearSelect";
import {
  categoryShareByYear,
  contentAlerts,
  contentMetrics,
  dashboardYears,
  premiumByProductByYear,
  premiumHighlightsByYear,
  salesBreakdownByYear,
  type DashboardYear,
} from "@/lib/dashboard-sample-data";
import {
  formatDate,
  formatCount,
  formatRelativeTime,
  getPlanClass,
  getStatusClass,
  mapGrowth,
} from "@/lib/dashboard-utils";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  ArrowUpRight,
  CircleAlert,
  Crown,
  UserRoundCheck,
  UserRoundMinus,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  useGetDashboardStatsQuery,
  useGetRecentActiveUsersQuery,
  useGetUserGrowthQuery,
  type AdminRecentUser,
} from "@/store/apis";

function Surface({ className, children }: { className?: string; children: ReactNode }) {
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

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-slate-200/80", className)} />;
}

function SectionSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Surface key={index} className="p-3.5">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          </Surface>
        ))}
      </div>
      <div className="grid gap-3 xl:grid-cols-2">
        <Surface className="p-4 sm:p-5">
          <Skeleton className="mb-4 h-4 w-40" />
          <Skeleton className="h-76 w-full" />
        </Surface>
        <Surface className="p-4 sm:p-5">
          <Skeleton className="mb-4 h-4 w-48" />
          <Skeleton className="h-76 w-full" />
        </Surface>
      </div>
      <Surface className="overflow-hidden">
        <Skeleton className="h-[360px] w-full" />
      </Surface>
    </div>
  );
}

function getOverviewStatsFromApi(
  stats?: {
    totalUsers: number;
    activeAccounts: number;
    blockedAccounts: number;
    premiumUsers: number;
  }
) {
  return [
    { label: "Total Users", value: stats?.totalUsers ?? 0 },
    { label: "Active Accounts", value: stats?.activeAccounts ?? 0 },
    { label: "Blocked Accounts", value: stats?.blockedAccounts ?? 0 },
    { label: "Premium Users", value: stats?.premiumUsers ?? 0 },
  ];
}

function RecentUsersTable({
  users,
}: {
  users: AdminRecentUser[];
}) {
  return (
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
              <th className="px-4 py-2.5 font-medium sm:px-5">City</th>
              <th className="px-4 py-2.5 font-medium sm:px-5">Plan</th>
              <th className="px-4 py-2.5 font-medium sm:px-5">Joined Date</th>
              <th className="px-4 py-2.5 font-medium sm:px-5">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={`${user.email}-${index}`}
                className="border-b border-[#ecf2f8] text-xs text-[#5e768e] last:border-b-0"
              >
                <td className="px-4 py-3 sm:px-5">{index + 1}</td>
                <td className="px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-2.5">
                    <Image
                      src={user.avatar}
                      alt={user.fullName}
                      width={28}
                      height={28}
                      className="h-7 w-7 rounded-full object-cover"
                      unoptimized
                    />
                    <div>
                      <p className="font-medium text-[#4f6d87]">{user.fullName}</p>
                      <p className="text-[11px] text-[#90a2b5]">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 sm:px-5">{user.city ?? "N/A"}</td>
                <td className="px-4 py-3 sm:px-5">
                  <span
                    className={cn(
                      "rounded-sm border px-2 py-0.5 text-[11px]",
                      getPlanClass(user.plan)
                    )}
                  >
                    {user.plan ?? "Free"}
                  </span>
                </td>
                <td className="px-4 py-3 sm:px-5">{formatDate(user.createdAt)}</td>
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
  );
}

export default function DashboardContent() {
  const [growthYear, setGrowthYear] = useState<DashboardYear>(2026);
  const [productYear, setProductYear] = useState<DashboardYear>(2026);
  const categoryYear: DashboardYear = 2026;
  const salesYear: DashboardYear = 2026;
  const years = dashboardYears;

  const {
    data: dashboardStatsResponse,
    isLoading: isStatsLoading,
    isError: isStatsError,
    error: statsError,
  } = useGetDashboardStatsQuery();
  const {
    data: growthResponse,
    isLoading: isGrowthLoading,
    isError: isGrowthError,
    error: growthError,
  } = useGetUserGrowthQuery();
  const {
    data: recentUsersResponse,
    isLoading: isRecentLoading,
    isError: isRecentError,
    error: recentError,
  } = useGetRecentActiveUsersQuery();

  const previousError = useRef<string | null>(null);

  useEffect(() => {
    const message =
      (isStatsError && "Unable to load dashboard stats.") ||
      (isGrowthError && "Unable to load user growth data.") ||
      (isRecentError && "Unable to load recent users.") ||
      null;

    const detail =
      (isStatsError && (statsError as { data?: { message?: string }; error?: string } | undefined)) ||
      (isGrowthError && (growthError as { data?: { message?: string }; error?: string } | undefined)) ||
      (isRecentError && (recentError as { data?: { message?: string }; error?: string } | undefined)) ||
      undefined;

    if (message && previousError.current !== message) {
      previousError.current = message;
      toast.error(detail?.data?.message ?? detail?.error ?? message);
    }
  }, [isStatsError, isGrowthError, isRecentError, statsError, growthError, recentError]);

  const stats = useMemo(
    () => getOverviewStatsFromApi(dashboardStatsResponse?.data),
    [dashboardStatsResponse]
  );

  const growthData = useMemo(
    () => mapGrowth(growthResponse?.data ?? []),
    [growthResponse]
  );

  const recentUsers = recentUsersResponse?.data ?? [];

  const topCategory = useMemo(() => {
    const data = categoryShareByYear[categoryYear];
    return data.reduce((acc, item) => (item.value > acc.value ? item : acc), data[0]);
  }, [categoryYear]);

  const loading = isStatsLoading || isGrowthLoading || isRecentLoading;

  if (loading && !dashboardStatsResponse && !growthResponse && !recentUsersResponse) {
    return <SectionSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => (
          <Surface key={item.label} className="p-3.5">
            <div className="flex items-center gap-3">
              <StatIcon index={index} />
              <div>
                <p className="text-[11px] text-[#90a3b6]">{item.label}</p>
                <p className="text-[22px] leading-6 font-semibold text-[#3f5f7a]">
                  {formatCount(item.value)}
                </p>
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
          {growthData.length > 0 ? (
            <DashboardAreaChart data={growthData} />
          ) : (
            <div className="flex h-76 items-center justify-center rounded-md border border-dashed border-[#dce7f2] bg-[#f8fbff] text-sm text-[#8ea1b4]">
              No growth data available
            </div>
          )}
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
          <div className="mb-2 inline-flex rounded-sm bg-[#edf4ff] px-1.5 py-0.5 text-[10px] text-[#2f86d8]">
            {premiumByProductByYear[productYear]
              .reduce((sum, item) => sum + item.value, 0)
              .toLocaleString()}{" "}
            total premium users
          </div>
          <DashboardHorizontalBarChart data={premiumByProductByYear[productYear]} height={200} />

          <div className="mt-2 flex items-center justify-between text-[10px] text-[#90a2b5]">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2f86d8]" /> Top product
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#9ec6ea]" /> Other products
              </span>
            </div>
            <span>General Exams • Province Pranuese</span>
          </div>

          <p className="mt-3 text-[10px] tracking-wide text-[#9aabbc] uppercase">Quick Insights</p>
          <div className="mt-1 grid gap-2 sm:grid-cols-3">
            {premiumHighlightsByYear[productYear].map((item, idx) => (
              <div
                key={item.title}
                className={cn(
                  "rounded-lg border p-2.5",
                  idx === 0
                    ? "border-[#cfdcf0] bg-[#eef4ff]"
                    : idx === 1
                      ? "border-[#d1e9df] bg-[#edf8f3]"
                      : "border-[#f1dfc1] bg-[#fff5e8]"
                )}
              >
                <p
                  className={cn(
                    "text-[10px] font-semibold tracking-wide uppercase",
                    idx === 0 ? "text-[#4d79bb]" : idx === 1 ? "text-[#3ea666]" : "text-[#cf8d34]"
                  )}
                >
                  {item.title}
                </p>
                <p className="mt-0.5 text-xs font-semibold text-[#3f5f7a]">{item.value}</p>
                <p className="text-[10px] text-[#8da1b5]">{item.sub}</p>
              </div>
            ))}
          </div>
        </Surface>
      </div>

      <RecentUsersTable users={recentUsers} />

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
                    <CircleAlert className="h-3.5 w-3.5" />
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
              <CircleAlert className="h-4 w-4 text-[#a8b7c6]" />
            </div>
            <DashboardDonutChart data={categoryShareByYear[categoryYear]} />
            <div className="mt-3 rounded-md border border-[#dce9f8] bg-[#f1f7fd] px-3 py-2 text-[11px] text-[#2f86d8]">
              Most used this month: {topCategory.label}
            </div>
          </div>
        </div>
      </Surface>

      <Surface className="p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-[#3f5f7a]">Plan Summary</h3>
            <p className="text-xs text-[#8ea1b4]">Static breakdown retained from the dashboard design</p>
          </div>
          <span className="text-xs text-[#8ea1b4]">
            Updated {formatRelativeTime(recentUsers[0]?.createdAt ?? new Date().toISOString())}
          </span>
        </div>
        <div className="grid gap-3 xl:grid-cols-2">
          <div className="rounded-md border border-[#dce7f2] p-3.5">
            <h4 className="mb-3 text-sm font-semibold text-[#3f5f7a]">Plan Snapshot</h4>
            <DashboardHorizontalBarChart data={premiumByProductByYear[salesYear]} height={220} />
          </div>
          <div className="rounded-md border border-[#dce7f2] p-3.5">
            <h4 className="mb-3 text-sm font-semibold text-[#3f5f7a]">Sales Notes</h4>
            <div className="space-y-2">
              {salesBreakdownByYear[salesYear].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-md border border-[#e6edf5] px-3 py-2 text-xs text-[#5e768e]"
                >
                  <div>
                    <p className="font-medium text-[#4f6d87]">{item.label}</p>
                    <p className="text-[11px] text-[#90a2b5]">
                      {item.amount} / {item.users} users
                    </p>
                  </div>
                  <span className="text-[11px] font-medium text-[#3ea666]">{item.change}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Surface>
    </div>
  );
}
