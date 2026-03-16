import { AlertTriangle, Info } from "lucide-react";

const rules = [
  "A passage is NOT a counted question — it does not become Q1, Q2, or any other question number.",
  "If a passage is linked to Q1–Q10, the next real question after the passage block is Q11.",
  "Passage content appears before its linked questions in the app — it is a shared content block.",
  "Passage must be linked to questions from the Question Bank — questions are not duplicated inside the passage.",
  "Passage content is stored separately and linked to questions. One passage, many questions.",
];

export default function CriticalPassageRuleCard() {
  return (
    <section className="rounded-lg border border-[#c8ddf2] bg-[#eaf4fd] p-4">
      <div className="mb-2.5 flex items-center gap-2">
        <AlertTriangle className="h-4 w-4 text-[#c48a2e]" />
        <h3 className="text-sm font-semibold text-[#3a5f7e]">Critical Passage Rule</h3>
      </div>
      <ul className="space-y-1.5">
        {rules.map((rule) => (
          <li key={rule} className="flex items-start gap-2 text-xs text-[#4a7eb8]">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#4a93d9]" />
            {rule}
          </li>
        ))}
      </ul>
    </section>
  );
}
