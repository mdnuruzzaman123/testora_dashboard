"use client";

import {
  marketplaceCategories,
  type MarketplaceProduct,
  type ShippingType,
} from "@/lib/marketplace-data";
import { Upload, X } from "lucide-react";
import { useMemo, useState } from "react";

type ProductDraft = {
  name: string;
  category: string;
  sku: string;
  description: string;
  price: string;
  stock: string;
  shippingType: ShippingType;
  shippingPrice: string;
  status: MarketplaceProduct["status"];
};

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (draft: Omit<MarketplaceProduct, "id" | "imageUrl">) => void;
};

const inputClass =
  "h-9 w-full rounded-md border border-[#dce7f2] bg-white px-3 text-sm text-[#4f6d87] outline-none placeholder:text-[#a1b2c2]";

export default function AddProductModal({ open, onClose, onCreate }: Props) {
  const [draft, setDraft] = useState<ProductDraft>({
    name: "",
    category: "",
    sku: "",
    description: "",
    price: "0",
    stock: "0",
    shippingType: "Free",
    shippingPrice: "0",
    status: "Active",
  });

  const shippingVariants = useMemo(() => ["Free", "Paid"] as const, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d4056]/35 p-4">
      <div className="w-full max-w-3xl rounded-2xl border border-[#dce7f2] bg-white">
        <div className="flex items-start justify-between border-b border-[#e6edf5] px-5 py-4">
          <div>
            <h3 className="text-xl font-semibold text-[#2f3f52]">Add New Product</h3>
            <p className="text-xs text-[#8ea1b4]">Fill in the product details and upload images</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-[#8ea1b5] hover:bg-[#f4f8fc]"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        <div className="max-h-[80vh] space-y-4 overflow-y-auto px-5 py-4">
          <section className="space-y-3">
            <h4 className="text-sm font-semibold text-[#4f6d87]">Basic Information</h4>
            <div>
              <label className="mb-1 block text-[11px] font-medium text-[#6f859b]">
                Product Name *
              </label>
              <input
                value={draft.name}
                onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Professional Engineering Tools Kit"
                className={inputClass}
              />
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-[11px] font-medium text-[#6f859b]">
                  Category *
                </label>
                <select
                  value={draft.category}
                  onChange={(e) => setDraft((prev) => ({ ...prev, category: e.target.value }))}
                  className={inputClass}
                >
                  <option value="">Select category</option>
                  {marketplaceCategories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-medium text-[#6f859b]">SKU</label>
                <input
                  value={draft.sku}
                  onChange={(e) => setDraft((prev) => ({ ...prev, sku: e.target.value }))}
                  placeholder="e.g., ENG-KIT-001"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-medium text-[#6f859b]">
                Description *
              </label>
              <textarea
                value={draft.description}
                onChange={(e) => setDraft((prev) => ({ ...prev, description: e.target.value }))}
                rows={4}
                placeholder="Enter product description..."
                className="w-full resize-none rounded-md border border-[#dce7f2] bg-white px-3 py-2 text-sm text-[#4f6d87] outline-none placeholder:text-[#a1b2c2]"
              />
            </div>
          </section>

          <section className="space-y-3">
            <h4 className="text-sm font-semibold text-[#4f6d87]">Product Images</h4>
            <p className="text-[11px] text-[#8ea1b4]">
              Upload up to 5 images (JPG or PNG, max 5MB each). First image will be the main product
              image.
            </p>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-5">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index}>
                  <p className="mb-1 text-[10px] text-[#8ea1b4]">
                    {index === 0 ? "Main image" : `Image ${index + 1}`}
                  </p>
                  <button
                    type="button"
                    className="flex h-18 w-full flex-col items-center justify-center rounded-md border border-[#d6e2ef] bg-[#fbfdff] text-[#93a8bc]"
                  >
                    <Upload className="h-4 w-4" />
                    <span className="mt-1 text-[10px]">Upload</span>
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h4 className="text-sm font-semibold text-[#4f6d87]">Pricing & Inventory</h4>
            <div className="grid gap-2 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-[11px] font-medium text-[#6f859b]">
                  Price (€) *
                </label>
                <input
                  value={draft.price}
                  onChange={(e) => setDraft((prev) => ({ ...prev, price: e.target.value }))}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-medium text-[#6f859b]">
                  Stock Quantity *
                </label>
                <input
                  value={draft.stock}
                  onChange={(e) => setDraft((prev) => ({ ...prev, stock: e.target.value }))}
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h4 className="text-sm font-semibold text-[#4f6d87]">Shipping</h4>
            <div className={shippingVariants.length === 2 ? "grid gap-2 md:grid-cols-2" : ""}>
              <div>
                <label className="mb-1 block text-[11px] font-medium text-[#6f859b]">
                  Shipping Type *
                </label>
                <select
                  value={draft.shippingType}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, shippingType: e.target.value as ShippingType }))
                  }
                  className={inputClass}
                >
                  {shippingVariants.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {draft.shippingType === "Paid" && (
                <div>
                  <label className="mb-1 block text-[11px] font-medium text-[#6f859b]">
                    Shipping Price (€) *
                  </label>
                  <input
                    value={draft.shippingPrice}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, shippingPrice: e.target.value }))
                    }
                    className={inputClass}
                  />
                </div>
              )}
            </div>
          </section>

          <section className="space-y-3">
            <h4 className="text-sm font-semibold text-[#4f6d87]">Product Status</h4>
            <div>
              <label className="mb-1 block text-[11px] font-medium text-[#6f859b]">Status *</label>
              <select
                value={draft.status}
                onChange={(e) =>
                  setDraft((prev) => ({
                    ...prev,
                    status: e.target.value as MarketplaceProduct["status"],
                  }))
                }
                className={inputClass}
              >
                <option value="Active">Active</option>
                <option value="Hidden">Hidden</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </section>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-[#e6edf5] px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-[#dce7f2] px-3 py-1.5 text-xs text-[#6f8194] hover:bg-[#f5f9fd]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onCreate({
                name: draft.name || "New Product",
                category: draft.category || "Stationery",
                sku: draft.sku || "NEW-PROD-001",
                description: draft.description || "",
                price: Number(draft.price || 0),
                stock: Number(draft.stock || 0),
                status: Number(draft.stock || 0) === 0 ? "Out of Stock" : draft.status,
                shippingType: draft.shippingType,
                shippingPrice: draft.shippingType === "Paid" ? Number(draft.shippingPrice || 0) : 0,
              });
              onClose();
            }}
            className="rounded-md bg-[#57a9e7] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#4998d5]"
          >
            Create Product
          </button>
        </div>
      </div>
    </div>
  );
}
