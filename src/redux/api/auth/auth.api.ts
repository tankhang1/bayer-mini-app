import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "redux/middlewares/baseQueryWithAuth";
import { TAuthREQ } from "./auth.request";
import { TAuthRES } from "./auth.response";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: [],
  endpoints: (builder) => ({
    getAccessToken: builder.mutation<TAuthRES, TAuthREQ>({
      query: (body) => ({
        url: "/app-login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetAccessTokenMutation } = authApi;
