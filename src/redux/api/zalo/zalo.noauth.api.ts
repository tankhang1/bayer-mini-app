import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TZaloCheckREQ } from "./zalo.request";
import { TZaloRES } from "./zalo.response";
import { BASE_NO_AUTH_URL } from "constants";

export const zaloNonAuthApi = createApi({
  reducerPath: "zaloNonAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_NO_AUTH_URL,
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    zaloCheckDeviceId: builder.mutation<TZaloRES, TZaloCheckREQ>({
      query: (body) => ({
        url: "/api/register/zalo/check",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useZaloCheckDeviceIdMutation } = zaloNonAuthApi;
