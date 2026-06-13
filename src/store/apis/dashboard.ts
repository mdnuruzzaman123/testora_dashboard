import { baseApi } from "../baseApi";
import type { ApiEnvelope } from "./authApi";

export interface AdminDashboardStats {
  totalUsers: number;
  activeAccounts: number;
  blockedAccounts: number;
  premiumUsers: number;
}

export interface AdminGrowthPoint {
  label: string;
  count: number;
}

export interface AdminRecentUser {
  fullName: string;
  avatar: string;
  city: string | null;
  email: string;
  status: string;
  plan: string | null;
  createdAt: string;
}

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<ApiEnvelope<AdminDashboardStats>, void>({
      query: () => "/admin/overview/stats",
      providesTags: ["Dashboard"],
    }),
    getUserGrowth: builder.query<ApiEnvelope<AdminGrowthPoint[]>, void>({
      query: () => "/admin/overview/user-growth",
      providesTags: ["Dashboard"],
    }),
    getRecentActiveUsers: builder.query<ApiEnvelope<AdminRecentUser[]>, void>({
      query: () => "/admin/overview/recent-active-users",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardStatsQuery, useGetUserGrowthQuery, useGetRecentActiveUsersQuery } =
  dashboardApi;
