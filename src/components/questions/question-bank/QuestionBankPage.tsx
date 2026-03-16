"use client";

import Pagination from "@/components/users/Pagination";
import { questionBankRows, type QuestionStatus } from "@/lib/question-system-data";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Copy,
  Download,
  Eye,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

// ─── Badge helpers ────────────────────────────────────────────────────────────

function statusBadgeClass(status: QuestionStatus) {
  if (status === "Published") return "border-[#d0ecd9] bg-[#e9f8ef] text-[#3ea666]";
  if (status === "Draft") return "border-[#f0dfb9] bg-[#fff3da] text-[#c48a2e]";
  if (status === "Hidden") return "border-[#dee8f2] bg-[#f2f6fb] text-[#6d839a]";
  return "border-[#f4d7d7] bg-[#fdeeee] text-[#db6f6f]";
}

function accessBadgeClass(access: string) {
  return access === "Premium"
    ? "border-[#e4ddf4] bg-[#f1edfb] text-[#8468c4]"
    : "border-[#d6e5f4] bg-[#eaf2fb] text-[#4d93d9]";
}

function categoryBadgeClass(category: string) {
  if (category === "Matura") return "border-[#d6e5f4] bg-[#eaf2fb] text-[#4d93d9]";
  if (category === "Semimatura") return "border-[#dce4f6] bg-[#edf0fb] text-[#748ccc]";
  if (category === "Entrance Exam") return "border-[#d5ece5] bg-[#e9f5f1] text-[#3b9b81]";
  return "border-[#dee8f2] bg-[#f2f6fb] text-[#6d839a]";
}

