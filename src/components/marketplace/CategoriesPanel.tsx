import type { MarketplaceCategory } from "@/lib/marketplace-data";
import { Pencil, Trash2 } from "lucide-react";

export default function CategoriesPanel({ categories }: { categories: MarketplaceCategory[] }) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[#3f5f7a]">Product Categories</h3>
          <p className="text-xs text-[#8ea1b4]">Manage product category structure</p>
        </div>
        <button
          type="button"
          className="rounded-md bg-[#57a9e7] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#4998d5]"
        >
          + Add Category
        </button>
      </div>

      <section className="overflow-hidden rounded-lg border border-[#dce7f2] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-180 text-left">
            <thead className="bg-[#f3f7fb] text-[10px] font-semibold tracking-wide text-[#6f859b] uppercase">
              <tr>
                <th className="px-3 py-2.5">Category Name</th>
                <th className="px-3 py-2.5">Product Count</th>
                <th className="px-3 py-2.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.name}
                  className="border-b border-[#ecf2f8] text-xs text-[#5e768e] last:border-b-0"
                >
                  <td className="px-3 py-2.5">{category.name}</td>
                  <td className="px-3 py-2.5">{category.productCount} products</td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <button type="button" className="text-[#3571d5]">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button type="button" className="text-[#df5e5e]">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-[#dce7f2] bg-[#eef5fd] p-3">
        <h4 className="text-sm font-medium text-[#3f5f7a]">Category Examples</h4>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {categories.slice(0, 3).map((category) => (
            <div
              key={category.name}
              className="rounded-md border border-[#d9e5f2] bg-white px-3 py-2"
            >
              <p className="text-xs font-medium text-[#3f5f7a]">{category.name}</p>
              <p className="mt-1 text-[10px] text-[#90a2b5]">{category.example}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
