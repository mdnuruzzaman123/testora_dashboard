import { validationIssues, validationSummary } from "@/lib/import-data";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

export default function ValidationSummarySection() {
  const { total, valid, warnings, errors } = validationSummary;

  return (
    <section className="space-y-3">
      {/* Step badge + title */}
      <div className="flex items-center gap-2">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#2f86d8] text-[10px] font-bold text-white">
          3
        </span>
        <h3 className="text-sm font-semibold text-[#3f5f7a]">Validation Summary</h3>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-[#dce7f2] bg-white p-3">
          <p className="text-[10px] font-semibold tracking-wide text-[#90a3b6] uppercase">
            Total Rows
          </p>
          <p className="mt-1 text-2xl font-bold text-[#3f5f7a]">{total}</p>
        </div>
        <div className="rounded-lg border border-[#d0ecd9] bg-[#f0fbf5] p-3">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#3ea666]" />
            <p className="text-[10px] font-semibold tracking-wide text-[#3ea666] uppercase">
              Valid
            </p>
          </div>
          <p className="mt-1 text-2xl font-bold text-[#2d7a52]">{valid}</p>
        </div>
        <div className="rounded-lg border border-[#f0dfb9] bg-[#fffbea] p-3">
          <div className="flex items-center gap-1">
            <AlertTriangle className="h-3.5 w-3.5 text-[#c48a2e]" />
            <p className="text-[10px] font-semibold tracking-wide text-[#c48a2e] uppercase">
              Warnings
            </p>
          </div>
          <p className="mt-1 text-2xl font-bold text-[#9a6820]">{warnings}</p>
        </div>
        <div className="rounded-lg border border-[#f4d7d7] bg-[#fdeeee] p-3">
          <div className="flex items-center gap-1">
            <XCircle className="h-3.5 w-3.5 text-[#db6f6f]" />
            <p className="text-[10px] font-semibold tracking-wide text-[#db6f6f] uppercase">
              Errors
            </p>
          </div>
          <p className="mt-1 text-2xl font-bold text-[#b04040]">{errors}</p>
        </div>
      </div>

      {/* Issue list */}
      {validationIssues.length > 0 && (
        <div className="rounded-lg border border-[#dce7f2] bg-white p-4">
          <h4 className="mb-3 text-xs font-semibold text-[#3f5f7a]">
            Issues Detected ({validationIssues.length})
          </h4>
          <div className="space-y-2">
            {validationIssues.map((issue, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-start gap-2.5 rounded-md border p-2.5 text-xs",
                  issue.severity === "error"
                    ? "border-[#f4d7d7] bg-[#fdf5f5]"
                    : "border-[#f0dfb9] bg-[#fffbea]"
                )}
              >
                {issue.severity === "error" ? (
                  <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#db6f6f]" />
                ) : (
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c48a2e]" />
                )}
                <div className="min-w-0 flex-1">
                  <span
                    className={cn(
                      "font-semibold",
                      issue.severity === "error" ? "text-[#b04040]" : "text-[#8a6120]"
                    )}
                  >
                    Row {issue.row} · {issue.field}
                  </span>
                  <span
                    className={cn(
                      "ml-1.5",
                      issue.severity === "error" ? "text-[#c05050]" : "text-[#9a6820]"
                    )}
                  >
                    — {issue.message}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
