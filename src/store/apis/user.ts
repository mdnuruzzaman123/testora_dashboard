import { baseApi } from "../baseApi";
import type { ApiEnvelope } from "./authApi";

export interface AdminUserOverview {
  totalUsers: number;
  activeAccounts: number;
  blockedAccounts: number;
  disabledAccounts: number;
}

export interface AdminUserListItem {
  email: string;
  fullName: string;
  avatar: string;
  city: string | null;
  status: string;
  faculty: string | null;
  createdAt: string;
  plan: string | null;
}

export interface AdminUserListResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: AdminUserListItem[];
}

export interface UserListParams {
  page?: number;
  limit?: number;
  status?: string;
  plan?: string;
  searchTerm?: string;
}

function buildQuery(params?: UserListParams) {
  if (!params) return "";

  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.status) searchParams.set("status", params.status);
  if (params.plan) searchParams.set("plan", params.plan);
  if (params.searchTerm) searchParams.set("searchTerm", params.searchTerm);

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserOverview: builder.query<ApiEnvelope<AdminUserOverview>, void>({
      query: () => "/admin/users/overview",
      providesTags: ["Users"],
    }),
    getUserList: builder.query<ApiEnvelope<AdminUserListResponse>, UserListParams | void>({
      query: (params) => `/admin/users/list${buildQuery(params ?? undefined)}`,
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetUserOverviewQuery, useGetUserListQuery } = userApi;
