import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "redux/middlewares/baseQueryWithAuth";
import { TProvinceRES } from "./meta.response";

export const metaApi = createApi({
  reducerPath: "metaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reactive.yis.vn",
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    getListProvince: builder.query<TProvinceRES[], void>({
      query: () => ({
        url: "/api/report/province",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetListProvinceQuery } = metaApi;
