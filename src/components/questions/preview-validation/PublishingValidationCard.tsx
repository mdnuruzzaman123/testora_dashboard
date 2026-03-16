import { publishingChecklist, type ChecklistStatus } from "@/lib/preview-validation-data";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

function StatusIcon({ status }: { status: ChecklistStatus }) {
  if (status === "pass") return <CheckCircle2 className="h-4 w-4 shrink-0 text-[#3ea666]" />;
  if (status === "warn") return <AlertTriangle className="h-4 w-4 shrink-0 text-[#c48a2e]" />;
  return <XCircle className="h-4 w-4 shrink-0 text-[#db6f6f]" />;
}

function rowClass(status: ChecklistStatus) {
  if (status === "pass") return "border-[#dce7f2] bg-white";
  if (status === "warn") return "border-[#f0dfb9] bg-[#fffbea]";
  return "border-[#f4d7d7] bg-[#fdf5f5]";
}

function labelClass(status: ChecklistStatus) {
  if (status === "pass") return "text-[#3f5f7a]";
  if (status === "warn") return "text-[#8a6120]";
  return "text-[#b04040]";
}

const passCount = publishingChecklist.filter((c) => c.status === "pass").length;
const allPassed = passCount === publishingChecklist.length;

export default function PublishingValidationCard() {
  return (
    <div className="rounded-lg border border-[#dce7f2] bg-white p-4">
      <div className="mb-1 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-[#3f5f7a]">Publishing Validation</h3>
          <p className="text-xs text-[#90a3b6]">All checks must pass before publishing</p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
            allPassed
              ? "border-[#d0ecd9] bg-[#e9f8ef] text-[#3ea666]"
              : "border-[#f0dfb9] bg-[#fff3da] text-[#c48a2e]"
          )}
        >
          {passCount}/{publishingChecklist.length} Passed
        </span>
      </div>

      <div className="mt-3 space-y-2">
        {publishingChecklist.map((item, i) => (
          <div
            key={i}
            className={cn(
              "flex items-start gap-2.5 rounded-md border p-2.5",
              rowClass(item.status)
            )}
          >
            <StatusIcon status={item.status} />
            <div>
              <p className={cn("text-xs font-medium", labelClass(item.status))}>{item.label}</p>
              {item.detail && <p className="mt-0.5 text-[10px] text-[#90a3b6]">{item.detail}</p>}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded-md bg-[#2f86d8] py-2 text-xs font-semibold text-white hover:bg-[#2a78c6]"
      >
        Publish Question
      </button>
    </div>
  );
}
