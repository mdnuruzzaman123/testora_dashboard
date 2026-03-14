import { Upload, Filter, Link2, Save, Eye, Copy, X } from "lucide-react";

const linkedQuestions = [
  [
    "Q-001",
    "Identify the main idea of the passage",
    "Albanian Language",
    "Q1",
    "Semester",
    "Public",
    "Published",
  ],
  [
    "Q-002",
    "What is the author's tone in the second paragraph",
    "Albanian Language",
    "Q2",
    "Semester",
    "Public",
    "Published",
  ],
  [
    "Q-003",
    "Which word best replaces 'elaborate' in line 8",
    "Albanian Language",
    "Q5",
    "Semester",
    "Public",
    "Published",
  ],
  [
    "Q-007",
    "Explain the significance of the metaphor used",
    "Albanian Language",
    "Q7",
    "Semester",
    "Public",
    "Published",
  ],
  [
    "Q-008",
    "Which statement best supports the author's claim",
    "Albanian Language",
    "Q8",
    "Semester",
    "Public",
    "Published",
  ],
  [
    "Q-010",
    "What is the purpose of the example given",
    "Albanian Language",
    "Q10",
    "Semester",
    "Public",
    "Published",
  ],
];

export default function AddPassagePage() {
  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.14em] text-blue-600 uppercase">
          Passage Builder
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Add Passage</h2>
        <p className="mt-1 text-sm text-slate-500">
          Create shared text or image blocks that can be linked to multiple questions
        </p>
      </div>

      <section className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm font-semibold text-blue-700">Critical Passage Rule</p>
        <ul className="mt-2 space-y-1 text-xs text-blue-700">
          <li>
            - A passage is NOT counted as a question - it does not become Q1, Q2, or any question
            position.
          </li>
          <li>- If linked range is Q1-Q10, the next real question starts from Q11.</li>
          <li>- Passage content appears before its linked questions in the app UI.</li>
          <li>- Questions remain stored in Question Bank and are linked, not duplicated.</li>
        </ul>
      </section>

      <section className="rounded-xl border border-slate-200">
        <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800">
          Basic Passage Information
        </div>
        <div className="space-y-4 p-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Passage ID *
              </label>
              <input
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs"
                placeholder="PASS-006"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Passage Title *
              </label>
              <input
                className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs"
                placeholder="Reading Passage - Albanian Language"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Passage Content *
            </label>
            <textarea
              rows={4}
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs"
              placeholder="Enter the shared passage content shown before linked questions..."
            />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center">
              <Upload className="mx-auto h-5 w-5 text-slate-400" />
              <p className="mt-2 text-xs text-slate-600">Click to upload or drag and drop</p>
              <button className="mt-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600">
                Browse Files
              </button>
            </div>
            <div className="space-y-2">
              {[
                ["Draft", true],
                ["Published", false],
                ["Hidden", false],
                ["Archived", false],
              ].map(([label, checked]) => (
                <label
                  key={label}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs"
                >
                  <input type="radio" name="status" defaultChecked={Boolean(checked)} />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 p-4">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">Linked Question Range</h3>
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Start Question Order *
            </label>
            <input
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs"
              placeholder="1"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              End Question Order *
            </label>
            <input
              className="w-full rounded-md border border-slate-200 px-3 py-2 text-xs"
              placeholder="10"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-700">
              Linked Range Preview
            </label>
            <input
              className="w-full rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-700"
              readOnly
              value="Q1 - Q10 (10 questions)"
            />
          </div>
        </div>
        <p className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
          This range defines which real questions use this passage. The passage itself does not take
          a question number.
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-900">
            Link Questions from Question Bank
          </h3>
          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
            6 linked
          </span>
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <input
            className="min-w-60 flex-1 rounded-md border border-slate-200 px-3 py-2 text-xs"
            placeholder="Search questions by ID or text..."
          />
          <button className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-600">
            <Filter className="h-3.5 w-3.5" />
            Filters
          </button>
          <button className="rounded-md border border-slate-200 px-3 py-2 text-xs text-blue-700">
            Select All Visible
          </button>
        </div>

        <div className="overflow-x-auto rounded-md border border-slate-200">
          <table className="w-full min-w-245 text-xs">
            <thead className="bg-slate-50 text-slate-500">
              <tr className="text-left">
                <th className="px-3 py-2">Question ID</th>
                <th className="px-3 py-2">Question Text Preview</th>
                <th className="px-3 py-2">Subject</th>
                <th className="px-3 py-2">Order</th>
                <th className="px-3 py-2">Test Type</th>
                <th className="px-3 py-2">Access</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Link</th>
              </tr>
            </thead>
            <tbody>
              {linkedQuestions.map((row) => (
                <tr key={row[0]} className="border-t border-slate-100">
                  <td className="px-3 py-2 font-semibold text-blue-700">{row[0]}</td>
                  <td className="px-3 py-2 text-slate-700">{row[1]}</td>
                  <td className="px-3 py-2 text-slate-700">{row[2]}</td>
                  <td className="px-3 py-2 text-slate-700">{row[3]}</td>
                  <td className="px-3 py-2 text-violet-700">{row[4]}</td>
                  <td className="px-3 py-2 text-emerald-700">{row[5]}</td>
                  <td className="px-3 py-2 text-emerald-700">{row[6]}</td>
                  <td className="px-3 py-2">
                    <Link2 className="h-3.5 w-3.5 text-slate-400" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-3 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">
            App Preview - Passage Display
          </h3>
          <div className="grid place-items-center">
            <div className="w-60 rounded-[24px] border-[5px] border-slate-800 bg-white p-3">
              <div className="mb-2 h-4 w-20 rounded-full bg-slate-800" />
              <div className="h-20 rounded-md bg-slate-100" />
              <div className="mt-3 space-y-1.5">
                <div className="h-5 rounded bg-slate-100" />
                <div className="h-5 rounded bg-blue-100" />
                <div className="h-5 rounded bg-slate-100" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">
            Passage Relationship Summary
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-md border border-slate-200 bg-white p-3">
              <p className="text-slate-500">Passage ID</p>
              <p className="font-semibold">PASS-006</p>
            </div>
            <div className="rounded-md border border-slate-200 bg-white p-3">
              <p className="text-slate-500">Linked Questions</p>
              <p className="font-semibold">6</p>
            </div>
            <div className="rounded-md border border-slate-200 bg-white p-3">
              <p className="text-slate-500">Question Range</p>
              <p className="font-semibold">Q1-Q10</p>
            </div>
            <div className="rounded-md border border-slate-200 bg-white p-3">
              <p className="text-slate-500">Linked Tests</p>
              <p className="font-semibold">1</p>
            </div>
          </div>
          <p className="mt-3 rounded-md border border-blue-200 bg-blue-50 p-3 text-xs text-blue-700">
            The passage will display before linked question range and reuse in multiple tests
            without duplicating content.
          </p>
        </div>
      </section>

      <div className="flex flex-wrap justify-between gap-2 border-t border-slate-200 pt-4">
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-600">
            <Save className="h-3.5 w-3.5" />
            Save Draft
          </button>
          <button className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-600">
            <Eye className="h-3.5 w-3.5" />
            Preview
          </button>
          <button className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-600">
            <Copy className="h-3.5 w-3.5" />
            Duplicate Passage
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-600">
            <X className="h-3.5 w-3.5" />
            Cancel
          </button>
          <button className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700">
            Publish Passage
          </button>
        </div>
      </div>
    </div>
  );
}
