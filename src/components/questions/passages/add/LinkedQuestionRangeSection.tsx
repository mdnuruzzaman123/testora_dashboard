import { AlertCircle } from "lucide-react";
import { useMemo } from "react";

type Props = {
  startOrder: string;
  endOrder: string;
  onChange: (field: "startOrder" | "endOrder", value: string) => void;
};

export default function LinkedQuestionRangeSection({ startOrder, endOrder, onChange }: Props) {
  const preview = useMemo(() => {
    const s = parseInt(startOrder, 10);
    const e = parseInt(endOrder, 10);
    if (!isNaN(s) && !isNaN(e) && s > 0 && e >= s) {
      const count = e - s + 1;
      return { text: `Q${s}–Q${e} (${count} questions)`, nextQ: `Q${e + 1}` };
    }
    return null;
  }, [startOrder, endOrder]);

  const inputClass =
    "w-full rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 py-2 text-sm text-[#3f5f7a] outline-none placeholder:text-[#9ab0c3] focus:border-[#2f86d8] focus:ring-1 focus:ring-[#2f86d8]/20";

  return (
    <section className="rounded-lg border border-[#dce7f2] bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded bg-[#e4ddf4] text-[10px] font-bold text-[#8468c4]">
          +
        </span>
        <h3 className="text-sm font-semibold text-[#3f5f7a]">Linked Question Range</h3>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-[#587189]">
            Start Question Order <span className="text-[#db6f6f]">*</span>
          </label>
          <input
            type="number"
            min={1}
            value={startOrder}
            onChange={(e) => onChange("startOrder", e.target.value)}
            className={inputClass}
            placeholder="1"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[#587189]">
            End Question Order <span className="text-[#db6f6f]">*</span>
          </label>
          <input
            type="number"
            min={1}
            value={endOrder}
            onChange={(e) => onChange("endOrder", e.target.value)}
            className={inputClass}
            placeholder="10"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[#587189]">
            Linked Range Preview
          </label>
          <div className="flex h-9 items-center rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 text-sm text-[#90a3b6]">
            {preview ? (
              <span className="font-medium text-[#c48a2e]">{preview.text}</span>
            ) : (
              <span>Q1–Q10 (10 questions)</span>
            )}
          </div>
        </div>
      </div>

      {/* Info banner */}
      <div className="mt-3 flex items-start gap-2 rounded-md border border-[#f5d97d] bg-[#fffbea] p-2.5">
        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c48a2e]" />
        <div className="text-xs text-[#8a6120]">
          This range defines which real questions use the passage.{" "}
          <strong>The passage itself does not take a question number.</strong>
          {preview && (
            <>
              {" "}
              If linked range is Q{parseInt(startOrder)}–Q{parseInt(endOrder)}, the next real
              question is{" "}
              <span className="inline-flex items-center rounded-full bg-[#d6eaf6] px-1.5 py-0.5 text-[10px] font-semibold text-[#2f86d8]">
                ✓ {preview.nextQ}
              </span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
