/* eslint-disable @next/next/no-img-element */
import type { MarketplaceProduct } from "@/lib/marketplace-data";
import { AlertTriangle } from "lucide-react";
import MarketplaceStatusBadge from "./MarketplaceBadges";

export default function InventoryPanel({ products }: { products: MarketplaceProduct[] }) {
  const outOfStock = products.filter((product) => product.stock === 0);

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-lg font-semibold text-[#3f5f7a]">Inventory Management</h3>
        <p className="text-xs text-[#8ea1b4]">Monitor stock levels and inventory status</p>
      </div>

      <section className="rounded-lg border border-[#cbdcf0] bg-[#eef5fd] p-3">
        <h4 className="text-sm font-medium text-[#3f5f7a]">Automatic Stock Management</h4>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          <div className="rounded-md border border-[#dce7f2] bg-white p-3">
            <p className="text-xs font-medium text-[#3f5f7a]">
              Stock Quantity:{" "}
              <span className="font-normal text-[#6b86a0]">Current available inventory</span>
            </p>
            <p className="mt-1 text-[10px] text-[#8ea1b4]">
              When stock reaches 0, the product automatically becomes Out of Stock.
            </p>
          </div>
          <div className="rounded-md border border-[#dce7f2] bg-white p-3">
            <p className="text-xs font-medium text-[#3f5f7a]">
              Low Stock Alert:{" "}
              <span className="font-normal text-[#6b86a0]">Products below 20 units</span>
            </p>
            <p className="mt-1 text-[10px] text-[#8ea1b4]">
              Automatically highlighted in orange for restock planning.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-[#f2d3d3] bg-[#fff3f3] p-3">
        <p className="flex items-center gap-2 text-xs font-medium text-[#3f5f7a]">
          <AlertTriangle className="h-3.5 w-3.5 text-[#df5e5e]" /> Out of Stock ({outOfStock.length}{" "}
          products)
        </p>
        {outOfStock.map((product) => (
          <div
            key={product.id}
            className="mt-2 flex items-center justify-between rounded-md border border-[#f0dddd] bg-white px-3 py-2 text-xs"
          >
            <div className="flex items-center gap-2">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-8 w-8 rounded-md border border-[#dce7f2] object-cover"
              />
              <div>
                <p className="text-[#3f5f7a]">{product.name}</p>
                <p className="text-[10px] text-[#8ea1b4]">{product.category}</p>
              </div>
            </div>
            <span className="rounded-full border border-[#f3c3c3] bg-[#fff0f0] px-2 py-0.5 text-[10px] text-[#df5e5e]">
              Stock: 0
            </span>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-lg border border-[#dce7f2] bg-white">
        <div className="border-b border-[#e8eef5] px-3 py-2.5 text-sm font-medium text-[#3f5f7a]">
          All Products Inventory
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-220 text-left">
            <thead className="bg-[#f3f7fb] text-[10px] font-semibold tracking-wide text-[#6f859b] uppercase">
              <tr>
                <th className="px-3 py-2.5">Product</th>
                <th className="px-3 py-2.5">Category</th>
                <th className="px-3 py-2.5">SKU</th>
                <th className="px-3 py-2.5">Stock Quantity</th>
                <th className="px-3 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-[#ecf2f8] text-xs text-[#5e768e] last:border-b-0"
                >
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-8 w-8 rounded-md border border-[#dce7f2] object-cover"
                      />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5">{product.category}</td>
                  <td className="px-3 py-2.5 text-[10px] text-[#7f95aa]">{product.sku}</td>
                  <td
                    className={product.stock === 0 ? "px-3 py-2.5 text-[#df5e5e]" : "px-3 py-2.5"}
                  >
                    {product.stock}
                  </td>
                  <td className="px-3 py-2.5">
                    <MarketplaceStatusBadge status={product.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
