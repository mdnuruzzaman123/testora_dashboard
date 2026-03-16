import { articles } from "@/lib/blog-data";
import ArticlePreviewPage from "@/components/blog/preview/ArticlePreviewPage";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PreviewArticlePage({ params }: Props) {
  const { id } = await params;
  const article = articles.find((a) => a.id === id);
  if (!article) notFound();
  return (
    <div className="px-6 py-4">
      <ArticlePreviewPage article={article} />
    </div>
  );
}
