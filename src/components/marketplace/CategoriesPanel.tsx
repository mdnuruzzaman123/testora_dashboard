"use client";

import type { MarketplaceCategory } from "@/lib/marketplace-data";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export default function CategoriesPanel({ categories }: { categories: MarketplaceCategory[] }) {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<string | null>(null);

  const handleAddCategoryToggle = () => {
    if (showCategoryForm && editingCategory === null) {
      setShowCategoryForm(false);
      setCategoryName("");
      return;
    }

    setEditingCategory(null);
    setCategoryName("");
    setShowCategoryForm(true);
  };

  const handleEditToggle = (name: string) => {
    if (showCategoryForm && editingCategory === name) {
      setShowCategoryForm(false);
      setEditingCategory(null);
      setCategoryName("");
      return;
    }

    setEditingCategory(name);
    setCategoryName(name);
    setShowCategoryForm(true);
  };

  const handleCancel = () => {
    setShowCategoryForm(false);
    setEditingCategory(null);
    setCategoryName("");
  };

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[#3f5f7a]">Product Categories</h3>
          <p className="text-xs text-[#8ea1b4]">Manage product category structure</p>
        </div>
        <button
          type="button"
          onClick={handleAddCategoryToggle}
          className="rounded-md bg-[#57a9e7] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#4998d5]"
        >
          {showCategoryForm && editingCategory === null ? "Hide Form" : "+ Add Category"}
        </button>
      </div>

      {showCategoryForm ? (
        <section className="rounded-lg border border-[#dce7f2] bg-white p-3">
          <h4 className="text-xs font-medium text-[#3f5f7a]">
            {editingCategory ? "Edit Category" : "Add New Category"}
          </h4>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <input
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
              placeholder="Category name"
              className="h-8 min-w-56 flex-1 rounded-md border border-[#dce7f2] bg-white px-3 text-xs text-[#587189] outline-none placeholder:text-[#a3b2c0]"
            />
            <button
              type="button"
              className="rounded-md bg-[#57a9e7] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#4998d5]"
            >
              {editingCategory ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-md border border-[#dce7f2] bg-white px-3 py-1.5 text-xs font-medium text-[#5f7388] hover:bg-[#f7fbff]"
            >
              Cancel
            </button>
          </div>
        </section>
      ) : null}

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
                      <button
                        type="button"
                        onClick={() => handleEditToggle(category.name)}
                        className="text-[#3571d5]"
                      >
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
