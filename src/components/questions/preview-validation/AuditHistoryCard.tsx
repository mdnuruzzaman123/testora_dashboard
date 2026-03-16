import { auditHistory } from "@/lib/preview-validation-data";
import { Clock } from "lucide-react";

export default function AuditHistoryCard() {
  return (
    <div className="rounded-lg border border-[#dce7f2] bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <Clock className="h-4 w-4 text-[#9ab0c3]" />
        <h3 className="text-sm font-semibold text-[#3f5f7a]">Audit History</h3>
      </div>

      <div className="space-y-3">
        {auditHistory.map((entry, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div className="relative flex flex-col items-center self-stretch">
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#b4cfe8]" />
              {i < auditHistory.length - 1 && <span className="mt-1 w-px flex-1 bg-[#dce7f2]" />}
            </div>
            <div className="pb-3">
              <p className="text-xs font-medium text-[#3f5f7a]">{entry.action}</p>
              <p className="mt-0.5 text-[10px] text-[#90a3b6]">
                {entry.by} · {entry.at}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
