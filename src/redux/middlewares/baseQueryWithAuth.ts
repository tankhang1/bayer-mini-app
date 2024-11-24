import { FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "constants";
import { store } from "redux/store";

// Define the type for your baseQuery function
export const baseQueryWithAuth = async (
  args: string | FetchArgs, // Fetch arguments could be a string or an object
  api: any, // You can replace `any` with a more specific type based on your setup
  extraOptions: any // Add appropriate types for your extra options
) => {
  // Await the base URL from async storage
  // Use fetchBaseQuery with the retrieved baseUrl
  const token = store.getState().app.token;
  console.log("token", token);
  const baseQueryFn = fetchBaseQuery({
    baseUrl: BASE_URL || "", // Provide a fallback in case baseUrl is undefined
    prepareHeaders: (headers) => {
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  return baseQueryFn(args, api, extraOptions);
};
