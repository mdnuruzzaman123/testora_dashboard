import { Smartphone } from "lucide-react";

type Props = {
  linkedCount: number;
};

export default function AppPreviewCard({ linkedCount }: Props) {
  const count = linkedCount > 0 ? linkedCount : 10;

  return (
    <div className="rounded-lg border border-[#dce7f2] bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <Smartphone className="h-4 w-4 text-[#4a93d9]" />
        <h3 className="text-sm font-semibold text-[#3f5f7a]">App Preview — Passage Display</h3>
      </div>

      <div className="flex justify-center">
        <div className="w-60 overflow-hidden rounded-3xl border-2 border-[#2a2a2a] bg-[#1a1a2e]">
          {/* Status bar */}
          <div className="flex items-center justify-between bg-[#1a1a2e] px-4 py-1.5">
            <span className="text-[9px] text-white">09:41</span>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-3 rounded-sm bg-white/60" />
              <div className="h-1.5 w-1.5 rounded-sm bg-white/60" />
              <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
            </div>
          </div>

          <div className="bg-white px-3 pb-3">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#e8eef4] py-2">
              <span className="text-[9px] font-semibold text-[#3f5f7a]">
                Semi-Matura 2022 · Simulation
              </span>
              <span className="rounded-full bg-[#fff3da] px-1.5 py-0.5 text-[7px] font-medium text-[#c48a2e]">
                PREMIUM
              </span>
            </div>

            <p className="mt-1.5 text-[8px] font-semibold text-[#3f5f7a]">Albanian Language</p>

            {/* Passage banner */}
            <div className="mt-2 flex items-center justify-between rounded bg-[#edf4fb] px-2 py-1">
              <span className="max-w-[100px] truncate text-[7.5px] font-medium text-[#2f86d8]">
                Passage 1 ({count}–{count * 2} questions)
              </span>
              <span className="rounded bg-[#2f86d8] px-1.5 py-0.5 text-[7px] font-medium text-white">
                Open Text
              </span>
            </div>

            {/* Image placeholder */}
            <div className="mt-2 flex h-14 items-center justify-center rounded bg-[#f3f7fb]">
              <div className="text-center">
                <div className="mx-auto mb-1 h-5 w-7 rounded bg-[#dce7f2]" />
                <div className="h-1 w-10 rounded bg-[#dce7f2]" />
              </div>
            </div>

            {/* Question */}
            <p className="mt-2 text-[7px] leading-relaxed text-[#4a6070]">
              1. A block of mass mmm is placed on a rough inclined plane making an angle with the
              horizontal...
            </p>

            {/* Options */}
            {["a·g(sinθ–μkcosθ)", "a·g(sinθ+μkcosθ)", "a·g(cosθ–μksinθ)", "a·g(μkcosθ–sinθ)"].map(
              (opt, i) => (
                <div
                  key={opt}
                  className={`mt-1 flex items-center gap-1.5 rounded px-1.5 py-1 text-[7px] ${
                    i === 1 ? "bg-[#d6eaf6] text-[#2f86d8]" : "bg-[#f8fbff] text-[#4a6070]"
                  }`}
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-current" />
                  {opt}
                </div>
              )
            )}

            <button className="mt-2 w-full rounded bg-[#2f86d8] py-1.5 text-[8px] font-medium text-white">
              Next Question →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
