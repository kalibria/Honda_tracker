import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'src/redux/store';
import { myLocalStorage } from 'src/services/localStorage';

export const hondaApi = createApi({
  reducerPath: 'hondaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    // credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      // const refreshToken = myLocalStorage.getItem('RefreshToken');
      const accessToken = sessionStorage.getItem('AccessToken');

      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),

  tagTypes: ['Login', 'Me'],
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
    getMe: builder.query<{ username: string }, object>({
      query: () => '/me',
      providesTags: ['Me'],
    }),
    getBookings: builder.query({
      query: ({ carId, username }) =>
        `/bookings?carId=${carId}&username=${username}`,
    }),
    getBookingsId: builder.query({
      query: ({ username, carId, startTime }) => ({
        url: `/bookings/id?username=${username}&carId=${carId}&startTime=${startTime}`,
      }),
    }),
  }),
});

export const {
  useLazyStatusLoginQuery,
  useLazyLogOutQuery,
  useLazyGetUserQuery,
  useGetMeQuery,
  useLazyGetBookingsQuery,
  useLazyGetBookingsIdQuery,
} = hondaApi;
