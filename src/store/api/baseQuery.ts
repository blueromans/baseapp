// Third Party Libraries
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

// Local Components and Hooks
import { RootState } from '../configureStore';

const baseUrl = `${process.env.API_URL ? process.env.API_URL : ''}/`;

const baseQuery = fetchBaseQuery({
  baseUrl,
  timeout: 30000,
  prepareHeaders: async (headers, { getState }) => {
    const state = getState() as RootState;
    const accessToken = state?.authentication?.auth;
    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);
  if (result.error) {
    // Define a type for the error data to properly access its properties
    const errorData = result.error.data as
      | { detail?: string; message?: string }
      | string
      | undefined;
    // Get the error message based on the type of errorData
    const errorMessage =
      typeof errorData === 'object' && errorData
        ? errorData.detail || errorData.message
        : typeof errorData === 'string'
        ? errorData
        : '';

    console.error({
      message: `Error Data: ${errorMessage}`,
    });

    if (result.error.status === 401 || result.error.status === 'FETCH_ERROR') {
      const access_token = (api.getState() as RootState)?.authentication?.auth
        ?.accessToken;

      const refreshResult = await baseQuery(
        {
          url: `auths/refresh-token?token=${access_token}`,
          method: 'POST',
        },
        api,
        extraOptions,
      );
      console.log(refreshResult, 'Refresh result');
      if (refreshResult.data) {
        // api.dispatch(setUser(refreshResult?.data?.value));
        result = await baseQuery(args, api, extraOptions);
      } else {
        // api.dispatch(signOut());
      }
    }
  }
  return result;
};

// const baseQueryWithRetry = retry(baseQueryWithReAuth, { maxRetries: 2 });

export default baseQueryWithReAuth;
