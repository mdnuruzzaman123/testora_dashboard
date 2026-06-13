import { API_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as { auth?: { token?: string | null } };
      const token = state.auth?.token;

      if (token) {
        headers.set("authorization", token.startsWith("Bearer ") ? token : `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Dashboard", "Users", "Auth"],
  endpoints: () => ({}),
});
