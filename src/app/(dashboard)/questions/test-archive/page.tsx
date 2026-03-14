import { Plus, Search, Filter, Eye, Pencil, Trash2, Copy, Layers3 } from "lucide-react";

const testRows = [
  {
    id: "T-001",
    title: "Semi-Matura 2025 - Mathematics",
    category: "Semimatura",
    year: "2025",
    subject: "Mathematics",
    type: "Official",
    access: "Free",
    questions: 100,
    status: "Published",
  },
  {
    id: "T-002",
    title: "Matura 2024 - Medicine",
    category: "Entrance",
    year: "2024",
    subject: "Biology",
    type: "Official",
    access: "Premium",
    questions: 120,
    status: "Published",
  },
  {
    id: "T-003",
    title: "Entrance Exam 2024 - Medicine",
    category: "Entrance",
    year: "2024",
    subject: "Medicine",
    type: "Official",
    access: "Premium",
    questions: 80,
    status: "Draft",
  },
  {
    id: "T-004",
    title: "Matura 2023 - Physics",
    category: "Matura",
    year: "2023",
    subject: "Physics",
    type: "Additional",
    access: "Free",
    questions: 90,
    status: "Published",
  },
  {
    id: "T-005",
    title: "Entrance Exam 2024 - Engineering",
    category: "Entrance",
    year: "2024",
    subject: "Engineering",
    type: "Official",
    access: "Premium",
    questions: 60,
    status: "Published",
  },
  {
    id: "T-006",
    title: "Semi-Matura 2024 - English",
    category: "Semimatura",
    year: "2024",
    subject: "English",
    type: "Official",
    access: "Free",
    questions: 100,
    status: "Published",
  },
];

function statusPill(status: string) {
  if (status === "Published") return "bg-emerald-100 text-emerald-700";
  if (status === "Draft") return "bg-amber-100 text-amber-700";
  return "bg-slate-200 text-slate-600";
}

function accessPill(access: string) {
  return access === "Premium" ? "bg-violet-100 text-violet-700" : "bg-blue-100 text-blue-700";
}

export default function TestArchivePage() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-blue-600 uppercase">
            Test Structure
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Test Archive</h2>
          <p className="mt-1 text-sm text-slate-500">
            Define test structure - tests link to questions from the Question Bank
          </p>
        </div>

        <button className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700">
          <Plus className="h-3.5 w-3.5" />
          Create Test
        </button>
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50 p-3 text-xs text-blue-700">
        <p className="font-semibold">How Test Archive works</p>
        <p className="mt-1">
          In each archived test, the system stores an ordered list of question IDs linked from the
          Question Bank. One question can appear in different tests, and updates are reflected in
          all linked structures.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="relative min-w-70 flex-1">
            <Search className="pointer-events-none absolute top-2.5 left-3 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search tests..."
              className="w-full rounded-lg border border-slate-200 py-2 pr-3 pl-8 text-xs focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            />
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600 hover:bg-slate-50">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-260 text-xs">
            <thead className="bg-slate-100/90 text-slate-500">
              <tr className="text-left">
                <th className="px-3 py-2">ID</th>
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Category</th>
                <th className="px-3 py-2">Year</th>
                <th className="px-3 py-2">Subject</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Access</th>
                <th className="px-3 py-2">Questions</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-slate-100 transition hover:bg-blue-50/30"
                >
                  <td className="px-3 py-2 font-semibold text-blue-700">{row.id}</td>
                  <td className="px-3 py-2 text-slate-700">{row.title}</td>
                  <td className="px-3 py-2 text-slate-700">{row.category}</td>
                  <td className="px-3 py-2 text-slate-500">{row.year}</td>
                  <td className="px-3 py-2 text-slate-700">{row.subject}</td>
                  <td className="px-3 py-2 text-slate-700">{row.type}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${accessPill(row.access)}`}
                    >
                      {row.access}
                    </span>
                  </td>
                  <td className="px-3 py-2 font-semibold text-slate-700">{row.questions}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusPill(row.status)}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1 text-slate-400">
                      <button className="rounded-md p-1 hover:bg-slate-100">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button className="rounded-md p-1 hover:bg-slate-100">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button className="rounded-md p-1 hover:bg-slate-100">
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <button className="rounded-md p-1 hover:bg-slate-100">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">Copy &amp; Duplicate Tools</h3>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="mb-2 inline-flex rounded-md bg-blue-100 p-2 text-blue-700">
              <Copy className="h-4 w-4" />
            </div>
            <p className="text-xs font-semibold text-slate-800">
              Copy Questions from Previous Year
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Keep test structure and reuse old test patterns.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="mb-2 inline-flex rounded-md bg-violet-100 p-2 text-violet-700">
              <Layers3 className="h-4 w-4" />
            </div>
            <p className="text-xs font-semibold text-slate-800">Copy Passage Group</p>
            <p className="mt-1 text-xs text-slate-500">
              Clone passage blocks with all linked questions.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="mb-2 inline-flex rounded-md bg-emerald-100 p-2 text-emerald-700">
              <Copy className="h-4 w-4" />
            </div>
            <p className="text-xs font-semibold text-slate-800">Duplicate Entire Test</p>
            <p className="mt-1 text-xs text-slate-500">
              Create test variations with all question links preserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
