"use client";

import { Camera, Calendar, Clock, Hash, User } from "lucide-react";
import { type Article } from "@/lib/blog-data";
import { categoryBadgeClass } from "@/components/blog/BlogBadges";

type Props = {
  article: Article;
};

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function ArticlePreviewPage({ article }: Props) {
  return (
    <div className="mx-auto max-w-3xl py-6">
      {/* Category badge */}
      <div className="mb-3">
        <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${categoryBadgeClass(article.category)}`}>
          {article.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="mb-4 text-3xl font-bold leading-tight text-[#2b4560]">
        {article.title}
      </h1>

      {/* Meta row */}
      <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#587189]">
        <span className="flex items-center gap-1">
          <User className="h-3.5 w-3.5 text-[#4a93d9]" />
          Testora Team
        </span>
        {article.publishDate && (
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-[#4a93d9]" />
            {formatDate(article.publishDate)}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-[#4a93d9]" />
          {article.readTime}
        </span>
        <span className="flex items-center gap-1">
          <Hash className="h-3.5 w-3.5 text-[#4a93d9]" />
          {/* approximate word count */}
          {article.content ? article.content.trim().split(/\s+/).filter(Boolean).length : 0} words
        </span>
      </div>

      <hr className="mb-5 border-[#e2eaf2]" />

      {/* Hero image */}
      {article.thumbnailUrl ? (
        <div className="mb-6 overflow-hidden rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.thumbnailUrl}
            alt={article.title}
            className="h-64 w-full object-cover"
          />
        </div>
      ) : (
        <div className="mb-6 flex h-48 w-full items-center justify-center rounded-lg bg-[#f3f7fb]">
          <Camera className="h-10 w-10 text-[#c5d4e2]" />
        </div>
      )}

      {/* Content */}
      <div className="prose prose-sm max-w-none text-[#3f5f7a]">
        {article.content ? (
          <div className="whitespace-pre-wrap leading-relaxed text-sm text-[#3f5f7a]">
            {article.content}
          </div>
        ) : (
          <p className="text-[#90a3b6] italic">No content yet.</p>
        )}
      </div>

      {/* SEO Preview block */}
      {(article.title || article.excerpt) && (
        <div className="mt-10 rounded-lg border border-[#dce7f2] bg-[#f8fbff] p-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-[#90a3b6]">
            SEO Preview (Google)
          </p>
          <div className="max-w-md">
            <p className="text-xs text-[#3b7abf]">
              testora.app › blog › {article.slug || "article-slug"}
            </p>
            <p className="mt-0.5 text-base font-semibold text-[#1a4c8b] leading-snug">
              {article.title}
            </p>
            {article.excerpt && (
              <p className="mt-1 text-xs text-[#3d3d3d] leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
