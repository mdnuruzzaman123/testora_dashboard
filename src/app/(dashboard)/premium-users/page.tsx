"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
  Search,
  Download,
  MoreHorizontal,
  X,
  Eye,
  CalendarPlus,
  XCircle,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CalendarDays,
  CreditCard,
  Hash,
  Clock,
  BarChart2,
  Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockSubscriptions } from "@/lib/mock-data";
import type { PremiumSubscription, SubscriptionStatus, PlanType, PaymentMethod } from "@/types";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function statusBadge(status: SubscriptionStatus) {
  if (status === "Active") return "bg-green-100 text-green-700";
  if (status === "Expired") return "bg-orange-100 text-orange-700";
  return "bg-gray-100 text-gray-600";
}

function planTypeBadge(type: PlanType) {
  if (type === "Yearly") return "bg-blue-100 text-blue-700";
  if (type === "Monthly") return "bg-purple-100 text-purple-700";
  return "bg-teal-100 text-teal-700";
}

function paymentBadge(method: PaymentMethod) {
  if (method === "Stripe") return "bg-indigo-100 text-indigo-700";
  if (method === "PayPal") return "bg-blue-100 text-blue-700";
  if (method === "Manual") return "bg-amber-100 text-amber-700";
  return "bg-gray-100 text-gray-600";
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
  return colors[initials.charCodeAt(0) % colors.length];
}

// ─── Subscription Details Modal ───────────────────────────────────────────────

function SubscriptionDetailsModal({
  sub,
  onClose,
}: {
  sub: PremiumSubscription;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h3 className="text-base font-semibold text-gray-900">Subscription Details</h3>
          <button onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5">
          {/* User */}
          <div className="mb-4 flex items-center gap-3">
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                avatarBg(sub.initials)
              )}
            >
              {sub.initials}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{sub.userName}</p>
              <p className="text-xs text-gray-400">{sub.userEmail}</p>
            </div>
            <span
              className={cn(
                "ml-auto rounded-full px-2.5 py-0.5 text-xs font-medium",
                statusBadge(sub.status)
              )}
            >
              {sub.status}
            </span>
          </div>

          {/* Product chip */}
          <div
            className="mb-4 rounded-lg px-4 py-2 text-sm font-semibold"
            style={{
              backgroundColor: sub.productColor + "18",
              color: sub.productColor,
            }}
          >
            {sub.product}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-3 rounded-lg border border-gray-100 p-4">
            {[
              { icon: BarChart2, label: "Plan Type", value: sub.planType },
              { icon: CalendarDays, label: "Start Date", value: sub.startDate },
              { icon: CalendarDays, label: "Expiry Date", value: sub.expiryDate },
              { icon: CreditCard, label: "Payment Method", value: sub.payment },
              { icon: Hash, label: "Order ID", value: sub.orderId },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className="h-4 w-4 shrink-0 text-gray-300" />
                <span className="flex-1 text-xs text-gray-400">{label}</span>
                <span className="text-xs font-medium text-gray-800">{value}</span>
              </div>
            ))}
          </div>

          {/* Days remaining */}
          {sub.daysRemaining !== undefined && sub.status === "Active" && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700">
              <Clock className="h-4 w-4 shrink-0" />
              <span>
                <strong>{sub.daysRemaining} days remaining</strong> until subscription expiry
              </span>
            </div>
          )}

          {/* Payment history */}
          <div className="mt-4">
            <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-gray-900">
              <CreditCard className="h-4 w-4 text-gray-400" />
              Payment History
            </p>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100 text-left text-gray-400">
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 text-gray-700">{sub.startDate}</td>
                  <td className="py-2 text-gray-700">{sub.amount}</td>
                  <td className="py-2 font-medium text-green-600">Paid</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Extend Subscription Modal ────────────────────────────────────────────────

const EXTENSION_PERIODS = ["+1 day", "+7 days", "+30 days", "+3 months", "+6 months", "+1 year"];

