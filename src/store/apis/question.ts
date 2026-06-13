import { baseApi } from "./baseApi";
import type { ApiEnvelope } from "./authApi";

export interface QuestionListItem {
  _id: string;
  examType: string;
  year: number;
  questionText: string;
  access: string;
  difficultyLevel: string;
  correctOptionIndex: number;
  status: string;
  createdAt: string;
  subjectName: string;
  facultyName: string;
  passageCode: string | null;
}

export interface QuestionListResponse {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  questions: QuestionListItem[];
}

export interface QuestionOption {
  text: string;
}

export interface SingleQuestionResponse {
  questionId: string;
  examType: string;
  year: number;
  questionText: string;
  questionImageUrl: string | null;
  options: QuestionOption[];
  correctOptionIndex: number;
  explanation: string;
  difficultyLevel: string;
  access: string;
  status: string;
  createdAt: string;
  subjectName: string;
  facultyName: string;
  departments: string[];
  passage: string | null;
  testIds: string[];
  stats: {
    totalAttempts: number;
    correctCount: number;
    wrongCount: number;
    correctPercentage: number;
  };
}

export interface QuestionListParams {
  page?: number;
  limit?: number;
  examType?: string;
  searchTerm?: string;
}

function buildQuery(params?: QuestionListParams) {
  if (!params) return "";

  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.examType) searchParams.set("examType", params.examType);
  if (params.searchTerm) searchParams.set("searchTerm", params.searchTerm);

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export const questionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<ApiEnvelope<QuestionListResponse>, QuestionListParams | void>({
      query: (params) => `/admin/questions${buildQuery(params ?? undefined)}`,
      providesTags: ["Auth"],
    }),
    getSingleQuestion: builder.query<ApiEnvelope<SingleQuestionResponse>, string>({
      query: (questionId) => `/admin/questions/single/${questionId}`,
      providesTags: ["Auth"],
    }),
  }),
});

export const { useGetQuestionsQuery, useGetSingleQuestionQuery, useLazyGetSingleQuestionQuery } =
  questionApi;
