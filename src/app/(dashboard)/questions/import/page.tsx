import { Download, Upload, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

const mappingRows = [
  ["question_text", "Column A", "Mapped"],
  ["option_a", "Column B", "Mapped"],
  ["option_b", "Column C", "Mapped"],
  ["option_c", "Column D", "Mapped"],
  ["option_d", "Column E", "Mapped"],
  ["correct_answer", "Column F", "Mapped"],
  ["category", "Column G", "Mapped"],
  ["year", "Column H", "Mapped"],
  ["subject", "Column I", "Mapped"],
  ["faculty", "Column J", "Mapped"],
  ["department", "Column K", "Mapped"],
  ["test_type", "Column L", "Mapped"],
  ["access", "Column M", "Mapped"],
  ["passage_id", "Column N", "Optional"],
  ["question_order", "Column O", "Mapped"],
];

export default function ImportPage() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.14em] text-blue-600 uppercase">
          Bulk Intake
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Import Questions</h2>
        <p className="mt-1 text-sm text-slate-500">
          Import questions from Excel or CSV files into the centralized Question Bank
        </p>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="mb-3 inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-[11px] font-semibold text-blue-700">
          1 Upload File
        </p>
        <div className="grid place-items-center rounded-xl border border-dashed border-slate-300 bg-slate-50 py-10 text-center">
          <Upload className="h-7 w-7 text-slate-400" />
          <p className="mt-3 text-sm font-medium text-slate-700">
            Drop your file here, or click to browse
          </p>
          <p className="mt-1 text-xs text-slate-500">Supports Excel (.xlsx, .xls) and CSV (.csv)</p>
          <div className="mt-3 flex items-center gap-2 text-[11px]">
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">.xlsx</span>
            <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">.xls</span>
            <span className="rounded-full bg-blue-100 px-2 py-1 text-blue-700">.csv</span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-700">
            <Download className="h-3.5 w-3.5" />
            Download Excel Template
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-600">
            <Download className="h-3.5 w-3.5" />
            Download CSV Template
          </button>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">Field Mapping Preview</h3>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full min-w-190 text-xs">
            <thead className="bg-slate-50 text-slate-500">
              <tr className="text-left">
                <th className="px-3 py-2">Database Field</th>
                <th className="px-3 py-2">Mapped To</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {mappingRows.map((row) => (
                <tr key={row[0]} className="border-t border-slate-100">
                  <td className="px-3 py-2 text-slate-700">{row[0]}</td>
                  <td className="px-3 py-2 text-slate-600">{row[1]}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        row[2] === "Mapped"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {row[2]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-slate-900">Validation Summary</h3>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-center">
            <CheckCircle2 className="mx-auto h-5 w-5 text-emerald-600" />
            <p className="mt-2 text-3xl font-bold text-emerald-700">142</p>
            <p className="text-xs text-emerald-700">Valid Questions</p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-center">
            <AlertTriangle className="mx-auto h-5 w-5 text-amber-600" />
            <p className="mt-2 text-3xl font-bold text-amber-700">5</p>
            <p className="text-xs text-amber-700">Warnings</p>
          </div>
          <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-center">
            <XCircle className="mx-auto h-5 w-5 text-rose-600" />
            <p className="mt-2 text-3xl font-bold text-rose-700">3</p>
            <p className="text-xs text-rose-700">Errors</p>
          </div>
        </div>

        <div className="mt-3 space-y-2 text-xs">
          <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-rose-700">
            Row 45: Missing correct answer (A)
          </p>
          <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-rose-700">
            Row 89: Duplicate question text detected
          </p>
          <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-rose-700">
            Row 112: Invalid passage reference (PSG-99)
          </p>
          <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-amber-700">
            Row 23: Passage ID provided will link to existing passage
          </p>
        </div>
      </section>

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-700">
        <p className="font-semibold">Important: Passage ID Connection</p>
        <p className="mt-1">
          If a question belongs to a passage, the Passage ID in your import file should match an
          existing passage. Questions will be linked, not duplicated.
        </p>
      </div>

      <div className="flex justify-end gap-2">
        <button className="rounded-md border border-slate-200 px-3 py-2 text-xs text-slate-600 hover:bg-slate-100">
          Cancel
        </button>
        <button className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700">
          Import 142 Questions
        </button>
      </div>
    </div>
  );
}
