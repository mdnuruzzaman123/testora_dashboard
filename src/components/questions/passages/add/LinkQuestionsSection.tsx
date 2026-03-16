import { linkableQuestions, type LinkedQuestionForPassage } from "@/lib/passages-data";
import { cn } from "@/lib/utils";
import { Link2, Search, SlidersHorizontal, Unlink } from "lucide-react";
import { useMemo, useState } from "react";

function statusClass(status: "Published" | "Draft") {
  return status === "Published"
    ? "border-[#d0ecd9] bg-[#e9f8ef] text-[#3ea666]"
    : "border-[#f0dfb9] bg-[#fff3da] text-[#c48a2e]";
}

export default function LinkQuestionsSection({
  linkedIds,
  onToggle,
}: {
  linkedIds: Set<string>;
  onToggle: (id: string) => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return linkableQuestions;
    return linkableQuestions.filter(
      (r: LinkedQuestionForPassage) =>
        r.id.toLowerCase().includes(q) ||
        r.text.toLowerCase().includes(q) ||
        r.subject.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <section className="rounded-lg border border-[#dce7f2] bg-white p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-[#d6eaf6] text-[10px] font-bold text-[#2f86d8]">
            Q
          </span>
          <h3 className="text-sm font-semibold text-[#3f5f7a]">
            Link Questions from Question Bank
          </h3>
        </div>
        <span className="rounded-full border border-[#d6eaf6] bg-[#eaf4fd] px-2 py-0.5 text-[10px] font-semibold text-[#2f86d8]">
          {linkedIds.size} linked
        </span>
      </div>

      {/* Note */}
      <div className="mb-3 rounded-md border border-[#c8ddf2] bg-[#eaf4fd] p-2.5">
        <p className="text-xs text-[#4a7eb8]">
          <strong>Note:</strong> Questions are imported from the Question Bank. The passage only
          connects to existing questions — it does not create separate question records.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-56 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-[#9ab0c3]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions by ID or text..."
            className="h-8 w-full rounded-md border border-[#dce7f2] bg-[#f8fbff] pr-3 pl-7 text-xs text-[#3f5f7a] outline-none placeholder:text-[#9ab0c3]"
          />
        </div>
        <button
          type="button"
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 text-xs text-[#587189]"
        >
          <SlidersHorizontal className="h-3 w-3" />
          Filters
        </button>
        <button
          type="button"
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 text-xs text-[#587189]"
        >
          Select All Visible
        </button>
      </div>

      {/* Filter pills */}
      <div className="mt-2 grid grid-cols-3 gap-2 md:grid-cols-6">
        {["Category", "Year", "Subject", "Faculty", "Department", "Status"].map((f) => (
          <input
            key={f}
            className="h-7 w-full rounded-md border border-[#dce7f2] bg-[#f8fbff] px-2 text-[11px] text-[#4f6d87] outline-none placeholder:text-[#9ab0c3]"
            placeholder={f}
            readOnly
          />
        ))}
      </div>

      {/* Table */}
      <div className="mt-3 overflow-x-auto rounded-md border border-[#dce7f2]">
        <table className="w-full min-w-187.5 text-left">
          <thead className="bg-[#f3f7fb] text-[11px] font-medium tracking-wide text-[#6f859b] uppercase">
            <tr>
              <th className="px-3 py-2">Question ID</th>
              <th className="px-3 py-2">Question Text Preview</th>
              <th className="px-3 py-2">Subject / Faculty / Dept</th>
              <th className="px-3 py-2 text-center">Order</th>
              <th className="px-3 py-2">Test Type</th>
              <th className="px-3 py-2">Access</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Link</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => {
              const isLinked = linkedIds.has(row.id);
              return (
                <tr
                  key={row.id}
                  className={cn(
                    "border-b border-[#ecf2f8] text-xs last:border-b-0",
                    isLinked ? "bg-[#f0fbf5]" : "hover:bg-[#f8fbff]"
                  )}
                >
                  <td className="px-3 py-2.5 font-semibold text-[#2f86d8]">{row.id}</td>
                  <td className="max-w-50 truncate px-3 py-2.5 text-[#5e768e]">{row.text}</td>
                  <td className="px-3 py-2.5 text-[#7e95ab]">
                    {row.subject}
                    <br />
                    <span className="text-[#90a3b6]">
                      {row.faculty} · {row.dept}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-center text-[#587189]">{row.order}</td>
                  <td className="px-3 py-2.5 text-[#587189]">{row.testType}</td>
                  <td className="px-3 py-2.5 text-[#587189]">{row.access}</td>
                  <td className="px-3 py-2.5">
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[10px] font-medium",
                        statusClass(row.status)
                      )}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-2.5">
                    <button
                      type="button"
                      onClick={() => onToggle(row.id)}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-medium transition-colors",
                        isLinked
                          ? "border-[#d0ecd9] bg-[#e9f8ef] text-[#3ea666] hover:bg-[#f0fbf5]"
                          : "border-[#dce7f2] bg-[#f8fbff] text-[#587189] hover:border-[#2f86d8] hover:text-[#2f86d8]"
                      )}
                    >
                      {isLinked ? (
                        <>
                          <Unlink className="h-2.5 w-2.5" />
                          Linked
                        </>
                      ) : (
                        <>
                          <Link2 className="h-2.5 w-2.5" />
                          Link
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
