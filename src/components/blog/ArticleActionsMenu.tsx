"use client";

import { type ArticleStatus } from "@/lib/blog-data";
import { cn } from "@/lib/utils";
import { Copy, Eye, Pencil, Trash2, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = {
  articleId: string;
  onStatusChange: (id: string, status: ArticleStatus) => void;
  onDelete: (id: string) => void;
};

export default function ArticleActionsMenu({ articleId, onStatusChange, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded p-1 text-[#9ab0c3] hover:bg-[#f3f7fb] hover:text-[#3f5f7a]"
        aria-label="Article actions"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-44 rounded-lg border border-[#dce7f2] bg-white py-1">
          <Link
            href={`/blog/${articleId}/edit`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-xs text-[#3f5f7a] hover:bg-[#f3f7fb]"
          >
            <Pencil className="h-3.5 w-3.5 text-[#9ab0c3]" />
            Edit
          </Link>
          <Link
            href={`/blog/${articleId}/preview`}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-xs text-[#3f5f7a] hover:bg-[#f3f7fb]"
          >
            <Eye className="h-3.5 w-3.5 text-[#9ab0c3]" />
            Preview
          </Link>
          <button
            type="button"
            onClick={() => { setOpen(false); }}
            className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#3f5f7a] hover:bg-[#f3f7fb]"
          >
            <Copy className="h-3.5 w-3.5 text-[#9ab0c3]" />
            Duplicate
          </button>

          {/* Divider + status change */}
          <div className="my-1 border-t border-[#ecf2f8]" />
          <p className="px-3 py-1 text-[10px] font-semibold tracking-wide text-[#90a3b6] uppercase">
            Change Status
          </p>
          {(["Published", "Hidden", "Archived"] as ArticleStatus[]).map((s) => {
            const dotColors: Record<ArticleStatus, string> = {
              Published: "bg-[#3ea666]",
              Hidden:    "bg-[#d97a2a]",
              Archived:  "bg-[#90a3b6]",
              Draft:     "bg-[#c48a2e]",
            };
            return (
              <button
                key={s}
                type="button"
                onClick={() => { onStatusChange(articleId, s); setOpen(false); }}
                className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#3f5f7a] hover:bg-[#f3f7fb]"
              >
                <span className={cn("h-2 w-2 rounded-full", dotColors[s])} />
                Mark as {s}
              </button>
            );
          })}

          {/* Divider + delete */}
          <div className="my-1 border-t border-[#ecf2f8]" />
          <button
            type="button"
            onClick={() => { onDelete(articleId); setOpen(false); }}
            className="flex w-full items-center gap-2 px-3 py-2 text-xs text-[#db6f6f] hover:bg-[#fdf5f5]"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
