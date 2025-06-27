// lib/redux/api/authApi.ts (This is an example, adapt it to your existing file)
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/v1/' }), // Replace with your actual backend URL
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    // Add the new endpoint for verifying the email
    verifyEmail: builder.mutation({
      query: ({ token }) => ({
        url: 'auth/verify-email', // Assuming this is your backend endpoint for verification
        method: 'POST',
        body: { token },
      }),
    }),
    // Add the new endpoint for resending the verification email
    resendVerificationEmail: builder.mutation({
        query: ({ email }) => ({
            url: 'auth/resend-verification-email', // Assuming this endpoint exists on your backend
            method: 'POST',
            body: { email }
        })
    })
  }),
});

export const { useRegisterMutation, useVerifyEmailMutation, useResendVerificationEmailMutation } = authApi;