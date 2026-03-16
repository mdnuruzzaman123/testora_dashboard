import { Upload } from "lucide-react";

const inputClass =
  "w-full rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 py-2 text-sm text-[#3f5f7a] outline-none placeholder:text-[#9ab0c3] focus:border-[#2f86d8] focus:ring-1 focus:ring-[#2f86d8]/20";

export type PassageStatus = "Draft" | "Published" | "Hidden" | "Archived";

type PassageBasicInfo = {
  passageId: string;
  passageTitle: string;
  passageContent: string;
  status: PassageStatus;
};

type Props = {
  data: PassageBasicInfo;
  onChange: (field: keyof PassageBasicInfo, value: string) => void;
};

const STATUS_OPTIONS: { value: PassageStatus; label: string }[] = [
  { value: "Draft", label: "Draft" },
  { value: "Published", label: "Published" },
  { value: "Hidden", label: "Hidden" },
  { value: "Archived", label: "Archived" },
];

export default function BasicPassageInformationSection({ data, onChange }: Props) {
  return (
    <section className="rounded-lg border border-[#dce7f2] bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-5 w-5 items-center justify-center rounded bg-[#e0edf9] text-[10px] font-bold text-[#2f86d8]">
          B
        </span>
        <h3 className="text-sm font-semibold text-[#3f5f7a]">Basic Passage Information</h3>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {/* Passage ID */}
        <div>
          <label className="mb-1 block text-xs font-medium text-[#587189]">
            Passage ID <span className="text-[#db6f6f]">*</span>
          </label>
          <input
            value={data.passageId}
            onChange={(e) => onChange("passageId", e.target.value)}
            className={inputClass}
            placeholder="PASS-005"
          />
          <p className="mt-1 text-[10px] text-[#90a3b6]">UI identifier for this passage</p>
        </div>

        {/* Passage Title */}
        <div>
          <label className="mb-1 block text-xs font-medium text-[#587189]">
            Passage Title <span className="text-[#db6f6f]">*</span>
          </label>
          <input
            value={data.passageTitle}
            onChange={(e) => onChange("passageTitle", e.target.value)}
            className={inputClass}
            placeholder="e.g. Reading Passage – Albanian Language"
          />
        </div>

        {/* Passage Content */}
        <div className="md:col-span-2">
          <label className="mb-1 block text-xs font-medium text-[#587189]">
            Passage Content <span className="text-[#db6f6f]">*</span>
          </label>
          <textarea
            value={data.passageContent}
            onChange={(e) => onChange("passageContent", e.target.value)}
            className={`${inputClass} min-h-30 resize-y`}
            placeholder="Enter the shared text content that will be displayed before the linked questions..."
          />
          <p className="mt-1 text-[10px] text-[#90a3b6]">
            This is the shared text shown before linked questions in the app
          </p>
        </div>

        {/* Passage Image upload */}
        <div>
          <label className="mb-1 block text-xs font-medium text-[#587189]">
            Passage Image (Optional)
          </label>
          <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-[#b4cfe8] bg-[#f8fbff] py-6 text-center">
            <Upload className="h-5 w-5 text-[#9ab0c3]" />
            <p className="text-xs text-[#7e95ab]">Click to upload or drag &amp; drop</p>
            <p className="text-[10px] text-[#90a3b6]">JPG, PNG (Max 2MB)</p>
            <button
              type="button"
              className="mt-1 rounded-md border border-[#b4cfe8] bg-white px-3 py-1 text-xs font-medium text-[#2f86d8] hover:bg-[#f3f7fb]"
            >
              Browse Files
            </button>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="mb-1 block text-xs font-medium text-[#587189]">Status</label>
          <div className="space-y-2">
            {STATUS_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                className={`flex cursor-pointer items-center gap-2.5 rounded-md border px-3 py-2 text-sm transition-colors ${
                  data.status === opt.value
                    ? "border-[#2f86d8] bg-[#edf4fb] text-[#2f86d8]"
                    : "border-[#dce7f2] bg-white text-[#587189] hover:bg-[#f8fbff]"
                }`}
              >
                <span
                  className={`h-3.5 w-3.5 shrink-0 rounded-full border-2 ${
                    data.status === opt.value
                      ? "border-[#2f86d8] bg-[#2f86d8]"
                      : "border-[#b4cfe8] bg-white"
                  }`}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
