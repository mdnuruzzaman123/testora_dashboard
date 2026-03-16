import {
  BookOpenText,
  ClipboardCheck,
  FilePenLine,
  Newspaper,
  ShoppingBag,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";

export type DashboardStat = {
  label: string;
  value: string;
  note?: string;
};

export type ProductBar = {
  label: string;
  value: number;
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

export type CategoryShare = {
  label: string;
  value: number;
  colorClass: string;
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

export const monthlyUserGrowth = [84, 71, 66, 63, 67, 69, 71, 75, 75, 76, 86, 92];

export const premiumByProduct: ProductBar[] = [
  { label: "Matura", value: 3480 },
  { label: "Medicine", value: 2450 },
  { label: "Law", value: 1740 },
  { label: "Economics", value: 1560 },
  { label: "Semimatura", value: 1420 },
  { label: "Other Focuses", value: 1120 },
  { label: "Architecture", value: 680 },
];

export const premiumHighlights = [
  { title: "Top Product", value: "Matura", sub: "3,480 users" },
  { title: "Fastest Growing", value: "Medicine", sub: "+18.2% this month" },
  { title: "Latest Accepted", value: "Law", sub: "65 new users" },
];

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

export const categoryShare: CategoryShare[] = [
  { label: "Entrance Exams", value: 7800, colorClass: "bg-[#2f86d8]" },
  { label: "Matura", value: 3810, colorClass: "bg-[#84b8e8]" },
  { label: "Semimatura", value: 1420, colorClass: "bg-[#d4e5f7]" },
];

export const salesBreakdown: SalesBreakdown[] = [
  { label: "Matura", amount: "$24,840", users: "3,480", change: "+22.3%" },
  { label: "Medicine", amount: "$18,750", users: "2,450", change: "+18.1%" },
  { label: "Law", amount: "$12,120", users: "1,740", change: "+14.4%" },
  { label: "Economics", amount: "$11,410", users: "1,560", change: "+11.9%" },
  { label: "Semimatura", amount: "$9,890", users: "1,420", change: "+10.6%" },
  { label: "Other Focuses", amount: "$6,950", users: "1,120", change: "+8.1%" },
  { label: "Architecture", amount: "$5,141", users: "680", change: "+7.1%" },
];

export const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const alertIcon = TriangleAlert;
