import { QUESTION_STATUSES } from "@/lib/question-system-data";

type StatusCardProps = {
  status: string;
  onStatusChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

export default function StatusCard({ status, onStatusChange, onSave, onCancel }: StatusCardProps) {
  return (
    <div className="rounded-lg border border-[#dce7f2] bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold text-[#3f5f7a]">Status</h3>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="mb-3 w-full rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 py-2 text-sm text-[#3f5f7a] outline-none focus:border-[#2f86d8] focus:ring-1 focus:ring-[#2f86d8]/20"
      >
        {QUESTION_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onSave}
          className="flex-1 rounded-md bg-[#2f86d8] px-4 py-2 text-sm font-medium text-white hover:bg-[#2a78c6]"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-md border border-[#dce7f2] bg-white px-4 py-2 text-sm font-medium text-[#5e768e] hover:bg-[#f8fbff]"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
