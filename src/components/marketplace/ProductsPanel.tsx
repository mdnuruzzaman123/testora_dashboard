/* eslint-disable @next/next/no-img-element */
"use client";

import type { MarketplaceProduct } from "@/lib/marketplace-data";
import { Eye, EyeOff, Pencil, Search, Trash2 } from "lucide-react";
import MarketplaceStatusBadge from "./MarketplaceBadges";

type Props = {
  products: MarketplaceProduct[];
  onOpenAddProduct: () => void;
};

export default function ProductsPanel({ products, onOpenAddProduct }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[#3f5f7a]">Products</h3>
          <p className="text-xs text-[#8ea1b4]">Manage marketplace product catalog</p>
        </div>
        <button
          type="button"
          onClick={onOpenAddProduct}
          className="rounded-md bg-[#57a9e7] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#4998d5]"
        >
          + Add New Product
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-[#dce7f2] bg-white p-2.5">
        <label className="relative min-w-56 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2 text-[#9ab0c3]" />
          <input
            placeholder="Search by product name or SKU..."
            className="h-9 w-full rounded-md border border-[#dce7f2] bg-[#f8fbff] pr-3 pl-8 text-sm text-[#3f5f7a] outline-none placeholder:text-[#9ab0c3]"
          />
        </label>
        <input className="h-9 min-w-52 rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 text-sm text-[#587189] outline-none" />
        <input className="h-9 min-w-52 rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 text-sm text-[#587189] outline-none" />
      </div>

      <section className="overflow-hidden rounded-lg border border-[#dce7f2] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-250 text-left">
            <thead className="bg-[#f3f7fb] text-[10px] font-semibold tracking-wide text-[#6f859b] uppercase">
              <tr>
                <th className="px-3 py-2.5">Product Image</th>
                <th className="px-3 py-2.5">Product Name</th>
                <th className="px-3 py-2.5">Category</th>
                <th className="px-3 py-2.5">Price</th>
                <th className="px-3 py-2.5">Stock</th>
                <th className="px-3 py-2.5">Status</th>
                <th className="px-3 py-2.5">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-[#ecf2f8] text-xs text-[#5e768e] last:border-b-0 hover:bg-[#f8fbff]"
                >
                  <td className="px-3 py-2.5">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-9 w-9 rounded-md border border-[#dce7f2] object-cover"
                    />
                  </td>
                  <td className="px-3 py-2.5">
                    <p className="font-medium text-[#3f5f7a]">{product.name}</p>
                    <p className="text-[10px] text-[#9ab0c3]">SKU: {product.sku}</p>
                  </td>
                  <td className="px-3 py-2.5">{product.category}</td>
                  <td className="px-3 py-2.5">€{product.price.toFixed(2)}</td>
                  <td
                    className={product.stock === 0 ? "px-3 py-2.5 text-[#df5e5e]" : "px-3 py-2.5"}
                  >
                    {product.stock}
                  </td>
                  <td className="px-3 py-2.5">
                    <MarketplaceStatusBadge status={product.status} />
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2 text-[#6d839a]">
                      <button type="button" className="hover:text-[#3571d5]">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button type="button" className="hover:text-[#6d839a]">
                        {product.status === "Hidden" ? (
                          <Eye className="h-3.5 w-3.5" />
                        ) : (
                          <EyeOff className="h-3.5 w-3.5" />
                        )}
                      </button>
                      <button type="button" className="hover:text-[#df5e5e]">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-3 py-2 text-[11px] text-[#8ea1b4]">
          Showing {products.length} of {products.length} products
        </div>
      </section>
    </div>
  );
}
