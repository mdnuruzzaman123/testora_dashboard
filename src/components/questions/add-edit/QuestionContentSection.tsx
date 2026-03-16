import { ImageIcon } from "lucide-react";

type QuestionContentSectionProps = {
  questionText: string;
  onTextChange: (value: string) => void;
};

export default function QuestionContentSection({
  questionText,
  onTextChange,
}: QuestionContentSectionProps) {
  return (
    <section className="rounded-lg border border-[#dce7f2] bg-white p-4">
      <h3 className="mb-4 text-sm font-semibold text-[#3f5f7a]">Question Content</h3>

      {/* Question text */}
      <div className="mb-4">
        <label className="mb-1.5 block text-xs font-medium text-[#587189]">Question Text</label>
        <textarea
          value={questionText}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Enter the question text..."
          rows={4}
          className="w-full resize-none rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 py-2 text-sm text-[#3f5f7a] outline-none placeholder:text-[#9ab0c3] focus:border-[#2f86d8] focus:ring-1 focus:ring-[#2f86d8]/20"
        />
      </div>

      {/* Image upload */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-[#587189]">
          Question Image (optional)
        </label>
        <div className="flex min-h-[80px] cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-[#c8d9ea] bg-[#f3f8fd] p-4 text-center hover:bg-[#edf4fb]">
          <ImageIcon className="h-5 w-5 text-[#9ab0c3]" />
          <p className="text-xs text-[#7e95ab]">Click to upload or drag &amp; drop</p>
        </div>
      </div>
    </section>
  );
}
