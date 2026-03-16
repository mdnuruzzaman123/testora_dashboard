"use client";

import { Info, Upload, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import FieldMappingSection from "./FieldMappingSection";
import UploadFileSection from "./UploadFileSection";
import ValidationSummarySection from "./ValidationSummarySection";

export default function ImportQuestionsPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="space-y-3">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <section className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-[#3f5f7a]">Import Questions</h2>
          <p className="text-sm text-[#7e95ab]">
            Import questions from Excel or CSV files into the centralized Question Bank
          </p>
        </div>
      </section>

      {/* ── Upload ──────────────────────────────────────────────────────────── */}
      <UploadFileSection selectedFile={selectedFile} onFileSelect={setSelectedFile} />

      {/* ── Field mapping ───────────────────────────────────────────────────── */}
      <FieldMappingSection />

      {/* ── Validation ──────────────────────────────────────────────────────── */}
      <ValidationSummarySection />

      {/* ── Passage ID info banner ───────────────────────────────────────────── */}
      <section className="flex items-start gap-2.5 rounded-lg border border-[#c8ddf2] bg-[#eaf4fd] px-4 py-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#4a93d9]" />
        <div>
          <p className="text-xs font-semibold text-[#3a5f7e]">Passage ID Connection</p>
          <p className="mt-0.5 text-xs text-[#4a7eb8]">
            The{" "}
            <code className="rounded bg-[#d6eaf6] px-1 py-0.5 font-mono text-[10px] text-[#2f86d8]">
              passage_id
            </code>{" "}
            column is optional. When provided, the question will be linked to an existing passage in
            the system. The passage must already exist — this import does <strong>not</strong>{" "}
            create new passage records. Passage-linked questions still carry their own question
            number.
          </p>
        </div>
      </section>

      {/* ── Action bar ──────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-end gap-2 rounded-lg border border-[#dce7f2] bg-white px-4 py-3">
        <Link
          href="/questions/question-bank"
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 text-xs font-medium text-[#587189] hover:bg-[#f0f6fc]"
        >
          <X className="h-3.5 w-3.5" />
          Cancel
        </Link>
        <button
          type="button"
          className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#2f86d8] px-4 text-xs font-medium text-white hover:bg-[#2a78c6] disabled:opacity-50"
          disabled={!selectedFile}
        >
          <Upload className="h-3.5 w-3.5" />
          Import Questions
        </button>
      </div>
    </div>
  );
}
