"use client";

import { ChevronLeft, Copy, Eye, FileEdit, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";
import AppPreviewCard from "./AppPreviewCard";
import BasicPassageInformationSection, {
  type PassageStatus,
} from "./BasicPassageInformationSection";
import CriticalPassageRuleCard from "./CriticalPassageRuleCard";
import LinkedQuestionRangeSection from "./LinkedQuestionRangeSection";
import LinkQuestionsSection from "./LinkQuestionsSection";
import PassageRelationshipSummary from "./PassageRelationshipSummary";

type FormState = {
  passageId: string;
  passageTitle: string;
  passageContent: string;
  status: PassageStatus;
  startOrder: string;
  endOrder: string;
};

const initialState: FormState = {
  passageId: "",
  passageTitle: "",
  passageContent: "",
  status: "Draft",
  startOrder: "1",
  endOrder: "10",
};

export default function AddPassagePage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [linkedIds, setLinkedIds] = useState<Set<string>>(new Set());

  const updateField = useCallback(<K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const toggleLinked = useCallback((id: string) => {
    setLinkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return (
    <div className="space-y-3">
      {/* ── Page header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <Link
          href="/questions/passages"
          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-[#dce7f2] bg-white text-[#7f95aa] hover:bg-[#f8fbff]"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <div>
          <h2 className="text-base font-semibold text-[#3f5f7a]">Add Passage</h2>
          <p className="text-xs text-[#7e95ab]">
            Create a shared text or image block that can be linked to multiple questions without
            affecting question numbering
          </p>
        </div>
      </div>

      {/* ── Critical rule ────────────────────────────────────────────────────── */}
      <CriticalPassageRuleCard />

      {/* ── Two-column layout: form left, sidebar right ──────────────────────── */}
      <div className="grid gap-3 lg:grid-cols-[1fr_280px]">
        {/* Left column */}
        <div className="space-y-3">
          <BasicPassageInformationSection
            data={{
              passageId: form.passageId,
              passageTitle: form.passageTitle,
              passageContent: form.passageContent,
              status: form.status,
            }}
            onChange={(field, value) => updateField(field as keyof FormState, value)}
          />

          <LinkedQuestionRangeSection
            startOrder={form.startOrder}
            endOrder={form.endOrder}
            onChange={(field, value) => updateField(field, value)}
          />

          <LinkQuestionsSection linkedIds={linkedIds} onToggle={toggleLinked} />
        </div>

        {/* Right column */}
        <div className="space-y-3">
          <AppPreviewCard linkedCount={linkedIds.size} />
          <PassageRelationshipSummary
            linkedCount={linkedIds.size}
            startOrder={form.startOrder}
            endOrder={form.endOrder}
          />
        </div>
      </div>

      {/* ── Bottom action bar ────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-[#dce7f2] bg-white px-4 py-3">
        <button
          type="button"
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 text-xs font-medium text-[#587189] hover:bg-[#f0f6fc]"
        >
          <FileEdit className="h-3.5 w-3.5" />
          Save Draft
        </button>
        <button
          type="button"
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 text-xs font-medium text-[#587189] hover:bg-[#f0f6fc]"
        >
          <Eye className="h-3.5 w-3.5" />
          Preview
        </button>
        <button
          type="button"
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 text-xs font-medium text-[#587189] hover:bg-[#f0f6fc]"
        >
          <Copy className="h-3.5 w-3.5" />
          Duplicate Passage
        </button>

        <div className="flex-1" />

        <Link
          href="/questions/passages"
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 text-xs font-medium text-[#587189] hover:bg-[#f0f6fc]"
        >
          <X className="h-3.5 w-3.5" />
          Cancel
        </Link>
        <button
          type="button"
          className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#2f86d8] px-4 text-xs font-medium text-white hover:bg-[#2a78c6]"
        >
          Publish Passage
        </button>
      </div>
    </div>
  );
}
