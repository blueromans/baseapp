// Third Party Libraries
import { createApi } from '@reduxjs/toolkit/query/react';

// Local Components and Hooks
import baseQueryWithReAuth from './baseQuery';

const tagTypes = ['Leaves', 'Schema', 'Profile', 'LeaveDetail'] as const;

/**
 * RTK Query API definition
 */
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReAuth,
  tagTypes,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: builder => ({
    login: builder.mutation<any, any>({
      query: () => ({
        url: 'auth/login',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation } = api;
