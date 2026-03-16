import {
  ACCESS_OPTIONS,
  DEPARTMENTS_BY_FACULTY,
  FACULTIES,
  QUESTION_YEARS,
  SUBJECTS,
} from "@/lib/question-system-data";

type TestCategory = "Semimatura" | "Matura" | "Entrance Exam";

type BasicInfoState = {
  testTitle: string;
  category: TestCategory;
  year: string;
  structureType: string;
  subject: string;
  faculty: string;
  department: string;
  testType: string;
  access: string;
  status: string;
  totalQuestions: string;
};

type Props = {
  data: BasicInfoState;
  onChange: (field: keyof BasicInfoState, value: string) => void;
};

const inputClass =
  "w-full rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 py-2 text-sm text-[#3f5f7a] outline-none placeholder:text-[#9ab0c3] focus:border-[#2f86d8] focus:ring-1 focus:ring-[#2f86d8]/20";

export default function BasicTestInformationSection({ data, onChange }: Props) {
  const isEntrance = data.category === "Entrance Exam";
  const departmentOptions = data.faculty ? (DEPARTMENTS_BY_FACULTY[data.faculty] ?? []) : [];

  return (
    <section className="rounded-lg border border-[#dce7f2] bg-white p-4">
      <h3 className="text-sm font-semibold text-[#3f5f7a]">Basic Test Information</h3>
      <p className="mb-3 text-xs text-[#90a3b6]">Define metadata for this test structure</p>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-1 block text-xs font-medium text-[#587189]">Test Title</label>
          <input
            value={data.testTitle}
            onChange={(e) => onChange("testTitle", e.target.value)}
            className={inputClass}
            placeholder="e.g. Semimatura 2025 - Mathematics"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-[#587189]">Main Category</label>
          <select
            value={data.category}
            onChange={(e) => onChange("category", e.target.value as TestCategory)}
            className={inputClass}
          >
            <option value="Semimatura">Semimatura</option>
            <option value="Matura">Matura</option>
            <option value="Entrance Exam">Entrance Exam</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-[#587189]">Year</label>
          <select
            value={data.year}
            onChange={(e) => onChange("year", e.target.value)}
            className={inputClass}
          >
            {QUESTION_YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-[#587189]">Structure Type</label>
          <select
            value={data.structureType}
            onChange={(e) => onChange("structureType", e.target.value)}
            className={inputClass}
          >
            <option value="Official">Official</option>
            <option value="Additional">Additional</option>
          </select>
        </div>

        {isEntrance ? (
          <>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#587189]">Faculty</label>
              <select
                value={data.faculty}
                onChange={(e) => {
                  onChange("faculty", e.target.value);
                  onChange("department", "");
                }}
                className={inputClass}
              >
                <option value="">Select faculty</option>
                {FACULTIES.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[#587189]">Department</label>
              <select
                value={data.department}
                onChange={(e) => onChange("department", e.target.value)}
                className={inputClass}
              >
                <option value="">Select department</option>
                {departmentOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <div>
            <label className="mb-1 block text-xs font-medium text-[#587189]">Subject</label>
            <select
              value={data.subject}
              onChange={(e) => onChange("subject", e.target.value)}
              className={inputClass}
            >
              <option value="">Select subject</option>
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="mb-1 block text-xs font-medium text-[#587189]">Test Type</label>
          <select
            value={data.testType}
            onChange={(e) => onChange("testType", e.target.value)}
            className={inputClass}
          >
            <option value="Official">Official</option>
            <option value="Additional">Additional</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-[#587189]">Access</label>
          <div className="flex gap-2">
            {ACCESS_OPTIONS.map((option) => {
              const active = data.access === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onChange("access", option)}
                  className={
                    active
                      ? "rounded-md border border-[#d6e5f4] bg-[#eaf2fb] px-3 py-2 text-xs font-medium text-[#4d93d9]"
                      : "rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 py-2 text-xs font-medium text-[#7e95ab]"
                  }
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-[#587189]">Status</label>
          <select
            value={data.status}
            onChange={(e) => onChange("status", e.target.value)}
            className={inputClass}
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-[#587189]">Total Questions</label>
          <input
            type="number"
            min={1}
            value={data.totalQuestions}
            onChange={(e) => onChange("totalQuestions", e.target.value)}
            className={inputClass}
            placeholder="e.g. 100"
          />
        </div>
      </div>
    </section>
  );
}