function ExtendSubscriptionModal({
  sub,
  onClose,
  onConfirm,
}: {
  sub: PremiumSubscription;
  onClose: () => void;
  onConfirm: (period: string, note: string) => void;
}) {
  const [period, setPeriod] = useState("");
  const [note, setNote] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl">
        <div className="border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <CalendarPlus className="h-5 w-5 text-blue-500" />
            <div>
              <h3 className="text-base font-semibold text-gray-900">Extend Subscription</h3>
              <p className="text-xs text-gray-400">Add more time to the user&apos;s subscription</p>
            </div>
          </div>
        </div>

        <div className="p-5">
          {/* User chip */}
          <div className="mb-4 flex items-center gap-2.5 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                avatarBg(sub.initials)
              )}
            >
              {sub.initials}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{sub.userName}</p>
              <p className="text-xs text-gray-400">
                {sub.product} · Current expiry: {sub.expiryDate}
              </p>
            </div>
          </div>

          {/* Period selector */}
          <p className="mb-2.5 text-sm font-medium text-gray-700">Select extension period</p>
          <div className="mb-4 grid grid-cols-3 gap-2">
            {EXTENSION_PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-sm font-medium transition",
                  period === p
                    ? "border-blue-500 bg-blue-600 text-white"
                    : "border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                )}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Admin note */}
          <p className="mb-1.5 text-sm font-medium text-gray-700">
            Admin note <span className="font-normal text-gray-400">(optional)</span>
          </p>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Reason for extension..."
            rows={2}
            className="w-full resize-none rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30"
          />
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            disabled={!period}
            onClick={() => onConfirm(period, note)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirm Extension
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Row Actions ──────────────────────────────────────────────────────────────

function RowActions({
  sub,
  onView,
  onExtend,
  onCancel,
}: {
  sub: PremiumSubscription;
  onView: () => void;
  onExtend: () => void;
  onCancel: () => void;
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
        <div className="absolute right-0 z-20 mt-1 w-48 rounded-xl border border-gray-100 bg-white py-1.5 shadow-lg">
          <button
            onClick={() => {
              setOpen(false);
              onView();
            }}
            className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <Eye className="h-4 w-4 text-gray-400" />
            View Subscription
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onExtend();
            }}
            className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
          >
            <CalendarPlus className="h-4 w-4" />
            Extend Subscription
          </button>
          <button
            onClick={() => {
              setOpen(false);
              onCancel();
            }}
            className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <XCircle className="h-4 w-4" />
            Cancel Subscription
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const ROWS_PER_PAGE = 10;

export default function PremiumUsersPage() {
  const [search, setSearch] = useState("");
  const [productFilter, setProductFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [showBanner, setShowBanner] = useState(true);

  const [detailsSub, setDetailsSub] = useState<PremiumSubscription | null>(null);
  const [extendSub, setExtendSub] = useState<PremiumSubscription | null>(null);

  // Stats
  const activeCount = mockSubscriptions.filter((s) => s.status === "Active").length;
  const expiredCount = mockSubscriptions.filter((s) => s.status === "Expired").length;
  const cancelledCount = mockSubscriptions.filter((s) => s.status === "Cancelled").length;
  const expiringSoon = mockSubscriptions.filter(
    (s) => s.expiringWarning && s.status === "Active"
  ).length;

  // Filtering
  const filtered = useMemo(() => {
    return mockSubscriptions.filter((s) => {
      const matchSearch =
        !search ||
        s.userName.toLowerCase().includes(search.toLowerCase()) ||
        s.userEmail.toLowerCase().includes(search.toLowerCase()) ||
        s.orderId.toLowerCase().includes(search.toLowerCase());
      const matchProduct = productFilter === "All" || s.product.includes(productFilter);
      const matchPlan = planFilter === "All" || s.planType === planFilter;
      const matchStatus = statusFilter === "All" || s.status === statusFilter;
      return matchSearch && matchProduct && matchPlan && matchStatus;
    });
  }, [search, productFilter, planFilter, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);
  const resetPage = () => setPage(1);

  const statCards = [
    {
      label: "Active Subscriptions",
      value: activeCount,
      change: "+12%",
      changeUp: true,
      color: "border-l-green-400",
      icon: "👑",
    },
    {
      label: "Expired This Month",
      value: expiredCount,
      change: "+2",
      changeUp: false,
      color: "border-l-orange-400",
      icon: "⏰",
    },
    {
      label: "Cancelled Plans",
      value: cancelledCount,
      change: "-2",
      changeUp: false,
      color: "border-l-gray-400",
      icon: "⚙️",
    },
    {
      label: "Expiring Soon (30d)",
      value: expiringSoon,
      change: "-5",
      changeUp: false,
      color: "border-l-red-400",
      icon: "⚠️",
    },
  ];

  return (
    <div className="min-h-full p-6">
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Premium Subscribers</h1>
            <p className="mt-0.5 text-sm text-gray-400">
              Manage premium users and view payment details
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
              <BarChart2 className="h-3.5 w-3.5" />
              Subscription Report
            </button>
          </div>
        </div>

        {/* Info banner */}
        {showBanner && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
            <p className="flex-1">
              This screen manages digital subscription packages only —{" "}
              <strong>Semimatura, Matura, and Entrance Exam preparation packages</strong>.
              Marketplace purchases (books, bags, physical items) are managed separately in the
              Orders section. User accounts are managed in User Management.
            </p>
            <button
              onClick={() => setShowBanner(false)}
              className="text-blue-400 hover:text-blue-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="mb-5 grid grid-cols-4 gap-3">
          {statCards.map((s) => (
            <div
              key={s.label}
              className={cn("rounded-xl border border-l-4 border-gray-100 p-4 shadow-sm", s.color)}
            >
              <div className="mb-1 flex items-center justify-between">
                <span className="text-lg">{s.icon}</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-xs font-medium",
                    s.changeUp ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                  )}
                >
                  {s.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="relative max-w-xs min-w-[220px] flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or order ID..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                resetPage();
              }}
              className="w-full rounded-lg border border-gray-200 py-2 pr-3 pl-9 text-sm text-gray-700 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/30"
            />
          </div>
          <select
            value={productFilter}
            onChange={(e) => {
              setProductFilter(e.target.value);
              resetPage();
            }}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-400"
          >
            <option value="All">Product: All</option>
            <option value="Matura">Matura</option>
            <option value="Semimatura">Semimatura</option>
            <option value="Medicine">Medicine Entrance</option>
            <option value="Law">Law Entrance</option>
            <option value="Economics">Economics Entrance</option>
          </select>
          <select
            value={planFilter}
            onChange={(e) => {
              setPlanFilter(e.target.value);
              resetPage();
            }}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-400"
          >
            <option value="All">Plan: All</option>
            <option value="Yearly">Yearly</option>
            <option value="Monthly">Monthly</option>
            <option value="One-time">One-time</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              resetPage();
            }}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 outline-none focus:border-blue-400"
          >
            <option value="All">Status: All</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <span className="ml-auto text-sm text-gray-400">
            {filtered.length} subscriptions found
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70 text-left text-xs font-medium tracking-wide text-gray-400 uppercase">
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Plan Type</th>
                <th className="px-4 py-3">Start Date</th>
                <th className="px-4 py-3">Expiry Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-sm text-gray-400">
                    No subscriptions found
                  </td>
                </tr>
              ) : (
                paginated.map((sub) => (
                  <tr key={sub.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                            avatarBg(sub.initials)
                          )}
                        >
                          {sub.initials}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{sub.userName}</p>
                          <p className="text-xs text-gray-400">{sub.userEmail}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: sub.productColor }}
                        />
                        <span className="text-sm text-gray-700">{sub.product}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-medium",
                          planTypeBadge(sub.planType)
                        )}
                      >
                        {sub.planType}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-500">{sub.startDate}</td>
                    <td className="px-4 py-3.5">
                      <div>
                        <p
                          className={cn(
                            "text-sm",
                            sub.expiringWarning ? "font-semibold text-red-500" : "text-gray-500"
                          )}
                        >
                          {sub.expiryDate}
                        </p>
                        {sub.expiringWarning && (
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-red-400">
                            <AlertCircle className="h-3 w-3" />
                            {sub.daysRemaining === 0 ? "Today!" : `${sub.daysRemaining} days left`}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-medium",
                          statusBadge(sub.status)
                        )}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-medium",
                          paymentBadge(sub.payment)
                        )}
                      >
                        {sub.payment}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-xs text-gray-400">{sub.orderId}</td>
                    <td className="px-4 py-3.5">
                      <RowActions
                        sub={sub}
                        onView={() => setDetailsSub(sub)}
                        onExtend={() => setExtendSub(sub)}
                        onCancel={() => {
                          /* TODO: API cancel */
                        }}
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
      {detailsSub && (
        <SubscriptionDetailsModal sub={detailsSub} onClose={() => setDetailsSub(null)} />
      )}
      {extendSub && (
        <ExtendSubscriptionModal
          sub={extendSub}
          onClose={() => setExtendSub(null)}
          onConfirm={(_period, _note) => {
            // TODO: API extend call
            setExtendSub(null);
          }}
        />
      )}
    </div>
  );
}
