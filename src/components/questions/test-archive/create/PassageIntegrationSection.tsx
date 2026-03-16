import { passageIntegrationRows } from "@/lib/test-archive-data";
import { Link2 } from "lucide-react";

export default function PassageIntegrationSection() {
  return (
    <section className="rounded-lg border border-[#dce7f2] bg-white p-4">
      <h3 className="text-sm font-semibold text-[#3f5f7a]">Passage Integration</h3>
      <p className="mb-3 text-xs text-[#90a3b6]">Link passages to question groups — passages are managed in the Passage System</p>

      <div className="mb-3 rounded-md border border-[#f0dfb9] bg-[#fff8ea] p-3 text-xs text-[#b88424]">
        <p>• A passage is not a counted question</p>
        <p>• Passage content is linked to multiple questions</p>
        <p>• Passage must not break numbering</p>
      </div>

      <div className="space-y-3">
        {passageIntegrationRows.map((row) => (
          <article key={row.id} className="rounded-md border border-[#dce7f2] bg-[#f8fbff] p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold text-[#4f6d87]">{row.id}</p>
                <p className="text-xs text-[#7e95ab]">{row.title}</p>
              </div>
              <span className="rounded-sm border border-[#d6e5f4] bg-[#eaf2fb] px-2 py-0.5 text-[10px] text-[#4d93d9]">Questions {row.range}</span>
            </div>

            <div className="grid gap-2 md:grid-cols-3">
              <div className="rounded-md border border-[#dce7f2] bg-white px-2.5 py-2">
                <p className="text-[10px] text-[#90a3b6]">Linked Question Range</p>
                <p className="text-xs font-medium text-[#4f6d87]">{row.range}</p>
              </div>
              <div className="rounded-md border border-[#dce7f2] bg-white px-2.5 py-2">
                <p className="text-[10px] text-[#90a3b6]">Total Questions</p>
                <p className="text-xs font-medium text-[#4f6d87]">{row.totalQuestions}</p>
              </div>
              <div className="rounded-md border border-[#dce7f2] bg-white px-2.5 py-2">
                <p className="text-[10px] text-[#90a3b6]">Action</p>
                <button type="button" className="inline-flex items-center gap-1 text-xs font-medium text-[#2f86d8]"><Link2 className="h-3 w-3" /> Open Text</button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
