import { passageRows } from "@/lib/passages-data";
import PassageTableRow from "./PassageTableRow";

export default function PassageTable({ rows = passageRows }: { rows?: typeof passageRows }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-[#dce7f2] bg-white">
      <table className="w-full min-w-175 text-left">
        <thead className="bg-[#f3f7fb] text-[11px] font-medium tracking-wide text-[#6f859b] uppercase">
          <tr>
            <th className="px-3 py-2.5">Passage ID</th>
            <th className="px-3 py-2.5">Code</th>
            <th className="px-3 py-2.5">Title</th>
            <th className="px-3 py-2.5">Linked Range</th>
            <th className="px-3 py-2.5 text-center">Questions</th>
            <th className="px-3 py-2.5 text-center">Image</th>
            <th className="px-3 py-2.5">Status</th>
            <th className="px-3 py-2.5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <PassageTableRow key={row.id} row={row} />
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={8} className="px-3 py-6 text-center text-xs text-[#90a3b6]">
                No passages found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
