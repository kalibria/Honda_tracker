import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const hondaApi = createApi({
  reducerPath: 'hondaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://18qv4o7xm9.execute-api.eu-west-1.amazonaws.com',
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
