import { Youtube } from "lucide-react";

type SolutionVideoSectionProps = {
  youtubeLink: string;
  onChange: (value: string) => void;
};

export default function SolutionVideoSection({ youtubeLink, onChange }: SolutionVideoSectionProps) {
  return (
    <section className="rounded-lg border border-[#dce7f2] bg-white p-4">
      <h3 className="mb-4 text-sm font-semibold text-[#3f5f7a]">Solution Video (optional)</h3>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-[#587189]">YouTube Link</label>
        <div className="relative">
          <Youtube className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9ab0c3]" />
          <input
            type="url"
            value={youtubeLink}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            className="w-full rounded-md border border-[#dce7f2] bg-[#f8fbff] py-2 pr-3 pl-9 text-sm text-[#3f5f7a] outline-none placeholder:text-[#9ab0c3] focus:border-[#2f86d8] focus:ring-1 focus:ring-[#2f86d8]/20"
          />
        </div>
      </div>
    </section>
  );
}
