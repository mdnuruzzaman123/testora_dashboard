// ─── Types ────────────────────────────────────────────────────────────────────

export type ArticleStatus = "Published" | "Draft" | "Hidden" | "Archived";
export type ArticleCategory =
  | "Entrance Exams"
  | "Matura"
  | "Study Tips"
  | "Platform Updates"
  | "Semimatura"
  | "University Preparation";

export type Article = {
  id: string;
  title: string;
  slug: string;
  readTime: string;
  category: ArticleCategory;
  status: ArticleStatus;
  publishDate: string | null;
  views: number | null;
  thumbnailUrl: string | null;
  content: string;
  excerpt: string;
};

// ─── Mock articles ────────────────────────────────────────────────────────────

export const articles: Article[] = [
  {
    id: "1",
    title: "Medicine Entrance Exam: A Complete Guide",
    slug: "/blog/medicine-entrance-exam-a-complete-guide",
    readTime: "8 min",
    category: "Entrance Exams",
    status: "Draft",
    publishDate: "Mar 15, 2026",
    views: null,
    thumbnailUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=80&h=60&fit=crop",
    content:
      "Preparing for Medicine Entrance\n\nGetting into a medical program requires dedicated preparation and a strong understanding of biology, chemistry, and physics.",
    excerpt: "Your complete guide to preparing for the Medicine entrance exam — topics covered, scoring, and study plan.",
  },
  {
    id: "2",
    title: "How to Prepare for the Matura Exam",
    slug: "/blog/how-to-prepare-for-the-matura",
    readTime: "5 min",
    category: "Matura",
    status: "Published",
    publishDate: "Mar 10, 2026",
    views: 1240,
    thumbnailUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=80&h=60&fit=crop",
    content: "Complete Matura preparation strategy for Albanian students.",
    excerpt: "Everything you need to know about the Matura exam format, scoring, and top study strategies.",
  },
  {
    id: "3",
    title: "Top 10 Study Tips for Entrance Exam Success",
    slug: "/blog/top-10-study-tips-entrance-exam",
    readTime: "4 min",
    category: "Study Tips",
    status: "Published",
    publishDate: "Mar 5, 2026",
    views: 892,
    thumbnailUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=80&h=60&fit=crop",
    content: "Ten proven study techniques to maximise your exam performance.",
    excerpt: "Boost your exam scores with these research-backed study techniques used by top students.",
  },
  {
    id: "4",
    title: "Testora Platform Update — Spring 2026",
    slug: "/blog/testora-platform-update-sp",
    readTime: "2 min",
    category: "Platform Updates",
    status: "Published",
    publishDate: "Mar 1, 2026",
    views: 456,
    thumbnailUrl: null,
    content: "Spring 2026 platform improvements and new features.",
    excerpt: "New features released in the Spring 2026 update: improved question bank, faster navigation, and more.",
  },
  {
    id: "5",
    title: "Everything You Need to Know About Semimatur",
    slug: "/blog/everything-you-need-to-know",
    readTime: "7 min",
    category: "Semimatura",
    status: "Published",
    publishDate: "Feb 28, 2026",
    views: 2145,
    thumbnailUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=80&h=60&fit=crop",
    content: "Complete guide to the Semimatura exam.",
    excerpt: "All the details about Semimatura — what topics are covered, how the scoring works, and how to prepare.",
  },
  {
    id: "6",
    title: "University Preparation: First Steps for Year 12 St",
    slug: "/blog/university-preparation-first-steps",
    readTime: "6 min",
    category: "University Preparation",
    status: "Hidden",
    publishDate: "Feb 20, 2026",
    views: 187,
    thumbnailUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=80&h=60&fit=crop",
    content: "Starting your university preparation journey early makes a huge difference.",
    excerpt: "A step-by-step roadmap for Year 12 students preparing for university entrance exams.",
  },
  {
    id: "7",
    title: "Matura 2025 Results Analysis",
    slug: "/blog/matura-2025-results-analysis",
    readTime: "6 min",
    category: "Matura",
    status: "Archived",
    publishDate: "Sep 15, 2025",
    views: 3210,
    thumbnailUrl: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=80&h=60&fit=crop",
    content: "Full analysis of the 2025 Matura exam results.",
    excerpt: "Detailed breakdown of Matura 2025 results — national averages, subject trends, and implications.",
  },
];

// ─── Summary stats ────────────────────────────────────────────────────────────

export const blogStats = {
  totalArticles: 7,
  published: 4,
  drafts: 1,
  archived: 1,
  totalViews: 8130,
  categoryViews: [
    { label: "Study Tips", views: 892 },
    { label: "Exam Guides", views: 0 },
    { label: "Semimatura", views: 2145 },
  ],
};

// ─── Categories ───────────────────────────────────────────────────────────────

export const BLOG_CATEGORIES: ArticleCategory[] = [
  "Entrance Exams",
  "Matura",
  "Study Tips",
  "Platform Updates",
  "Semimatura",
  "University Preparation",
];
