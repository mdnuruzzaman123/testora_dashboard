type Props = {
  title: string;
  category: string;
  year: string;
  access: string;
  status: string;
  totalQuestions: string;
};

export default function PreviewTestStructureSection({
  title,
  category,
  year,
  access,
  status,
  totalQuestions,
}: Props) {
  return (
    <section className="rounded-lg border border-[#dce7f2] bg-white p-4">
      <h3 className="text-sm font-semibold text-[#3f5f7a]">Preview Test Structure</h3>
      <p className="mb-3 text-xs text-[#90a3b6]">Review from this test list before saving or publishing</p>

      <div className="grid gap-2 md:grid-cols-3">
        <div className="rounded-md border border-[#dce7f2] bg-[#f8fbff] p-2.5">
          <p className="text-[10px] text-[#90a3b6]">Test Name</p>
          <p className="text-xs font-medium text-[#4f6d87]">{title || "Untitled Test"}</p>
        </div>
        <div className="rounded-md border border-[#dce7f2] bg-[#f8fbff] p-2.5">
          <p className="text-[10px] text-[#90a3b6]">Category</p>
          <p className="text-xs font-medium text-[#4f6d87]">{category}</p>
        </div>
        <div className="rounded-md border border-[#dce7f2] bg-[#f8fbff] p-2.5">
          <p className="text-[10px] text-[#90a3b6]">Year</p>
          <p className="text-xs font-medium text-[#4f6d87]">{year}</p>
        </div>
        <div className="rounded-md border border-[#dce7f2] bg-[#f8fbff] p-2.5">
          <p className="text-[10px] text-[#90a3b6]">Total Questions</p>
          <p className="text-xs font-medium text-[#4f6d87]">{totalQuestions || "0"}</p>
        </div>
        <div className="rounded-md border border-[#dce7f2] bg-[#f8fbff] p-2.5">
          <p className="text-[10px] text-[#90a3b6]">Access</p>
          <p className="text-xs font-medium text-[#4f6d87]">{access}</p>
        </div>
        <div className="rounded-md border border-[#dce7f2] bg-[#f8fbff] p-2.5">
          <p className="text-[10px] text-[#90a3b6]">Status</p>
          <p className="text-xs font-medium text-[#4f6d87]">{status}</p>
        </div>
      </div>

      <div className="mt-3 grid gap-2 md:grid-cols-3">
        <div className="rounded-md border border-[#d6e5f4] bg-[#eaf2fb] p-2.5 text-xs text-[#4d93d9]">Linked Questions: 8</div>
        <div className="rounded-md border border-[#e4ddf4] bg-[#f1edfb] p-2.5 text-xs text-[#8468c4]">Linked Passages: 2</div>
        <div className="rounded-md border border-[#d5ece5] bg-[#e9f5f1] p-2.5 text-xs text-[#3b9b81]">Question Order Configured</div>
      </div>

      <div className="mt-3 grid gap-2 md:grid-cols-3">
        <div className="rounded-md border border-[#dce7f2] bg-[#f8fbff] p-2.5">
          <p className="text-xs font-medium text-[#4f6d87]">Study Archive</p>
          <p className="text-[11px] text-[#90a3b6]">Answers and explanations revealed</p>
        </div>
        <div className="rounded-md border border-[#dce7f2] bg-[#f8fbff] p-2.5">
          <p className="text-xs font-medium text-[#4f6d87]">Full Simulation</p>
          <p className="text-[11px] text-[#90a3b6]">Answers hidden until submission</p>
        </div>
        <div className="rounded-md border border-[#dce7f2] bg-[#f8fbff] p-2.5">
          <p className="text-xs font-medium text-[#4f6d87]">Practice by Subject</p>
          <p className="text-[11px] text-[#90a3b6]">Filtered by subject or category</p>
        </div>
      </div>
    </section>
  );
}
