import {
  BookOpenText,
  ClipboardCheck,
  FilePenLine,
  Newspaper,
  ShoppingBag,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";

export const dashboardYears = [2024, 2025, 2026] as const;
export type DashboardYear = (typeof dashboardYears)[number];

export type DashboardStat = {
  label: string;
  value: string;
};

export type RecentUser = {
  id: string;
  name: string;
  email: string;
  initials: string;
  category: "Matura" | "Semimatura" | "Entrance Exams";
  activePlan: string;
  lastActivity: string;
  joinedDate: string;
  status: "Active" | "Suspended";
};

export type ContentMetric = {
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
};

export type ContentAlert = {
  id: string;
  title: string;
  description: string;
  count: number;
  variant: "warning" | "error" | "info";
};

export type MonthlyUserPoint = {
  month: string;
  users: number;
};

export type ProductPoint = {
  label: string;
  value: number;
  color?: string;
};

export type CategorySharePoint = {
  label: string;
  value: number;
  color: string;
};

export type SalesBreakdown = {
  label: string;
  amount: string;
  users: string;
  change: string;
};

export const dashboardStats: DashboardStat[] = [
  { label: "Total Users", value: "12,456" },
  { label: "Active Users", value: "8,234" },
  { label: "Inactive Users (30 Days)", value: "4,222" },
  { label: "Premium Users", value: "2,845" },
];

export const monthlyUserGrowthByYear: Record<DashboardYear, MonthlyUserPoint[]> = {
  2024: [
    { month: "Jan", users: 58 },
    { month: "Feb", users: 55 },
    { month: "Mar", users: 57 },
    { month: "Apr", users: 60 },
    { month: "May", users: 61 },
    { month: "Jun", users: 62 },
    { month: "Jul", users: 64 },
    { month: "Aug", users: 66 },
    { month: "Sep", users: 67 },
    { month: "Oct", users: 71 },
    { month: "Nov", users: 74 },
    { month: "Dec", users: 78 },
  ],
  2025: [
    { month: "Jan", users: 70 },
    { month: "Feb", users: 66 },
    { month: "Mar", users: 63 },
    { month: "Apr", users: 65 },
    { month: "May", users: 68 },
    { month: "Jun", users: 71 },
    { month: "Jul", users: 73 },
    { month: "Aug", users: 75 },
    { month: "Sep", users: 76 },
    { month: "Oct", users: 79 },
    { month: "Nov", users: 84 },
    { month: "Dec", users: 88 },
  ],
  2026: [
    { month: "Jan", users: 84 },
    { month: "Feb", users: 71 },
    { month: "Mar", users: 66 },
    { month: "Apr", users: 63 },
    { month: "May", users: 67 },
    { month: "Jun", users: 69 },
    { month: "Jul", users: 71 },
    { month: "Aug", users: 75 },
    { month: "Sep", users: 75 },
    { month: "Oct", users: 76 },
    { month: "Nov", users: 86 },
    { month: "Dec", users: 92 },
  ],
};

export const premiumByProductByYear: Record<DashboardYear, ProductPoint[]> = {
  2024: [
    { label: "Matura", value: 2820, color: "#4d96d8" },
    { label: "Medicine", value: 1940, color: "#8fbde5" },
    { label: "Law", value: 1430, color: "#8fbde5" },
    { label: "Economics", value: 1300, color: "#8fbde5" },
    { label: "Semimatura", value: 1180, color: "#8fbde5" },
    { label: "Other Focuses", value: 900, color: "#8fbde5" },
    { label: "Architecture", value: 510, color: "#8fbde5" },
  ],
  2025: [
    { label: "Matura", value: 3180, color: "#4d96d8" },
    { label: "Medicine", value: 2230, color: "#8fbde5" },
    { label: "Law", value: 1610, color: "#8fbde5" },
    { label: "Economics", value: 1470, color: "#8fbde5" },
    { label: "Semimatura", value: 1320, color: "#8fbde5" },
    { label: "Other Focuses", value: 1030, color: "#8fbde5" },
    { label: "Architecture", value: 620, color: "#8fbde5" },
  ],
  2026: [
    { label: "Matura", value: 3480, color: "#4d96d8" },
    { label: "Medicine", value: 2450, color: "#8fbde5" },
    { label: "Law", value: 1740, color: "#8fbde5" },
    { label: "Economics", value: 1560, color: "#8fbde5" },
    { label: "Semimatura", value: 1420, color: "#8fbde5" },
    { label: "Other Focuses", value: 1120, color: "#8fbde5" },
    { label: "Architecture", value: 680, color: "#8fbde5" },
  ],
};

export const premiumHighlightsByYear: Record<
  DashboardYear,
  Array<{ title: string; value: string; sub: string }>
> = {
  2024: [
    { title: "Top Product", value: "Matura", sub: "2,820 users" },
    { title: "Fastest Growing", value: "Medicine", sub: "+14.1% YoY" },
    { title: "Latest Accepted", value: "Law", sub: "53 new users" },
  ],
  2025: [
    { title: "Top Product", value: "Matura", sub: "3,180 users" },
    { title: "Fastest Growing", value: "Medicine", sub: "+16.7% YoY" },
    { title: "Latest Accepted", value: "Law", sub: "58 new users" },
  ],
  2026: [
    { title: "Top Product", value: "Matura", sub: "3,480 users" },
    { title: "Fastest Growing", value: "Medicine", sub: "+18.2% this year" },
    { title: "Latest Accepted", value: "Law", sub: "65 new users" },
  ],
};

export const categoryShareByYear: Record<DashboardYear, CategorySharePoint[]> = {
  2024: [
    { label: "Entrance Exams", value: 6200, color: "#2f86d8" },
    { label: "Matura", value: 3250, color: "#84b8e8" },
    { label: "Semimatura", value: 1190, color: "#d4e5f7" },
  ],
  2025: [
    { label: "Entrance Exams", value: 7040, color: "#2f86d8" },
    { label: "Matura", value: 3590, color: "#84b8e8" },
    { label: "Semimatura", value: 1330, color: "#d4e5f7" },
  ],
  2026: [
    { label: "Entrance Exams", value: 7800, color: "#2f86d8" },
    { label: "Matura", value: 3810, color: "#84b8e8" },
    { label: "Semimatura", value: 1420, color: "#d4e5f7" },
  ],
};

export const salesBreakdownByYear: Record<DashboardYear, SalesBreakdown[]> = {
  2024: [
    { label: "Matura", amount: "$20,490", users: "2,820", change: "+12.2%" },
    { label: "Medicine", amount: "$14,930", users: "1,940", change: "+10.4%" },
    { label: "Law", amount: "$10,490", users: "1,430", change: "+9.0%" },
    { label: "Economics", amount: "$9,280", users: "1,300", change: "+8.5%" },
    { label: "Semimatura", amount: "$8,240", users: "1,180", change: "+7.6%" },
    { label: "Other Focuses", amount: "$5,430", users: "900", change: "+6.3%" },
    { label: "Architecture", amount: "$4,320", users: "510", change: "+5.2%" },
  ],
  2025: [
    { label: "Matura", amount: "$22,760", users: "3,180", change: "+17.9%" },
    { label: "Medicine", amount: "$16,880", users: "2,230", change: "+14.8%" },
    { label: "Law", amount: "$11,540", users: "1,610", change: "+12.0%" },
    { label: "Economics", amount: "$10,260", users: "1,470", change: "+10.6%" },
    { label: "Semimatura", amount: "$9,060", users: "1,320", change: "+9.4%" },
    { label: "Other Focuses", amount: "$6,120", users: "1,030", change: "+8.2%" },
    { label: "Architecture", amount: "$4,820", users: "620", change: "+7.0%" },
  ],
  2026: [
    { label: "Matura", amount: "$24,840", users: "3,480", change: "+22.3%" },
    { label: "Medicine", amount: "$18,750", users: "2,450", change: "+18.1%" },
    { label: "Law", amount: "$12,120", users: "1,740", change: "+14.4%" },
    { label: "Economics", amount: "$11,410", users: "1,560", change: "+11.9%" },
    { label: "Semimatura", amount: "$9,890", users: "1,420", change: "+10.6%" },
    { label: "Other Focuses", amount: "$6,950", users: "1,120", change: "+8.1%" },
    { label: "Architecture", amount: "$5,141", users: "680", change: "+7.1%" },
  ],
};

export const recentUsers: RecentUser[] = [
  {
    id: "u1",
    name: "Tony Stark",
    email: "stark@example.com",
    initials: "TS",
    category: "Matura",
    activePlan: "Matura Pack",
    lastActivity: "Feb 15, 2026",
    joinedDate: "Feb 15, 2026",
    status: "Active",
  },
  {
    id: "u2",
    name: "Tony Stark",
    email: "stark@example.com",
    initials: "TS",
    category: "Semimatura",
    activePlan: "Semimatura Pack",
    lastActivity: "Feb 15, 2026",
    joinedDate: "Feb 15, 2026",
    status: "Suspended",
  },
  {
    id: "u3",
    name: "Tony Stark",
    email: "stark@example.com",
    initials: "TS",
    category: "Matura",
    activePlan: "Free",
    lastActivity: "Feb 15, 2026",
    joinedDate: "Feb 15, 2026",
    status: "Active",
  },
  {
    id: "u4",
    name: "Tony Stark",
    email: "stark@example.com",
    initials: "TS",
    category: "Entrance Exams",
    activePlan: "Medicine Entrance",
    lastActivity: "Feb 15, 2026",
    joinedDate: "Feb 15, 2026",
    status: "Suspended",
  },
  {
    id: "u5",
    name: "Tony Stark",
    email: "stark@example.com",
    initials: "TS",
    category: "Entrance Exams",
    activePlan: "Medicine Entrance",
    lastActivity: "Feb 15, 2026",
    joinedDate: "Feb 15, 2026",
    status: "Suspended",
  },
  {
    id: "u6",
    name: "Tony Stark",
    email: "stark@example.com",
    initials: "TS",
    category: "Entrance Exams",
    activePlan: "Free",
    lastActivity: "Feb 15, 2026",
    joinedDate: "Feb 15, 2026",
    status: "Suspended",
  },
];

export const contentMetrics: ContentMetric[] = [
  { label: "Total Questions", value: "8,642", delta: "+520 this month", icon: BookOpenText },
  { label: "Total Tests", value: "246", delta: "+12 new tests", icon: ClipboardCheck },
  { label: "Draft Questions", value: "184", delta: "+42 pending review", icon: FilePenLine },
  { label: "Blog Posts", value: "67", delta: "+5 this week", icon: Newspaper },
  { label: "Marketplace Products", value: "38", delta: "+3 new listings", icon: ShoppingBag },
];

export const contentAlerts: ContentAlert[] = [
  {
    id: "a1",
    title: "Draft questions pending",
    description: "42 questions waiting for review and approval",
    count: 42,
    variant: "warning",
  },
  {
    id: "a2",
    title: "Tests missing question",
    description: "5 tests have fewer than the required minimum questions",
    count: 5,
    variant: "error",
  },
  {
    id: "a3",
    title: "Orders requiring attention",
    description: "8 marketplace orders need manual confirmation",
    count: 8,
    variant: "warning",
  },
  {
    id: "a4",
    title: "Expiring subscription",
    description: "124 subscriptions expire within the next 7 days",
    count: 124,
    variant: "info",
  },
  {
    id: "a5",
    title: "Unpublished blog post",
    description: "3 draft posts are ready to be published",
    count: 3,
    variant: "info",
  },
];

export const alertIcon = TriangleAlert;
