import type { AdminGrowthPoint, AdminRecentUser } from "@/store/apis";

export function formatCount(value: number | undefined) {
  return typeof value === "number" ? value.toLocaleString() : "0";
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function formatRelativeTime(value: string) {
  const diffMs = Date.now() - new Date(value).getTime();
  const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
}

export function mapGrowth(data: AdminGrowthPoint[]) {
  return data.map((item) => ({ month: item.label, users: item.count }));
}

export function getPlanClass(plan: string | null) {
  if (!plan || plan === "Free") return "bg-[#f2f6fb] text-[#6d839a] border-[#dee8f2]";
  if (plan.includes("matura")) return "bg-[#ebf3fc] text-[#4d93d9] border-[#d6e6f4]";
  if (plan.includes("semi")) return "bg-[#f1edfb] text-[#8468c4] border-[#e4ddf4]";
  return "bg-[#edf4fd] text-[#5f88bd] border-[#dbe7f4]";
}

export function getStatusClass(status: string) {
  if (status === "active") return "bg-[#e9f8ef] text-[#3ea666] border-[#d0ecd9]";
  if (status === "blocked") return "bg-[#fdeeee] text-[#db6f6f] border-[#f4d7d7]";
  return "bg-[#fff3da] text-[#c48a2e] border-[#f0dfb9]";
}

export function getRecentUserKey(user: AdminRecentUser, index: number) {
  return `${user.email}-${index}`;
}