const STATUS_TABS: { label: string; value: string }[] = [
  { label: "All", value: "All" },
  { label: "Published", value: "Published" },
  { label: "Draft", value: "Draft" },
  { label: "Hidden", value: "Hidden" },
  { label: "Archived", value: "Archived" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function QuestionBankPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filtered = useMemo(() => {
    return questionBankRows.filter((row) => {
      const q = search.trim().toLowerCase();
      const matchSearch =
        q.length === 0 ||
        row.id.toLowerCase().includes(q) ||
        row.text.toLowerCase().includes(q) ||
        row.subject.toLowerCase().includes(q);
      const matchTab = activeTab === "All" || row.status === activeTab;
      return matchSearch && matchTab;
    });
  }, [search, activeTab]);

  const safePage = Math.min(page, Math.max(1, Math.ceil(filtered.length / rowsPerPage)));

  const paginated = useMemo(() => {
    const start = (safePage - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [filtered, safePage, rowsPerPage]);

  return (
    <div className="space-y-3">
      {/* Header */}
      <section className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-[#3f5f7a]">Question Bank</h2>
          <p className="text-sm text-[#7e95ab]">Manage all questions in one centralized database</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#dce7f2] bg-white px-3 text-xs font-medium text-[#3f5f7a] hover:bg-[#f8fbff]"
          >
            <Download className="h-3.5 w-3.5" />
            Import
          </button>
          <Link
            href="/questions/question-bank/add"
            className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#2f86d8] px-3 text-xs font-medium text-white hover:bg-[#2a78c6]"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Question
          </Link>
        </div>
      </section>

      {/* Filters + status tabs */}
      <section className="rounded-lg border border-[#dce7f2] bg-white p-3">
        {/* Search + action buttons */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <label className="relative block min-w-[240px] flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-[#9ab0c3]" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search questions by ID or text..."
              className="h-9 w-full rounded-md border border-[#dce7f2] bg-[#f8fbff] pr-3 pl-8 text-sm text-[#3f5f7a] outline-none placeholder:text-[#9ab0c3]"
            />
          </label>

          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 text-xs font-medium text-[#587189]"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters
          </button>

          <button
            type="button"
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 text-xs font-medium text-[#587189]"
          >
            Bulk Actions
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>

        {/* Status tab pills */}
        <div className="flex flex-wrap gap-1.5">
          {STATUS_TABS.map((tab) => {
            const isActive = tab.value === activeTab;
            const count =
              tab.value === "All"
                ? questionBankRows.length
                : questionBankRows.filter((r) => r.status === tab.value).length;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => {
                  setActiveTab(tab.value);
                  setPage(1);
                }}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium",
                  isActive
                    ? "bg-[#edf4fb] text-[#2f86d8]"
                    : "bg-[#f3f7fb] text-[#7e95ab] hover:text-[#3f5f7a]"
                )}
              >
                {tab.label}
                <span
                  className={cn(
                    "rounded-sm px-1 text-[10px]",
                    isActive ? "bg-[#d6eaf9] text-[#2f86d8]" : "bg-[#e8eef5] text-[#90a3b6]"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Table */}
      <section className="overflow-hidden rounded-lg border border-[#dce7f2] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] text-left">
            <thead className="bg-[#f3f7fb] text-[11px] font-medium tracking-wide text-[#6f859b] uppercase">
              <tr>
                <th className="px-4 py-2.5">ID</th>
                <th className="px-4 py-2.5">Category</th>
                <th className="px-4 py-2.5">Year</th>
                <th className="px-4 py-2.5">Subject</th>
                <th className="px-4 py-2.5">Faculty</th>
                <th className="px-4 py-2.5">Dept</th>
                <th className="px-4 py-2.5">Type</th>
                <th className="px-4 py-2.5">Access</th>
                <th className="px-4 py-2.5">Order</th>
                <th className="px-4 py-2.5">Passage</th>
                <th className="max-w-[200px] px-4 py-2.5">Question Text</th>
                <th className="px-4 py-2.5">Correct</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginated.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[#ecf2f8] text-xs text-[#5e768e] last:border-b-0 hover:bg-[#f8fbff]"
                >
                  <td className="px-4 py-2.5 font-semibold text-[#2f86d8]">{row.id}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className={cn(
                        "rounded-sm border px-2 py-0.5 text-[11px]",
                        categoryBadgeClass(row.category)
                      )}
                    >
                      {row.category}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">{row.year}</td>
                  <td className="px-4 py-2.5">{row.subject}</td>
                  <td className="px-4 py-2.5 text-[#90a3b6]">{row.faculty}</td>
                  <td className="px-4 py-2.5 text-[#90a3b6]">{row.dept}</td>
                  <td className="px-4 py-2.5">{row.type}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className={cn(
                        "rounded-sm border px-2 py-0.5 text-[11px]",
                        accessBadgeClass(row.access)
                      )}
                    >
                      {row.access}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">{row.order}</td>
                  <td
                    className={cn(
                      "px-4 py-2.5 text-[11px]",
                      row.passage !== "—" ? "font-medium text-[#8468c4]" : "text-[#90a3b6]"
                    )}
                  >
                    {row.passage}
                  </td>
                  <td className="max-w-[200px] truncate px-4 py-2.5">{row.text}</td>
                  <td className="px-4 py-2.5 font-semibold text-[#3ea666]">{row.correct}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px]",
                        statusBadgeClass(row.status)
                      )}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-0.5 text-[#7f95aa]">
                      <button
                        type="button"
                        aria-label="View question"
                        className="rounded p-1 hover:bg-[#f3f7fb] hover:text-[#2f86d8]"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <Link
                        href="/questions/question-bank/add"
                        aria-label="Edit question"
                        className="rounded p-1 hover:bg-[#f3f7fb] hover:text-[#2f86d8]"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        type="button"
                        aria-label="Duplicate question"
                        className="rounded p-1 hover:bg-[#f3f7fb] hover:text-[#2f86d8]"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        aria-label="Delete question"
                        className="rounded p-1 hover:bg-[#fdeeee] hover:text-[#db6f6f]"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td colSpan={14} className="px-5 py-10 text-center text-sm text-[#90a3b6]">
                    No questions match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          totalItems={filtered.length}
          page={safePage}
          rowsPerPage={rowsPerPage}
          onPageChange={setPage}
          onRowsPerPageChange={(rows) => {
            setRowsPerPage(rows);
            setPage(1);
          }}
        />
      </section>
    </div>
  );
}
