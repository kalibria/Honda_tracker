import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const hondaApi = createApi({
  reducerPath: 'hondaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: 'include',
  }),

  tagTypes: ['Login'],
  endpoints: (builder) => ({
    statusLogin: builder.query({
      query: ({ password, username }) => ({
        url: '/login',
        method: 'POST',
        body: { password, username },
      }),
    }),
  }),
});

export const { useStatusLoginQuery, useLazyStatusLoginQuery } = hondaApi;
