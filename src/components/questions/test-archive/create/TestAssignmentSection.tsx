type Props = {
  category: string;
  subject: string;
  faculty: string;
  department: string;
};

export default function TestAssignmentSection({ category, subject, faculty, department }: Props) {
  const isEntrance = category === "Entrance Exam";

  return (
    <section className="rounded-lg border border-[#dce7f2] bg-white p-4">
      <h3 className="text-sm font-semibold text-[#3f5f7a]">Test Assignment</h3>
      <p className="mb-3 text-xs text-[#90a3b6]">
        Assign the test to the correct subject, faculty, or department
      </p>

      <div className="rounded-md border border-[#c8ddf2] bg-[#eaf4fd] p-3">
        <ul className="space-y-1 text-xs text-[#4a7eb8]">
          {!isEntrance && <li>• Subject is used for Semimatura and Matura</li>}
          {isEntrance && <li>• Faculty and Department are used for Entrance Exams</li>}
        </ul>
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {!isEntrance ? (
          <div className="rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 py-2 text-sm text-[#4f6d87]">
            <span className="text-xs text-[#90a3b6]">Subject</span>
            <p className="font-medium">{subject || "Not selected"}</p>
          </div>
        ) : (
          <>
            <div className="rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 py-2 text-sm text-[#4f6d87]">
              <span className="text-xs text-[#90a3b6]">Faculty</span>
              <p className="font-medium">{faculty || "Not selected"}</p>
            </div>
            <div className="rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 py-2 text-sm text-[#4f6d87]">
              <span className="text-xs text-[#90a3b6]">Department</span>
              <p className="font-medium">{department || "Not selected"}</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
