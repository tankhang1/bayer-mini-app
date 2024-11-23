import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "redux/middlewares/baseQueryWithAuth";
import { TZaloREQ } from "./zalo.request";
import { TZaloRES } from "./zalo.response";

export const zaloApi = createApi({
  reducerPath: "zaloApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: [],
  endpoints: (builder) => ({
    updateZaloInfo: builder.mutation<TZaloRES, TZaloREQ>({
      query: (body) => ({
        url: "/zalo/update",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useUpdateZaloInfoMutation } = zaloApi;
