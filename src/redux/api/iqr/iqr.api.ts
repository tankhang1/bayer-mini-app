import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "redux/middlewares/baseQueryWithAuth";
import { TIqrRES } from "./iqr.response";
import { TIqrREQ } from "./iqr.request";
import { TBaseRES } from "types";

export const iqrApi = createApi({
  reducerPath: "iqrApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: [],
  endpoints: (builder) => ({
    usingIqr: builder.mutation<TBaseRES<TIqrRES>, TIqrREQ>({
      query: (body) => ({
        url: "/zalo/e/process/code",
        method: "POST",
        body,
      }),
    }),
    checkIqr: builder.mutation<TBaseRES<TIqrRES>, TIqrREQ>({
      query: (body) => ({
        url: "/zalo/e/process/check",
        method: "POST",
        body,
      }),
    }),
    confirmIqr: builder.mutation<TBaseRES<TIqrRES>, TIqrREQ>({
      query: (body) => ({
        url: "/zalo/e/process/confirm",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCheckIqrMutation,
  useConfirmIqrMutation,
  useUsingIqrMutation,
} = iqrApi;
