import type { MarketplaceProductStatus } from "@/lib/marketplace-data";
import { cn } from "@/lib/utils";

export function marketplaceStatusClass(status: MarketplaceProductStatus) {
  if (status === "Active") return "border-[#bfe6c9] bg-[#e8f7ed] text-[#3c9b63]";
  if (status === "Hidden") return "border-[#e5e9ef] bg-[#f2f6fb] text-[#6d839a]";
  return "border-[#f3c3c3] bg-[#fff0f0] text-[#df5e5e]";
}

export default function MarketplaceStatusBadge({ status }: { status: MarketplaceProductStatus }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2 py-0.5 text-[10px] leading-none font-medium",
        marketplaceStatusClass(status)
      )}
    >
      {status}
    </span>
  );
}
