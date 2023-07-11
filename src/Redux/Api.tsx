import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IOMDB, IOmdbApi } from "./Interface";

export const omdbApi = createApi({
  reducerPath: "omdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.omdbapi.com/",
  }),
  endpoints: (builder) => ({
    getSearchName: builder.mutation<IOMDB, { s: string }>({
      query: (body) => {
        const { s } = body;
        const apikey = "9713c5e7";
        console.log(s);
        return {
          url: "",
          method: "GET",
          params: { apikey, s },
        };
      },
    }),
    getById: builder.query<IOmdbApi, { i: string }>({
      query: (body) => {
        const { i } = body;
        const apikey = "9713c5e7";
        console.log(i);
        return {
          url: "",
          method: "GET",
          params: { apikey, i },
        };
      },
    }),
  }),
});

export const { useGetSearchNameMutation, useGetByIdQuery } = omdbApi;
