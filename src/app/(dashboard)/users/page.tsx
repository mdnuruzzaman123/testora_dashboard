"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
  Search,
  Download,
  MoreHorizontal,
  X,
  Eye,
  ShieldOff,
  UserX,
  Archive,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  BookOpen,
  CreditCard,
  CalendarDays,
  BarChart2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockUsers } from "@/lib/mock-data";
import type { User, UserStatus } from "@/types";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function statusBadge(status: UserStatus) {
  if (status === "Active") return "bg-green-100 text-green-700";
  if (status === "Suspended") return "bg-red-100 text-red-600";
  return "bg-yellow-100 text-yellow-700";
}

function statusDot(status: UserStatus) {
  if (status === "Active") return "bg-green-500";
  if (status === "Suspended") return "bg-red-500";
  return "bg-yellow-500";
}

function categoryColor(cat: string) {
  if (cat === "Matura") return "text-blue-600";
  if (cat === "Semimatura") return "text-purple-600";
  return "text-teal-600";
}

function planBadge(plan: string) {
  if (plan === "Free") return null;
  if (plan.includes("Matura Pack")) return "bg-orange-100 text-orange-700";
  if (plan.includes("Semimatura Pack")) return "bg-purple-100 text-purple-700";
  if (plan.includes("Medicine")) return "bg-rose-100 text-rose-700";
  if (plan.includes("Law")) return "bg-amber-100 text-amber-700";
  if (plan.includes("Economics")) return "bg-yellow-100 text-yellow-700";
  return "bg-blue-100 text-blue-700";
}

function avatarBg(initials: string) {
  const colors = [
    "bg-blue-100 text-blue-600",
    "bg-green-100 text-green-600",
    "bg-purple-100 text-purple-600",
    "bg-rose-100 text-rose-600",
    "bg-amber-100 text-amber-600",
    "bg-teal-100 text-teal-600",
    "bg-indigo-100 text-indigo-600",
    "bg-pink-100 text-pink-600",
  ];
  const idx = initials.charCodeAt(0) % colors.length;
  return colors[idx];
}

// ─── Suspend Modal ────────────────────────────────────────────────────────────

const SUSPEND_REASONS = ["Spam", "Abuse", "Payment issue", "Other"] as const;

