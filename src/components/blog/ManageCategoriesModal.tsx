"use client";

import { BLOG_CATEGORIES, type Article } from "@/lib/blog-data";
import { Pencil, Plus, Tag, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";

type Props = {
  open: boolean;
  articles: Article[];
  onClose: () => void;
};

export default function ManageCategoriesModal({ open, articles, onClose }: Props) {
  const [newCategory, setNewCategory] = useState("");

  const categories = useMemo(() => {
    return BLOG_CATEGORIES.map((name) => {
      const slug = name.toLowerCase().replace(/\s+/g, "-");
      const count = articles.filter((a) => a.category === name).length;
      return { name, slug, count };
    });
  }, [articles]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2d4056]/32 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-[#dce7f2] bg-white">
        <div className="flex items-start justify-between border-b border-[#e6edf5] px-5 py-4">
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-md bg-[#eef4fd] text-[#4b92d9]">
              <Tag className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#2f3f52]">Manage Categories</h3>
              <p className="text-sm text-[#8ea1b4]">Create, edit, and organize blog categories</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-[#8ea1b5] hover:bg-[#f4f8fc]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3 px-5 py-4">
          <div>
            <p className="mb-2 text-xs font-semibold tracking-wide text-[#90a2b5] uppercase">
              Add New Category
            </p>
            <div className="flex gap-2">
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Category name..."
                className="h-9 flex-1 rounded-md border border-[#dce7f2] bg-[#f8fbff] px-3 text-sm text-[#4f6d87] outline-none"
              />
              <button
                type="button"
                className="inline-flex h-9 items-center gap-1 rounded-md bg-[#8db0f0] px-3 text-sm font-semibold text-white"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>
          </div>

          <div className="max-h-105 space-y-2 overflow-y-auto pr-1">
            {categories.map((category) => (
              <div
                key={category.name}
                className="flex items-center justify-between rounded-xl border border-[#dce7f2] px-3 py-2.5"
              >
                <div>
                  <p className="font-medium text-[#4f6d87]">{category.name}</p>
                  <p className="text-xs text-[#90a2b5]">
                    /{category.slug} · {category.count} article{category.count !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[#8ea1b4]">
                  <button type="button" className="rounded p-1 hover:bg-[#f4f8fc]">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" className="rounded p-1 hover:bg-[#f4f8fc]">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#e6edf5] px-5 py-3">
          <p className="text-xs text-[#8ea1b4]">{categories.length} categories total</p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-[#111f39] px-4 py-2 text-sm font-semibold text-white"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
