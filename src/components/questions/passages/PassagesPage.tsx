"use client";

import { passageEntityFields, passageRows } from "@/lib/passages-data";
import { AlertTriangle, CheckCircle2, Plus, Search, Smartphone, XCircle } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import PassageTable from "./PassageTable";

// ─── Correct vs Wrong implementation data ─────────────────────────────────────

const correctItems = [
  { label: "Passage 1", sub: "(shared content block)", highlight: true },
  { label: "Question 1 (linked to passage 1)", highlight: false },
  { label: "Question 2 (linked to Passage 1)", highlight: false },
  { label: "Question 3 (linked to Passage 1)", highlight: false },
  { label: "Q4 through Q10 ...", highlight: false, muted: true },
  { label: "Next question after passage = Q11 ✓", highlight: true, green: true },
];

const wrongItems = [
  { label: "Q1 — Passage treated as Question 1 ✗", cross: true },
  { label: "Q2 — First real question (Passage Q1) ✗", cross: true },
  { label: "Q3 — Numbering is shifted by 1 ✗", cross: true },
];

// ─── Question Order breadcrumb pills ─────────────────────────────────────────

const orderPills = ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10", "Q11", "Q12"];

// ─── Component ────────────────────────────────────────────────────────────────

export default function PassagesPage() {
  const [search, setSearch] = useState("");

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return passageRows;
    return passageRows.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.range.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="space-y-3">
      {/* ── Page header ─────────────────────────────────────────────────────── */}
      <section className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-[#3f5f7a]">Passage System</h2>
          <p className="text-sm text-[#7e95ab]">
            Manage shared text blocks linked to multiple questions
          </p>
        </div>
        <Link
          href="/questions/passages/add"
          className="inline-flex h-9 items-center gap-1.5 rounded-md bg-[#2f86d8] px-3 text-xs font-medium text-white hover:bg-[#2a78c6]"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Passage
        </Link>
      </section>

      {/* ── Critical rule warning ────────────────────────────────────────────── */}
      <section className="flex items-start gap-2.5 rounded-lg border border-[#f5d97d] bg-[#fffbea] px-4 py-3">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#c48a2e]" />
        <div>
          <p className="text-xs font-semibold text-[#8a6120]">
            Critical Rule: A passage is NOT a question
          </p>
          <p className="mt-0.5 text-xs text-[#a07430]">
            A passage does not take a question number. It is a shared content block (text/image)
            displayed before its linked questions. Question numbering continues normally — the
            passage itself is not counted.
          </p>
        </div>
      </section>

      {/* ── Correct vs Wrong implementation ─────────────────────────────────── */}
      <section className="grid gap-3 md:grid-cols-2">
        {/* Correct */}
        <div className="rounded-lg border border-[#c8e6d5] bg-white p-4">
          <div className="mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#3ea666]" />
            <span className="text-sm font-semibold text-[#2d7a52]">Correct Implementation</span>
          </div>
          <div className="space-y-1.5 rounded-md border border-[#c8e6d5] bg-[#f1fbf5] p-3">
            {correctItems.map((item, i) => (
              <div
                key={i}
                className={
                  item.green
                    ? "text-xs font-medium text-[#2d7a52]"
                    : item.highlight
                      ? "flex items-center gap-1.5 text-xs font-medium text-[#4a93d9]"
                      : item.muted
                        ? "pl-4 text-xs text-[#90a3b6]"
                        : "pl-4 text-xs text-[#5e768e]"
                }
              >
                {item.highlight && !item.green && (
                  <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded bg-[#d6eaf6] text-[9px] font-bold text-[#2f86d8]">
                    P
                  </span>
                )}
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Wrong */}
        <div className="rounded-lg border border-[#f4d7d7] bg-white p-4">
          <div className="mb-3 flex items-center gap-1.5">
            <XCircle className="h-4 w-4 text-[#db6f6f]" />
            <span className="text-sm font-semibold text-[#b04040]">Wrong Implementation</span>
          </div>
          <div className="space-y-1.5 rounded-md border border-[#f4d7d7] bg-[#fdf3f3] p-3">
            {wrongItems.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-[#c05050]">
                <span className="inline-flex h-4 w-5 shrink-0 items-center justify-center rounded bg-[#fde8e8] text-[9px] font-bold text-[#db6f6f]">
                  Q{i + 1}
                </span>
                <span className="line-through opacity-70">
                  {item.label.replace(/^Q\d — /, "").replace(" ✗", "")}
                </span>
                <XCircle className="h-3 w-3 shrink-0 text-[#db6f6f]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Passage Entity Fields ────────────────────────────────────────────── */}
      <section className="rounded-lg border border-[#dce7f2] bg-white p-4">
        <h3 className="mb-3 text-sm font-semibold text-[#3f5f7a]">Passage Entity Fields</h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
          {passageEntityFields.map((field) => (
            <div
              key={field.label}
              className="rounded-md border border-[#dce7f2] bg-[#f8fbff] p-2.5"
            >
              <p className="text-xs font-semibold text-[#3f5f7a]">{field.label}</p>
              {field.desc && <p className="mt-0.5 text-[10px] text-[#90a3b6]">{field.desc}</p>}
              {field.detail && <p className="mt-0.5 text-[10px] text-[#9ab0c3]">{field.detail}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* ── App Preview ──────────────────────────────────────────────────────── */}
      <section className="rounded-lg border border-[#dce7f2] bg-white p-4">
        <div className="mb-3 flex items-center gap-1.5">
          <Smartphone className="h-4 w-4 text-[#4a93d9]" />
          <h3 className="text-sm font-semibold text-[#3f5f7a]">App Preview — Passage Display</h3>
        </div>
        <div className="flex justify-center">
          <div className="w-64 overflow-hidden rounded-3xl border-2 border-[#2a2a2a] bg-[#1a1a2e] shadow-none">
            {/* Phone notch */}
            <div className="flex items-center justify-between bg-[#1a1a2e] px-4 py-1.5">
              <span className="text-[9px] text-white">09:41</span>
              <div className="flex items-center gap-1">
                <div className="h-1.5 w-3 rounded-sm bg-white/60" />
                <div className="h-1.5 w-1.5 rounded-sm bg-white/60" />
                <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
              </div>
            </div>
            {/* App content */}
            <div className="bg-white px-3 pb-3">
              {/* Header bar */}
              <div className="flex items-center justify-between border-b border-[#e8eef4] py-2">
                <span className="text-[9px] font-semibold text-[#3f5f7a]">
                  Semi-Matura 2022 · Simulation
                </span>
                <span className="rounded-full bg-[#fff3da] px-1.5 py-0.5 text-[8px] font-medium text-[#c48a2e]">
                  PREMIUM
                </span>
              </div>
              <p className="mt-1.5 text-[8px] font-semibold text-[#3f5f7a]">Albanian Language</p>

              {/* Passage banner */}
              <div className="mt-2 flex items-center justify-between rounded bg-[#edf4fb] px-2 py-1">
                <span className="text-[8px] font-medium text-[#2f86d8]">
                  Passage 1 (1–10 questions)
                </span>
                <span className="rounded bg-[#2f86d8] px-1.5 py-0.5 text-[7px] font-medium text-white">
                  Open Text
                </span>
              </div>

              {/* Passage image placeholder */}
              <div className="mt-2 flex h-16 items-center justify-center rounded bg-[#f3f7fb]">
                <div className="text-center">
                  <div className="mx-auto mb-1 h-6 w-8 rounded bg-[#dce7f2]" />
                  <div className="h-1 w-12 rounded bg-[#dce7f2]" />
                </div>
              </div>

              {/* Question text */}
              <p className="mt-2 text-[7.5px] leading-relaxed text-[#4a6070]">
                1. A block of mass mmm is placed on a rough inclined plane making an angle θtheta
                with the horizontal. The block is sliding down the plane...
              </p>

              {/* Answer options */}
              {["a·g(sinθ–μkcosθ)", "a·g(sinθ+μkcosθ)", "a·g(cosθ–μksinθ)", "a·g(μkcosθ–sinθ)"].map(
                (opt, i) => (
                  <div
                    key={opt}
                    className={`mt-1 flex items-center gap-1.5 rounded px-1.5 py-1 text-[7px] ${
                      i === 1 ? "bg-[#d6eaf6] text-[#2f86d8]" : "bg-[#f8fbff] text-[#4a6070]"
                    }`}
                  >
                    <span className="h-3 w-3 shrink-0 rounded-full border border-current" />
                    {opt}
                  </div>
                )
              )}

              {/* Next button */}
              <button className="mt-2 w-full rounded bg-[#2f86d8] py-1.5 text-[8px] font-medium text-white">
                Next Question →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Question Order Logic ─────────────────────────────────────────────── */}
      <section className="rounded-lg border border-[#dce7f2] bg-white p-4">
        <h3 className="text-sm font-semibold text-[#3f5f7a]">Question Order Logic</h3>
        <p className="mb-3 text-xs text-[#90a3b6]">
          Each question has a Question Order field → its real position inside the test
        </p>

        {/* Pills */}
        <div className="flex flex-wrap gap-1.5">
          {orderPills.map((pill, i) => {
            const isPassageLinked = i < 10; // Q1–Q10 linked to passage
            return (
              <span
                key={pill}
                className={`inline-flex h-6 w-8 items-center justify-center rounded text-[10px] font-semibold ${
                  isPassageLinked ? "bg-[#d6eaf6] text-[#2f86d8]" : "bg-[#f3f7fb] text-[#587189]"
                }`}
              >
                {pill}
              </span>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-2.5 flex flex-wrap gap-4">
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded bg-[#d6eaf6]" />
            <span className="text-[10px] text-[#587189]">Passage-linked questions (Q1–Q10)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded border border-[#dce7f2] bg-[#f3f7fb]" />
            <span className="text-[10px] text-[#587189]">Next standalone question (Q11)</span>
          </div>
        </div>

        {/* Info grid */}
        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-md border border-[#dce7f2] bg-[#f8fbff] p-2.5">
            <p className="text-[10px] font-semibold tracking-wide text-[#90a3b6] uppercase">
              Current Question
            </p>
            <p className="mt-1 text-sm font-semibold text-[#3f5f7a]">Position inside the test</p>
          </div>
          <div className="rounded-md border border-[#dce7f2] bg-[#f8fbff] p-2.5">
            <p className="text-[10px] font-semibold tracking-wide text-[#90a3b6] uppercase">
              Max Question
            </p>
            <p className="mt-1 text-sm font-semibold text-[#3f5f7a]">Total questions in the test</p>
          </div>
        </div>
      </section>

      {/* ── Search + Table ───────────────────────────────────────────────────── */}
      <section className="rounded-lg border border-[#dce7f2] bg-white p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-[#9ab0c3]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search passages..."
            className="h-9 w-full rounded-md border border-[#dce7f2] bg-[#f8fbff] pr-3 pl-8 text-sm text-[#3f5f7a] outline-none placeholder:text-[#9ab0c3] focus:border-[#2f86d8]"
          />
        </div>
      </section>

      <PassageTable rows={filteredRows} />
    </div>
  );
}
