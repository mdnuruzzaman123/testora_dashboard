export type TestArchiveStatus = "Published" | "Draft" | "Hidden";

export type TestArchiveRow = {
  id: string;
  title: string;
  category: "Semimatura" | "Matura" | "Entrance Exam";
  year: string;
  subjectCategory: string;
  type: "Official" | "Additional";
  access: "Free" | "Premium";
  questions: number;
  status: TestArchiveStatus;
};

export const testArchiveRows: TestArchiveRow[] = [
  {
    id: "T-001",
    title: "Semi-Matura 2025 - Mathematics",
    category: "Semimatura",
    year: "2025",
    subjectCategory: "Mathematics",
    type: "Official",
    access: "Free",
    questions: 100,
    status: "Published",
  },
  {
    id: "T-002",
    title: "Matura 2024 - Medicine",
    category: "Matura",
    year: "2024",
    subjectCategory: "Albanian",
    type: "Official",
    access: "Free",
    questions: 100,
    status: "Published",
  },
  {
    id: "T-003",
    title: "Entrance Exam 2024 - Medicine",
    category: "Entrance Exam",
    year: "2024",
    subjectCategory: "Medicine",
    type: "Official",
    access: "Premium",
    questions: 80,
    status: "Published",
  },
  {
    id: "T-004",
    title: "Matura 2025 - Physics (Additional)",
    category: "Matura",
    year: "2025",
    subjectCategory: "Physics",
    type: "Additional",
    access: "Free",
    questions: 90,
    status: "Draft",
  },
  {
    id: "T-005",
    title: "Entrance Exam 2024 - Engineering",
    category: "Entrance Exam",
    year: "2024",
    subjectCategory: "Engineering",
    type: "Official",
    access: "Premium",
    questions: 60,
    status: "Published",
  },
  {
    id: "T-006",
    title: "Semi-Matura 2024 - English",
    category: "Semimatura",
    year: "2024",
    subjectCategory: "English",
    type: "Official",
    access: "Free",
    questions: 100,
    status: "Published",
  },
];

export const archiveInfoBullets = [
  "In each archived test, the system stores an ordered list of question IDs linked from the Question Bank.",
  "One question can appear in multiple different tests.",
  "Updates in Question Bank propagate to all linked structures.",
];

export const duplicateToolCards = [
  {
    title: "Copy Questions from Previous Year",
    description: "Use this to create next-year versions in a few clicks.",
    color: "blue",
  },
  {
    title: "Copy Passage Group",
    description: "Clone passage groups with all linked questions.",
    color: "violet",
  },
  {
    title: "Duplicate Entire Test",
    description: "Create test variations with all question links preserved.",
    color: "green",
  },
];

export type LinkedQuestionRow = {
  id: string;
  text: string;
  subject: string;
  order: number;
  passage: string;
  status: "Published" | "Draft";
};

export const linkedQuestionsRows: LinkedQuestionRow[] = [
  { id: "Q-001", text: "Calculate the derivative of f(x) = 3x² + 2", subject: "Mathematics", order: 1, passage: "—", status: "Published" },
  { id: "Q-002", text: "Identify the main theme of the given passage", subject: "Albanian Language", order: 2, passage: "P-001", status: "Published" },
  { id: "Q-003", text: "What is the chemical formula for water?", subject: "Chemistry", order: 3, passage: "—", status: "Published" },
  { id: "Q-004", text: "Explain the process of photosynthesis", subject: "Biology", order: 4, passage: "—", status: "Draft" },
  { id: "Q-005", text: "Solve the system of linear equations", subject: "Mathematics", order: 5, passage: "—", status: "Published" },
  { id: "Q-006", text: "Analyze the literary device used in paragraph 2", subject: "Albanian Language", order: 6, passage: "P-001", status: "Published" },
  { id: "Q-007", text: "What is Newton's second law of motion?", subject: "Physics", order: 7, passage: "—", status: "Published" },
  { id: "Q-008", text: "Describe the causes of World War I", subject: "History", order: 8, passage: "—", status: "Published" },
];

export const questionOrderRows = [
  { order: 1, id: "Q-001", title: "Calculate the derivative of f(x) = 3x²", tag: "" },
  { order: 2, id: "Q-002", title: "Identify the main theme", tag: "Passage 1" },
  { order: 3, id: "Q-006", title: "Analyze literary devices Passage 1", tag: "Passage 1" },
  { order: 4, id: "Q-004", title: "Summarize the argument Passage 1", tag: "Passage 1" },
  { order: 5, id: "Q-003", title: "What is the chemical formula for water?", tag: "" },
  { order: 6, id: "Q-005", title: "Solve the system of linear equations", tag: "" },
  { order: 7, id: "Q-007", title: "What is Newton's second law?", tag: "" },
  { order: 8, id: "Q-008", title: "Describe causes of World War I", tag: "" },
];

export const passageIntegrationRows = [
  {
    id: "P-001",
    title: "Reading Comprehension: Modern Literature",
    range: "Q1-10",
    totalQuestions: 10,
  },
  {
    id: "P-002",
    title: "Scientific Analysis: Climate Change",
    range: "Q11-18",
    totalQuestions: 8,
  },
];
