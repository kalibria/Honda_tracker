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
    logOut: builder.query({
      query: () => ({
        url: '/logout',
        method: 'POST',
        body: {},
      }),
    }),
    getUser: builder.query({
      query: (username: string) => `/users/${username}`,
    }),
  }),
});

export const { useLazyStatusLoginQuery, useLazyLogOutQuery, useGetUserQuery } =
  hondaApi;
