import Link from "next/link";
import { Plus, CheckCircle2, XCircle, Eye, Pencil, Trash2, Search } from "lucide-react";

const passageRows = [
  {
    id: "PSG-01",
    code: "PSG-01",
    title: "Albanian Literature Excerpt",
    range: "Q1-Q10",
    questions: 10,
    status: "Published",
  },
  {
    id: "PSG-02",
    code: "PSG-02",
    title: "English Reading Comprehension",
    range: "Q21-Q30",
    questions: 10,
    status: "Published",
  },
  {
    id: "PSG-03",
    code: "PSG-03",
    title: "Biology Lab Observation",
    range: "Q11-Q15",
    questions: 5,
    status: "Draft",
  },
  {
    id: "PSG-04",
    code: "PSG-04",
    title: "Physics Problem Diagram",
    range: "Q31-Q35",
    questions: 5,
    status: "Published",
  },
];

function statusPill(status: string) {
  if (status === "Published") return "bg-emerald-100 text-emerald-700";
  if (status === "Draft") return "bg-amber-100 text-amber-700";
  return "bg-slate-200 text-slate-600";
}

export default function PassagesPage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-blue-600 uppercase">
            Shared Content Blocks
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Passage System</h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage shared text blocks linked to multiple questions
          </p>
        </div>
        <Link
          href="/questions/passages/add"
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Passage
        </Link>
      </div>

      <div className="rounded-xl border border-amber-200 bg-linear-to-r from-amber-50 to-orange-50 p-3 text-xs text-amber-700">
        <p className="font-semibold">Critical Rule: A passage is NOT a question</p>
        <p className="mt-1">
          A passage does not take a question number. It is a shared content block displayed before
          linked questions. Question numbering continues normally.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="mb-2 flex items-center gap-2 text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            <p className="text-sm font-semibold">Correct Implementation</p>
          </div>
          <ul className="space-y-1 text-xs text-emerald-700">
            <li>- Passage 1 (shared content block)</li>
            <li>- Question 1 (linked to Passage 1)</li>
            <li>- Question 2 (linked to Passage 1)</li>
            <li>- Question 3 (linked to Passage 1)</li>
            <li>- Next question after passage: Q11</li>
          </ul>
        </div>

        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
          <div className="mb-2 flex items-center gap-2 text-rose-700">
            <XCircle className="h-4 w-4" />
            <p className="text-sm font-semibold">Wrong Implementation</p>
          </div>
          <ul className="space-y-1 text-xs text-rose-700">
            <li>- Passage treated as Question 1 (wrong)</li>
            <li>- First real question becomes Q2 (wrong)</li>
            <li>- Numbering is shifted and inconsistent</li>
          </ul>
        </div>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">Passage Entity Fields</h3>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {[
            ["Passage ID", "Unique identifier"],
            ["Passage Content", "Text body / HTML"],
            ["Passage Image", "Optional image"],
            ["Linked Question Range", "Q1-Q10"],
            ["Status", "Draft / Published"],
          ].map(([label, hint]) => (
            <div key={label} className="rounded-md border border-slate-200 bg-slate-50 p-3">
              <p className="text-[11px] font-semibold text-slate-700">{label}</p>
              <p className="mt-1 text-[11px] text-slate-500">{hint}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-2 text-sm font-semibold text-slate-900">App Preview - Passage Display</h3>
        <div className="grid place-items-center rounded-lg border border-slate-200 bg-slate-50 py-8">
          <div className="w-65 rounded-[28px] border-[6px] border-slate-800 bg-white p-3 shadow-xl">
            <div className="mb-2 h-4 w-20 rounded-full bg-slate-800" />
            <div className="mb-2 rounded-md bg-blue-100 p-2 text-[10px] text-blue-700">
              Passage 1 (5-10 questions)
            </div>
            <div className="h-24 rounded-md bg-slate-100" />
            <div className="mt-3 space-y-1.5">
              <div className="h-6 rounded bg-slate-100" />
              <div className="h-6 rounded bg-blue-100" />
              <div className="h-6 rounded bg-slate-100" />
              <div className="h-6 rounded bg-slate-100" />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-2 text-sm font-semibold text-slate-900">Question Order Logic</h3>
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
          <div className="mb-2 flex flex-wrap gap-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className={`rounded-md px-2 py-1 text-[11px] font-semibold ${
                  i < 10 ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"
                }`}
              >
                Q{i + 1}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            Passage links questions Q1-Q10. Next standalone question is Q11.
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2">
          <Search className="h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search passages..."
            className="w-full text-xs text-slate-700 focus:outline-none"
          />
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-240 text-xs">
            <thead className="bg-slate-100/90 text-slate-500">
              <tr className="text-left">
                <th className="px-3 py-2">Passage ID</th>
                <th className="px-3 py-2">Code</th>
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Linked Range</th>
                <th className="px-3 py-2">Questions</th>
                <th className="px-3 py-2">Image</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {passageRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-slate-100 transition hover:bg-blue-50/30"
                >
                  <td className="px-3 py-2 font-semibold text-blue-700">{row.id}</td>
                  <td className="px-3 py-2 text-slate-700">{row.code}</td>
                  <td className="px-3 py-2 text-slate-700">{row.title}</td>
                  <td className="px-3 py-2 text-blue-700">{row.range}</td>
                  <td className="px-3 py-2 text-slate-700">{row.questions}</td>
                  <td className="px-3 py-2 text-slate-500">-</td>
                  <td className="px-3 py-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusPill(row.status)}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1 text-slate-400">
                      <button className="rounded p-1 hover:bg-slate-100">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button className="rounded p-1 hover:bg-slate-100">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button className="rounded p-1 hover:bg-slate-100">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
