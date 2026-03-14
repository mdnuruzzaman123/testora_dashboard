import { CheckCircle2 } from "lucide-react";

const checks = [
  "Category selected",
  "Year selected",
  "Subject or Faculty selected",
  "At least 2 answer options provided",
  "Exactly 1 correct answer marked",
  "Valid question order assigned",
  "Valid passage connection (if used)",
  "No duplicate question text detected",
  "All validations passed",
];

export default function PreviewValidationPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
      <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-blue-600 uppercase">
            Final Check
          </p>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">App Preview</h2>
          <p className="text-xs text-slate-500">See how this question appears on the student app</p>
        </div>

        <div className="grid place-items-center rounded-xl border border-slate-200 bg-slate-50 py-6">
          <div className="w-70 rounded-[30px] border-[6px] border-slate-800 bg-white p-3 shadow-xl">
            <div className="mb-2 h-4 w-20 rounded-full bg-slate-800" />
            <div className="mb-2 rounded-md bg-blue-100 p-2 text-[10px] text-blue-700">
              Passage 1 (5-10 questions)
            </div>
            <div className="h-28 rounded-md bg-slate-100" />
            <div className="mt-3 space-y-1.5">
              <div className="h-6 rounded bg-slate-100" />
              <div className="h-6 rounded bg-blue-100" />
              <div className="h-6 rounded bg-slate-100" />
              <div className="h-6 rounded bg-slate-100" />
            </div>
            <button className="mt-3 w-full rounded-md bg-blue-600 py-2 text-[11px] font-semibold text-white">
              Next Question
            </button>
          </div>
        </div>
      </section>

      <div className="space-y-3">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">Publishing Validation</h3>
          <p className="mt-1 text-xs text-slate-500">
            All checks must pass before a question can be published
          </p>

          <div className="mt-3 space-y-2">
            {checks.map((item, idx) => (
              <div
                key={item}
                className="flex items-start gap-2 rounded-md border border-blue-100 bg-blue-50 px-3 py-2 text-xs text-blue-700"
              >
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <div>
                  <p>{item}</p>
                  {idx === checks.length - 1 && (
                    <p className="text-[10px] text-blue-500">This question is ready to publish</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button className="mt-3 w-full rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700">
            Publish Question
          </button>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Audit History</h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Created by</span>
              <span className="font-medium text-slate-700">Admin (admin@testora.com)</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Date created</span>
              <span className="text-slate-700">Mar 5, 2026 at 14:32</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Last modified by</span>
              <span className="font-medium text-slate-700">Admin (admin@testora.com)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Last modification</span>
              <span className="text-slate-700">Mar 8, 2026 at 09:15</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
