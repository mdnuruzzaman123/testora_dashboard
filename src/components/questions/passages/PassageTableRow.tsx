import { type PassageRow, type PassageStatus } from "@/lib/passages-data";
import { cn } from "@/lib/utils";
import { Copy, Eye, ImageIcon, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

function statusClass(status: PassageStatus) {
  if (status === "Published") return "border-[#d0ecd9] bg-[#e9f8ef] text-[#3ea666]";
  if (status === "Draft") return "border-[#f0dfb9] bg-[#fff3da] text-[#c48a2e]";
  if (status === "Hidden") return "border-[#dee8f2] bg-[#f2f6fb] text-[#6d839a]";
  return "border-[#f4d7d7] bg-[#fdeeee] text-[#db6f6f]";
}

export default function PassageTableRow({ row }: { row: PassageRow }) {
  return (
    <tr className="border-b border-[#ecf2f8] text-xs text-[#5e768e] last:border-b-0 hover:bg-[#f8fbff]">
      <td className="px-3 py-2.5 font-semibold text-[#2f86d8]">{row.code}</td>
      <td className="px-3 py-2.5 text-[#2f86d8]">{row.code}</td>
      <td className="px-3 py-2.5 font-medium text-[#3f5f7a]">{row.title}</td>
      <td className="px-3 py-2.5">
        <span className="rounded-full border border-[#dce4f6] bg-[#edf0fb] px-2 py-0.5 text-[10px] font-medium text-[#748ccc]">
          {row.range}
        </span>
      </td>
      <td className="px-3 py-2.5 text-center">{row.questions}</td>
      <td className="px-3 py-2.5 text-center">
        {row.image ? (
          <ImageIcon className="mx-auto h-3.5 w-3.5 text-[#4a93d9]" />
        ) : (
          <span className="text-[#c0cedc]">—</span>
        )}
      </td>
      <td className="px-3 py-2.5">
        <span
          className={cn(
            "rounded-full border px-2 py-0.5 text-[10px] font-medium",
            statusClass(row.status)
          )}
        >
          {row.status}
        </span>
      </td>
      <td className="px-3 py-2.5">
        <div className="flex items-center gap-2">
          <button type="button" title="View" className="text-[#9ab0c3] hover:text-[#4a93d9]">
            <Eye className="h-3.5 w-3.5" />
          </button>
          <Link
            href="/questions/passages/add"
            title="Edit"
            className="text-[#9ab0c3] hover:text-[#3f5f7a]"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Link>
          <button type="button" title="Duplicate" className="text-[#9ab0c3] hover:text-[#7b6db5]">
            <Copy className="h-3.5 w-3.5" />
          </button>
          <button type="button" title="Delete" className="text-[#9ab0c3] hover:text-[#db6f6f]">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
