import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "redux/middlewares/baseQueryWithAuth";
import { TIqrRES, TUsingIqrRES } from "./iqr.response";
import { TConfirmIqrREQ, TIqrREQ } from "./iqr.request";
import { TBaseRES } from "types";

export const iqrApi = createApi({
  reducerPath: "iqrApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: [],
  endpoints: (builder) => ({
    usingIqr: builder.mutation<TBaseRES<TUsingIqrRES>, TIqrREQ>({
      query: (body) => ({
        url: "/zalo/e/process/code",
        method: "POST",
        body: {
          ...body,
          zalo_device_id: "",
        },
      }),
    }),
    checkIqr: builder.mutation<TBaseRES<TUsingIqrRES>, TIqrREQ>({
      query: (body) => ({
        url: "/zalo/e/process/check",
        method: "POST",
        body: {
          ...body,
          zalo_device_id: "",
        },
      }),
    }),
    confirmIqr: builder.mutation<TBaseRES<TUsingIqrRES>, TConfirmIqrREQ>({
      query: (body) => ({
        url: "/zalo/e/process/confirm",
        method: "POST",
        body: {
          ...body,
          zalo_device_id: "",
        },
      }),
    }),
  }),
});

export const {
  useCheckIqrMutation,
  useConfirmIqrMutation,
  useUsingIqrMutation,
} = iqrApi;
