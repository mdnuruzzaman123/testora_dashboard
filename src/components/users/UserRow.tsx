import StatusBadge from "@/components/users/StatusBadge";
import { cn } from "@/lib/utils";
import type { UserStatus } from "@/types";
import { MoreHorizontal } from "lucide-react";

export type UserManagementRow = {
  id: string;
  initials: string;
  name: string;
  email: string;
  preferredCategory: string;
  type: string;
  activePlan: string;
  lastActivity: string;
  joinedDate: string;
  status: UserStatus;
};

type UserRowProps = {
  user: UserManagementRow;
};

function badgeClass(value: string, kind: "category" | "plan") {
  if (kind === "category") {
    if (value === "Matura") return "border-[#d6e5f4] bg-[#eaf2fb] text-[#4d93d9]";
    if (value === "Semimatura") return "border-[#dce4f6] bg-[#edf0fb] text-[#748ccc]";
    return "border-[#d5ece5] bg-[#e9f5f1] text-[#3b9b81]";
  }

  if (value === "Free") return "border-[#dee8f2] bg-[#f2f6fb] text-[#6d839a]";
  if (value.includes("Matura")) return "border-[#d6e6f4] bg-[#ebf3fc] text-[#4d93d9]";
  if (value.includes("Semimatura")) return "border-[#e4ddf4] bg-[#f1edfb] text-[#8468c4]";
  return "border-[#dbe7f4] bg-[#edf4fd] text-[#5f88bd]";
}

export default function UserRow({ user }: UserRowProps) {
  return (
    <tr className="border-b border-[#ecf2f8] text-xs text-[#5e768e] last:border-b-0">
      <td className="px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e8f2fc] text-[11px] font-semibold text-[#4b92d9]">
            {user.initials}
          </div>
          <div>
            <p className="font-medium text-[#4f6d87]">{user.name}</p>
            <p className="text-[11px] text-[#90a2b5]">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 sm:px-5">
        <span
          className={cn(
            "rounded-sm border px-2 py-0.5 text-[11px]",
            badgeClass(user.preferredCategory, "category")
          )}
        >
          {user.preferredCategory}
        </span>
      </td>
      <td className="px-4 py-3 sm:px-5">
        <span
          className={cn(
            "rounded-sm border px-2 py-0.5 text-[11px]",
            badgeClass(user.activePlan, "plan")
          )}
        >
          {user.activePlan}
        </span>
      </td>
      <td className="px-4 py-3 sm:px-5">{user.lastActivity}</td>
      <td className="px-4 py-3 sm:px-5">{user.joinedDate}</td>
      <td className="px-4 py-3 sm:px-5">
        <StatusBadge status={user.status} />
      </td>
      <td className="px-4 py-3 text-right sm:px-5">
        <button
          type="button"
          aria-label="Open row actions"
          className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-transparent text-[#7f95aa] hover:border-[#dce7f2] hover:bg-[#f8fbff]"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );
}
