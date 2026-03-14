import { CirclePlus, Download, Eye, Pencil, Trash2, Search, Filter } from "lucide-react";

const questionRows = [
  {
    id: "Q-001",
    category: "Semimatura",
    year: "2025",
    subject: "Mathematics",
    faculty: "-",
    dept: "-",
    type: "Official",
    access: "Free",
    order: "A1",
    passage: "-",
    text: "What is the derivative of x^2?",
    correct: "B",
    status: "Published",
  },
  {
    id: "Q-002",
    category: "Semimatura",
    year: "2025",
    subject: "Mathematics",
    faculty: "-",
    dept: "-",
    type: "Official",
    access: "Free",
    order: "A2",
    passage: "-",
    text: "Solve the equation: 2x + 3 = 11",
    correct: "A",
    status: "Published",
  },
  {
    id: "Q-003",
    category: "Semimatura",
    year: "2025",
    subject: "Albanian",
    faculty: "-",
    dept: "-",
    type: "Official",
    access: "Premium",
    order: "A3",
    passage: "PSG-01",
    text: "Choose the passage intro sentence",
    correct: "C",
    status: "Published",
  },
  {
    id: "Q-004",
    category: "Entrance Exam",
    year: "2024",
    subject: "Medicine",
    faculty: "General Med",
    dept: "-",
    type: "Official",
    access: "Premium",
    order: "A1",
    passage: "-",
    text: "Which organ produces insulin?",
    correct: "D",
    status: "Published",
  },
  {
    id: "Q-005",
    category: "Matura",
    year: "2023",
    subject: "Physics",
    faculty: "-",
    dept: "-",
    type: "Additional",
    access: "Free",
    order: "A5",
    passage: "-",
    text: "Calculate the velocity on an incline",
    correct: "A",
    status: "Draft",
  },
  {
    id: "Q-006",
    category: "Entrance Exam",
    year: "2024",
    subject: "Engineering",
    faculty: "CS",
    dept: "-",
    type: "Official",
    access: "Free",
    order: "A6",
    passage: "-",
    text: "What is the binary equivalent?",
    correct: "B",
    status: "Published",
  },
  {
    id: "Q-007",
    category: "Semimatura",
    year: "2024",
    subject: "English",
    faculty: "-",
    dept: "-",
    type: "Official",
    access: "Free",
    order: "A8",
    passage: "PSG-02",
    text: "According to the text, what is...",
    correct: "C",
    status: "Hidden",
  },
  {
    id: "Q-008",
    category: "Matura",
    year: "2023",
    subject: "Chemistry",
    faculty: "-",
    dept: "-",
    type: "Official",
    access: "Premium",
    order: "A12",
    passage: "-",
    text: "What is the molecular formula?",
    correct: "A",
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

export default function QuestionBankPage() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-blue-600 uppercase">
            Question Section
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Question Bank</h2>
          <p className="mt-1 text-sm text-slate-500">
            Manage all questions in one centralized database
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50">
            <Download className="h-3.5 w-3.5" />
            Import
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700">
            <CirclePlus className="h-3.5 w-3.5" />
            Add Question
          </button>
        </div>
      </div>

      <div className="mb-4 space-y-2 rounded-xl border border-slate-200 bg-slate-50/75 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-70 flex-1">
            <Search className="pointer-events-none absolute top-2.5 left-3 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions by ID or text..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pr-3 pl-8 text-xs focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            />
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 hover:bg-slate-100">
            <Filter className="h-3.5 w-3.5" />
            Filters
          </button>
          <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 hover:bg-slate-100">
            Bulk Actions
          </button>
        </div>

        <div className="flex flex-wrap gap-2 text-[11px]">
          <button className="rounded-md bg-blue-100 px-2 py-1 font-medium text-blue-700">
            All
          </button>
          <button className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100">
            Published
          </button>
          <button className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100">Draft</button>
          <button className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100">Hidden</button>
          <button className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100">
            Archived
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-325 text-xs">
          <thead className="bg-slate-100/90 text-slate-500">
            <tr className="text-left">
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Year</th>
              <th className="px-3 py-2">Subject</th>
              <th className="px-3 py-2">Faculty</th>
              <th className="px-3 py-2">Dept</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Access</th>
              <th className="px-3 py-2">Order</th>
              <th className="px-3 py-2">Passage</th>
              <th className="px-3 py-2">Question Text</th>
              <th className="px-3 py-2">Correct</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {questionRows.map((row) => (
              <tr key={row.id} className="border-t border-slate-100 transition hover:bg-blue-50/30">
                <td className="px-3 py-2 font-semibold text-blue-700">{row.id}</td>
                <td className="px-3 py-2 text-slate-700">{row.category}</td>
                <td className="px-3 py-2 text-slate-500">{row.year}</td>
                <td className="px-3 py-2 text-slate-700">{row.subject}</td>
                <td className="px-3 py-2 text-slate-500">{row.faculty}</td>
                <td className="px-3 py-2 text-slate-500">{row.dept}</td>
                <td className="px-3 py-2 text-slate-700">{row.type}</td>
                <td className="px-3 py-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${accessPill(row.access)}`}
                  >
                    {row.access}
                  </span>
                </td>
                <td className="px-3 py-2 text-slate-700">{row.order}</td>
                <td className="px-3 py-2 text-violet-700">{row.passage}</td>
                <td className="max-w-55 truncate px-3 py-2 text-slate-700">{row.text}</td>
                <td className="px-3 py-2 font-semibold text-emerald-700">{row.correct}</td>
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
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <p>Showing 8 of 8 questions</p>
        <div className="flex items-center gap-1">
          <button className="h-6 w-6 rounded-md bg-slate-900 text-white">1</button>
          <button className="h-6 w-6 rounded hover:bg-slate-100">2</button>
          <button className="h-6 w-6 rounded hover:bg-slate-100">3</button>
        </div>
      </div>
    </div>
  );
}
