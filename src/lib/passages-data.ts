// ─── Passage types ────────────────────────────────────────────────────────────

export type PassageStatus = "Published" | "Draft" | "Hidden" | "Archived";

export type PassageRow = {
  id: string;
  code: string;
  title: string;
  range: string;
  questions: number;
  image: boolean;
  status: PassageStatus;
};

export type LinkedQuestionForPassage = {
  id: string;
  text: string;
  subject: string;
  faculty: string;
  dept: string;
  order: string;
  testType: string;
  access: string;
  status: "Published" | "Draft";
};

// ─── Passage table rows ───────────────────────────────────────────────────────

export const passageRows: PassageRow[] = [
  {
    id: "PSG-01",
    code: "PSG-01",
    title: "Albanian Literature Excerpt",
    range: "Q1–Q10",
    questions: 10,
    image: false,
    status: "Published",
  },
  {
    id: "PSG-02",
    code: "PSG-02",
    title: "English Reading Comprehension",
    range: "Q21–Q30",
    questions: 10,
    image: false,
    status: "Published",
  },
  {
    id: "PSG-03",
    code: "PSG-03",
    title: "Biology Lab Observation",
    range: "Q11–Q15",
    questions: 5,
    image: true,
    status: "Draft",
  },
  {
    id: "PSG-04",
    code: "PSG-04",
    title: "Physics Problem Diagram",
    range: "Q31–Q35",
    questions: 5,
    image: true,
    status: "Published",
  },
];

// ─── Questions linkable from Question Bank ────────────────────────────────────

export const linkableQuestions: LinkedQuestionForPassage[] = [
  {
    id: "Q-001",
    text: "Identify the main idea of the passage about...",
    subject: "Albanian Language",
    faculty: "Arts & Humanities",
    dept: "Linguistics",
    order: "Q1",
    testType: "Semester",
    access: "Public",
    status: "Published",
  },
  {
    id: "Q-002",
    text: "What is the author's tone in the second para...",
    subject: "Albanian Language",
    faculty: "Arts & Humanities",
    dept: "Linguistics",
    order: "Q2",
    testType: "Semester",
    access: "Public",
    status: "Published",
  },
  {
    id: "Q-003",
    text: "Which word best replaces 'elaborate' in line...",
    subject: "Albanian Language",
    faculty: "Arts & Humanities",
    dept: "Linguistics",
    order: "Q3",
    testType: "Semester",
    access: "Public",
    status: "Published",
  },
  {
    id: "Q-007",
    text: "Explain the significance of the metaphor use...",
    subject: "Albanian Language",
    faculty: "Arts & Humanities",
    dept: "Linguistics",
    order: "Q7",
    testType: "Semester",
    access: "Public",
    status: "Published",
  },
  {
    id: "Q-008",
    text: "Which statement best supports the author's a...",
    subject: "Albanian Language",
    faculty: "Arts & Humanities",
    dept: "Linguistics",
    order: "Q8",
    testType: "Semester",
    access: "Public",
    status: "Published",
  },
  {
    id: "Q-010",
    text: "What is the purpose of the example given in...",
    subject: "Albanian Language",
    faculty: "Arts & Humanities",
    dept: "Linguistics",
    order: "Q10",
    testType: "Semester",
    access: "Public",
    status: "Published",
  },
];

// ─── Entity field descriptions ────────────────────────────────────────────────

export const passageEntityFields = [
  { label: "Passage ID", desc: "Unique identifier", detail: "e.g. PSG-01" },
  { label: "Passage Content", desc: "Text body (4 kb)", detail: "" },
  { label: "Passage Image", desc: "Optional", detail: "Stores an image" },
  { label: "Linked Question Range", desc: "", detail: "e.g. Q1–Q10" },
  { label: "Status", desc: "Active / Hide / Done", detail: "" },
];
