import {
  marketplaceOverviewBlocks,
  marketplaceQuickActions,
  type MarketplaceTab,
} from "@/lib/marketplace-data";
import { cn } from "@/lib/utils";
import { ArrowRightLeft, Boxes, FolderOpen, Package, ShoppingCart, Truck } from "lucide-react";

function iconForIndex(index: number) {
  return [Boxes, Package, ShoppingCart, FolderOpen, Truck, ArrowRightLeft][index] ?? Boxes;
}

type Props = {
  onOpenAddProduct: () => void;
  onNavigateTab: (tab: MarketplaceTab) => void;
};

export default function OverviewPanel({ onOpenAddProduct, onNavigateTab }: Props) {
  const statCards = [
    { label: "Total Products", value: 8, color: "text-[#4d79bb] bg-[#eef5ff] border-[#cfe0f4]" },
    { label: "Active Products", value: 6, color: "text-[#3ea666] bg-[#edf8f3] border-[#d1e9df]" },
    { label: "Out of Stock", value: 1, color: "text-[#df5e5e] bg-[#fff0f0] border-[#f3c3c3]" },
    { label: "Total Categories", value: 6, color: "text-[#a04de0] bg-[#f5efff] border-[#e8dcfa]" },
    { label: "New Orders", value: 1, color: "text-[#cf8d34] bg-[#fff5e8] border-[#f0dfc1]" },
    {
      label: "Synced AutoDS Products",
      value: 4,
      color: "text-[#5768ff] bg-[#eef0ff] border-[#d8dcff]",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {statCards.map((item, index) => {
          const Icon = iconForIndex(index);
          return (
            <div key={item.label} className="rounded-lg border border-[#dce7f2] bg-white p-3.5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] text-[#90a3b6]">{item.label}</p>
                  <p className="mt-0.5 text-[30px] leading-none font-semibold text-[#3f5f7a]">
                    {item.value}
                  </p>
                </div>
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-md border",
                    item.color
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <section className="rounded-lg border border-[#dce7f2] bg-white p-4">
        <h3 className="text-sm font-semibold text-[#3f5f7a]">Marketplace Overview</h3>
        <div className="mt-3 rounded-md border border-[#cdddf1] bg-[#eef5fd] p-3">
          <p className="text-xs font-medium text-[#3f5f7a]">Physical Products Only</p>
          <p className="mt-1 text-[11px] leading-relaxed text-[#6b86a0]">
            This marketplace section manages physical educational products such as school bags,
            books, calculators, engineering tools, technical drawing tools, stationery, and other
            school-related materials. All products are sold on the website.
          </p>
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div className="rounded-md border border-[#d2eadf] bg-[#eef8f2] p-3">
            <p className="text-xs font-medium text-[#3f5f7a]">✓ Marketplace Includes</p>
            <ul className="mt-2 space-y-1 text-[11px] text-[#5f7a6e]">
              {marketplaceOverviewBlocks.includes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-[#efd0d0] bg-[#fff3f3] p-3">
            <p className="text-xs font-medium text-[#3f5f7a]">✕ Not Part of Marketplace</p>
            <ul className="mt-2 space-y-1 text-[11px] text-[#7f6d6d]">
              {marketplaceOverviewBlocks.excludes.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-[#dce7f2] bg-white p-4">
        <h3 className="text-sm font-semibold text-[#3f5f7a]">Quick Actions</h3>
        <div className="mt-3 grid gap-2 md:grid-cols-4">
          {marketplaceQuickActions.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={() => {
                if (action.id === "add") onOpenAddProduct();
                if (action.id === "category") onNavigateTab("categories");
                if (action.id === "sync") onNavigateTab("autods");
                if (action.id === "orders") onNavigateTab("orders");
              }}
              className={cn(
                "rounded-md border px-3 py-3 text-left text-xs font-medium",
                action.color
              )}
            >
              {action.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