function SuspendModal({
  user,
  onClose,
  onConfirm,
}: {
  user: User;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = useState<string>("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900">Suspend User</h3>
              <p className="mt-0.5 text-sm text-gray-500">
                This will restrict the user&apos;s access to the platform
              </p>
            </div>
          </div>

          {/* User chip */}
          <div className="mb-5 flex items-center gap-2.5 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                avatarBg(user.initials)
              )}
            >
              {user.initials}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>

          {/* Reasons */}
          <p className="mb-3 text-sm font-medium text-gray-700">Reason for suspension</p>
          <div className="flex flex-col gap-2">
            {SUSPEND_REASONS.map((r) => (
              <label
                key={r}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-2.5 text-sm transition",
                  reason === r
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 text-gray-700 hover:border-gray-300"
                )}
              >
                <input
                  type="radio"
                  name="suspend-reason"
                  value={r}
                  checked={reason === r}
                  onChange={() => setReason(r)}
                  className="accent-blue-600"
                />
                {r}
              </label>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            disabled={!reason}
            onClick={() => onConfirm(reason)}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirm Suspension
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── User Profile Modal ───────────────────────────────────────────────────────

function UserProfileModal({ user, onClose }: { user: User; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h3 className="text-base font-semibold text-gray-900">User Profile</h3>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Avatar & name */}
        <div className="flex flex-col items-center gap-2 pt-6 pb-4">
          <div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold",
              avatarBg(user.initials)
            )}
          >
            {user.initials}
          </div>
          <div className="text-center">
            <p className="font-semibold text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-medium",
              statusBadge(user.status)
            )}
          >
            {user.status}
          </span>
        </div>

        {/* Quick stats */}
        <div className="mx-5 mb-4 grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-blue-50 p-3 text-center">
            <p className="text-lg font-bold text-blue-700">{user.completedQuizzes}</p>
            <p className="text-xs text-blue-500">Quizzes</p>
          </div>
          <div className="rounded-lg bg-green-50 p-3 text-center">
            <p className="text-lg font-bold text-green-700">{user.averageScore}%</p>
            <p className="text-xs text-green-500">Avg Score</p>
          </div>
          <div className="rounded-lg bg-purple-50 p-3 text-center">
            <p className="text-sm font-bold text-purple-700">{user.lastActivity}</p>
            <p className="text-xs text-purple-500">Last Active</p>
          </div>
        </div>

        {/* Details list */}
        <div className="mx-5 mb-5 flex flex-col gap-3 rounded-lg border border-gray-100 p-4">
          {[
            { icon: Mail, label: "Email", value: user.email },
            { icon: Phone, label: "Phone", value: user.phone },
            { icon: BookOpen, label: "Category", value: user.category },
            { icon: CreditCard, label: "Active Plan", value: user.activePlan },
            { icon: CalendarDays, label: "Joining Date", value: user.joinedDate },
            { icon: CalendarDays, label: "Plan Date", value: user.planDate },
            { icon: CalendarDays, label: "Plan Expiration", value: user.planExpiration },
            { icon: BarChart2, label: "Completed Quizzes", value: String(user.completedQuizzes) },
            { icon: BarChart2, label: "Average Score", value: `${user.averageScore}%` },
            { icon: Clock, label: "Last Login", value: user.lastLogin },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="h-4 w-4 shrink-0 text-gray-300" />
              <div className="flex flex-1 items-center justify-between gap-2">
                <span className="text-xs text-gray-400">{label}</span>
                <span className="text-xs font-medium text-gray-800">{value}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Row Action Menu ──────────────────────────────────────────────────────────

function RowActions({
  user,
  onView,
  onSuspend,
}: {
  user: User;
  onView: () => void;
  onSuspend: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-1 w-44 rounded-xl border border-gray-100 bg-white py-1.5 shadow-lg">
          <button
            onClick={() => {
              setOpen(false);
              onView();
            }}
            className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <Eye className="h-4 w-4 text-gray-400" />
            View User
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onSuspend();
            }}
            className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <ShieldOff className="h-4 w-4" />
            Suspend User
          </button>
          <button
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50"
          >
            <UserX className="h-4 w-4" />
            Deactivate User
          </button>
          <button
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <Archive className="h-4 w-4 text-gray-400" />
            Archive User
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const ROWS_PER_PAGE = 10;

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [suspendUser, setSuspendUser] = useState<User | null>(null);

  // Stats
  const totalUsers = mockUsers.length;
  const activeCount = mockUsers.filter((u) => u.status === "Active").length;
  const suspendedCount = mockUsers.filter((u) => u.status === "Suspended").length;
  const inactiveCount = mockUsers.filter((u) => u.status === "Inactive").length;

  // Filtering
  const filtered = useMemo(() => {
    return mockUsers.filter((u) => {
      const matchSearch =
        !search ||
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchCat = categoryFilter === "All" || u.category === categoryFilter;
      const matchPlan = planFilter === "All" || u.activePlan === planFilter;
      const matchStatus = statusFilter === "All" || u.status === statusFilter;
      return matchSearch && matchCat && matchPlan && matchStatus;
    });
  }, [search, categoryFilter, planFilter, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

  const resetPage = () => setPage(1);

  const statCards = [
    { label: "Total Users", value: totalUsers, color: "text-blue-600 bg-blue-50" },
    { label: "Active", value: activeCount, color: "text-green-600 bg-green-50" },
    { label: "Suspended", value: suspendedCount, color: "text-red-600 bg-red-50" },
    { label: "Inactive", value: inactiveCount, color: "text-yellow-600 bg-yellow-50" },
  ];

  return (
    <div className="min-h-full p-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-5">
          <h1 className="text-lg font-semibold text-gray-900">User Management</h1>
          <p className="mt-0.5 text-sm text-gray-400">View, search, and manage all users</p>
        </div>

        {/* Stats row */}
        <div className="mb-5 grid grid-cols-4 gap-3">
          {statCards.map((s) => (
            <div key={s.label} className={cn("flex items-center gap-3 rounded-xl p-4", s.color)}>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs opacity-70">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="relative max-w-xs min-w-[200px] flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                resetPage();
              }}
              className="w-full rounded-lg border border-gray-200 py-2 pr-3 pl-9 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              resetPage();
            }}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-400"
          >
            <option>All</option>
            <option>Matura</option>
            <option>Semimatura</option>
            <option>Entrance Exams</option>
          </select>
          <select
            value={planFilter}
            onChange={(e) => {
              setPlanFilter(e.target.value);
              resetPage();
            }}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-400"
          >
            <option>All</option>
            <option>Free</option>
            <option>Matura Pack</option>
            <option>Semimatura Pack</option>
            <option>Medicine Entrance</option>
            <option>Law Entrance</option>
            <option>Economics Entrance</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              resetPage();
            }}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-400"
          >
            <option>All</option>
            <option>Active</option>
            <option>Suspended</option>
            <option>Inactive</option>
          </select>
          <button className="ml-auto flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70 text-left text-xs font-medium tracking-wide text-gray-400 uppercase">
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Preferred Category</th>
                <th className="px-4 py-3">Active Plan</th>
                <th className="px-4 py-3">Last Activity</th>
                <th className="px-4 py-3">Joined Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-gray-400">
                    No users found
                  </td>
                </tr>
              ) : (
                paginated.map((user) => (
                  <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                            avatarBg(user.initials)
                          )}
                        >
                          {user.initials}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={cn("text-sm font-medium", categoryColor(user.category))}>
                        {user.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      {planBadge(user.activePlan) ? (
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-0.5 text-xs font-medium",
                            planBadge(user.activePlan)
                          )}
                        >
                          {user.activePlan}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">Free</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-gray-500">{user.lastActivity}</td>
                    <td className="px-4 py-3.5 text-gray-500">{user.joinedDate}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className={cn("h-1.5 w-1.5 rounded-full", statusDot(user.status))} />
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-0.5 text-xs font-medium",
                            statusBadge(user.status)
                          )}
                        >
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <RowActions
                        user={user}
                        onView={() => setProfileUser(user)}
                        onSuspend={() => setSuspendUser(user)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>
            Showing {filtered.length === 0 ? 0 : (page - 1) * ROWS_PER_PAGE + 1}–
            {Math.min(page * ROWS_PER_PAGE, filtered.length)} of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md border text-sm",
                  p === page
                    ? "border-blue-500 bg-blue-600 text-white"
                    : "border-gray-200 hover:bg-gray-50"
                )}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalPages === 0}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {profileUser && <UserProfileModal user={profileUser} onClose={() => setProfileUser(null)} />}
      {suspendUser && (
        <SuspendModal
          user={suspendUser}
          onClose={() => setSuspendUser(null)}
          onConfirm={(_reason) => {
            // TODO: API call to suspend user
            setSuspendUser(null);
          }}
        />
      )}
    </div>
  );
}
