import { Info } from "lucide-react";

type Props = {
  linkedCount: number;
  startOrder: string;
  endOrder: string;
};

const summaryBullets = [
  "One passage can be linked to many questions — it is a one-to-many relationship.",
  "The passage is stored once, not duplicated per question.",
  "Questions remain stored in the Question Bank — the passage only references them.",
  "The passage is a shared content block, not a question.",
];

export default function PassageRelationshipSummary({ linkedCount, startOrder, endOrder }: Props) {
  const rangeTxt =
    startOrder && endOrder && !isNaN(+startOrder) && !isNaN(+endOrder)
      ? `Q${startOrder}–Q${endOrder}`
      : "—";

  return (
    <div className="rounded-lg border border-[#dce7f2] bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <Info className="h-4 w-4 text-[#c48a2e]" />
        <h3 className="text-sm font-semibold text-[#3f5f7a]">Passage Relationship Summary</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-md border border-[#dce7f2] bg-[#f8fbff] p-2.5">
          <p className="text-[10px] font-medium tracking-wide text-[#90a3b6] uppercase">
            Passage ID
          </p>
          <p className="mt-1 text-lg font-bold text-[#3f5f7a]">—</p>
        </div>
        <div className="rounded-md border border-[#dce7f2] bg-[#f8fbff] p-2.5">
          <p className="text-[10px] font-medium tracking-wide text-[#90a3b6] uppercase">
            Linked Questions
          </p>
          <p className="mt-1 text-lg font-bold text-[#3f5f7a]">{linkedCount}</p>
        </div>
        <div className="rounded-md border border-[#dce7f2] bg-[#f8fbff] p-2.5">
          <p className="text-[10px] font-medium tracking-wide text-[#90a3b6] uppercase">
            Question Range
          </p>
          <p className="mt-1 text-sm font-semibold text-[#3f5f7a]">{rangeTxt}</p>
        </div>
        <div className="rounded-md border border-[#dce7f2] bg-[#f8fbff] p-2.5">
          <p className="text-[10px] font-medium tracking-wide text-[#90a3b6] uppercase">
            Linked Tests
          </p>
          <p className="mt-1 text-lg font-bold text-[#3f5f7a]">1</p>
        </div>
      </div>

      <div className="mt-3 rounded-md border border-[#dce7f2] bg-[#f8fbff] p-2.5">
        <p className="text-[10px] font-medium tracking-wide text-[#90a3b6] uppercase">Category</p>
        <p className="mt-1 text-sm font-semibold text-[#3f5f7a]">Semester 2025</p>
      </div>

      <div className="mt-3 rounded-md border border-[#c8ddf2] bg-[#eaf4fd] p-2.5">
        <ul className="space-y-1">
          {summaryBullets.map((b) => (
            <li key={b} className="flex items-start gap-1.5 text-[10px] text-[#4a7eb8]">
              <span className="mt-0.5">•</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
