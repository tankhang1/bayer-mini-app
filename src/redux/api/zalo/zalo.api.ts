import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "redux/middlewares/baseQueryWithAuth";
import { TZaloCheckREQ, TZaloREQ } from "./zalo.request";
import { TZaloCheckRES, TZaloRES } from "./zalo.response";

export const zaloApi = createApi({
  reducerPath: "zaloApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: [],
  endpoints: (builder) => ({
    updateZaloInfo: builder.mutation<TZaloRES, TZaloREQ>({
      query: (body) => ({
        url: "/zalo/update",
        method: "POST",
        body: {
          ...body,
          zalo_device_id: "",
        },
      }),
    }),
    zaloCheckUserIdId: builder.mutation<TZaloCheckRES, TZaloCheckREQ>({
      query: (body) => ({
        url: "/zalo/check",
        method: "POST",
        body: {
          ...body,
          zalo_device_id: "",
        },
      }),
    }),
  }),
});

export const { useUpdateZaloInfoMutation, useZaloCheckUserIdIdMutation } =
  zaloApi;
