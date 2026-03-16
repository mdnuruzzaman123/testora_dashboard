import { questionOrderRows } from "@/lib/test-archive-data";
import { GripVertical, ChevronUp, ChevronDown } from "lucide-react";

export default function QuestionOrderConfigurationSection() {
  return (
    <section className="rounded-lg border border-[#dce7f2] bg-white p-4">
      <h3 className="text-sm font-semibold text-[#3f5f7a]">Question Order Configuration</h3>
      <p className="mb-3 text-xs text-[#90a3b6]">Define the exact sequence for this test</p>

      <div className="mb-3 rounded-md border border-[#f0dfb9] bg-[#fff8ea] p-3 text-xs text-[#b88424]">
        <p>• Passage does not take a question number</p>
        <p>• If questions 6-10 belong to a passage, the next question is 11</p>
        <p>• Question Order represents the real position inside the test</p>
      </div>

      <div className="space-y-2">
        {questionOrderRows.map((row) => (
          <div key={row.id} className="flex items-center gap-2 rounded-md border border-[#dce7f2] bg-[#f8fbff] px-2.5 py-2">
            <GripVertical className="h-3.5 w-3.5 text-[#9ab0c3]" />
            <span className="w-6 text-center text-xs font-semibold text-[#2f86d8]">{row.order}</span>
            <span className="w-14 text-xs text-[#90a3b6]">{row.id}</span>
            <p className="flex-1 text-xs text-[#4f6d87]">{row.title}</p>
            {row.tag ? (
              <span className="rounded-sm border border-[#e4ddf4] bg-[#f1edfb] px-2 py-0.5 text-[10px] text-[#8468c4]">{row.tag}</span>
            ) : (
              <span className="text-[10px] text-[#c0cede]">—</span>
            )}
            <button type="button" className="rounded p-1 text-[#7f95aa] hover:bg-[#f3f7fb]"><ChevronUp className="h-3 w-3" /></button>
            <button type="button" className="rounded p-1 text-[#7f95aa] hover:bg-[#f3f7fb]"><ChevronDown className="h-3 w-3" /></button>
          </div>
        ))}
      </div>
    </section>
  );
}
