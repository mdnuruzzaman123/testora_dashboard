// ─── Category types ───────────────────────────────────────────────────────────

export const QUESTION_CATEGORIES = ["Entrance Exam", "Semimatura", "Matura"] as const;
export type QuestionCategory = (typeof QUESTION_CATEGORIES)[number];

/**
 * Determines which classification field variant to render.
 * - "entrance"  → Category, Year, Faculty, Department, Test Type, Access, Order, Passage
 * - "standard"  → Category, Year, Subject, Test Type, Access, Order, Passage
 * - "province"  → Category, Year, Core Subject, Elective Subject, Subject, Test Type, Access, Order, Passage
 */
export function getClassificationVariant(category: string): "entrance" | "standard" | "province" {
  if (category === "Entrance Exam") return "entrance";
  if (category === "Matura") return "province";
  return "standard";
}

// ─── Dropdown options ─────────────────────────────────────────────────────────

export const QUESTION_YEARS = ["2020", "2021", "2022", "2023", "2024", "2025", "2026"] as const;

export const FACULTIES = [
  "Medicine",
  "Engineering",
  "Law",
  "Economics",
  "Architecture",
  "Natural Sciences",
] as const;

export const DEPARTMENTS_BY_FACULTY: Record<string, string[]> = {
  Medicine: ["General Medicine", "Dentistry", "Pharmacy", "Nursing"],
  Engineering: ["Computer Science", "Civil Engineering", "Electrical", "Mechanical"],
  Law: ["Public Law", "Private Law", "Criminal Law"],
  Economics: ["Finance", "Management", "Accounting", "Marketing"],
  Architecture: ["Urban Design", "Landscape", "Interior Design"],
  "Natural Sciences": ["Biology", "Chemistry", "Physics", "Mathematics"],
};

export const SUBJECTS = [
  "Albanian Language",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English Language",
  "French Language",
  "History",
  "Geography",
  "Literature",
  "Computer Science",
  "Art",
  "Physical Education",
] as const;

export const CORE_SUBJECTS = [
  "Albanian Language",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Literature",
] as const;

export const ELECTIVE_SUBJECTS = [
  "English Language",
  "French Language",
  "German Language",
  "Art",
  "Music",
  "Physical Education",
  "Computer Science",
  "Economics",
] as const;

export const TEST_TYPES = ["Official", "Additional", "Full Simulation"] as const;

export const ACCESS_OPTIONS = ["Free", "Premium"] as const;

export const QUESTION_STATUSES = ["Published", "Draft", "Hidden", "Archived"] as const;
export type QuestionStatus = (typeof QUESTION_STATUSES)[number];

// ─── Question Bank sample data ────────────────────────────────────────────────

export type QuestionRow = {
  id: string;
  category: string;
  year: string;
  subject: string;
  faculty: string;
  dept: string;
  type: string;
  access: string;
  order: string;
  passage: string;
  text: string;
  correct: string;
  status: QuestionStatus;
};

export const questionBankRows: QuestionRow[] = [
  {
    id: "Q-001",
    category: "Semimatura",
    year: "2025",
    subject: "Mathematics",
    faculty: "—",
    dept: "—",
    type: "Official",
    access: "Free",
    order: "A1",
    passage: "—",
    text: "What is the derivative of x²?",
    correct: "B",
    status: "Published",
  },
  {
    id: "Q-002",
    category: "Semimatura",
    year: "2025",
    subject: "Mathematics",
    faculty: "—",
    dept: "—",
    type: "Official",
    access: "Free",
    order: "A2",
    passage: "—",
    text: "Solve the equation: 2x + 5 = 1",
    correct: "A",
    status: "Published",
  },
  {
    id: "Q-003",
    category: "Semimatura",
    year: "2025",
    subject: "Albanian",
    faculty: "—",
    dept: "—",
    type: "Official",
    access: "Premium",
    order: "A3",
    passage: "PSG-01",
    text: "Based on the passage, what is...",
    correct: "C",
    status: "Published",
  },
  {
    id: "Q-004",
    category: "Entrance Exam",
    year: "2024",
    subject: "—",
    faculty: "Medicine",
    dept: "General Med",
    type: "Official",
    access: "Premium",
    order: "A1",
    passage: "—",
    text: "Which organ produces insulin?",
    correct: "D",
    status: "Published",
  },
  {
    id: "Q-005",
    category: "Matura",
    year: "2023",
    subject: "Physics",
    faculty: "—",
    dept: "—",
    type: "Additional",
    access: "Free",
    order: "A5",
    passage: "—",
    text: "Calculate the velocity of an object",
    correct: "A",
    status: "Draft",
  },
  {
    id: "Q-006",
    category: "Entrance Exam",
    year: "2024",
    subject: "—",
    faculty: "Engineering",
    dept: "CS",
    type: "Official",
    access: "Free",
    order: "A6",
    passage: "—",
    text: "What is the binary representation?",
    correct: "B",
    status: "Published",
  },
  {
    id: "Q-007",
    category: "Semimatura",
    year: "2024",
    subject: "English",
    faculty: "—",
    dept: "—",
    type: "Official",
    access: "Free",
    order: "A8",
    passage: "PSG-02",
    text: "According to the text, what is...",
    correct: "C",
    status: "Hidden",
  },
  {
    id: "Q-008",
    category: "Matura",
    year: "2023",
    subject: "Chemistry",
    faculty: "—",
    dept: "—",
    type: "Official",
    access: "Premium",
    order: "A12",
    passage: "—",
    text: "What is the molecular formula?",
    correct: "A",
    status: "Published",
  },
];
