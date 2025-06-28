// lib/redux/api/authApi.ts
import { baseApi } from './baseApi'; // Import the central baseApi

// Use injectEndpoints to add endpoints to the existing baseApi
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),
    verifyEmail: builder.mutation({
      query: ({ token }) => ({
        url: `auth/verify-email?token=${token}`, // token in query param
        method: 'GET',                          // match backend
      }),
    }),
    
    resendVerificationEmail: builder.mutation({
      query: ({ email }) => ({
        url: 'auth/resend-verification-email',
        method: 'POST',
        body: { email }
      })
    })
  }),
  // This can be used to override the api definition of an existing endpoint.
  // Useful if you're injecting endpoints from a different feature slice.
  // For this case it is not needed, but good to know it exists.
  overrideExisting: false, 
});

// The hooks are now exported from the enhanced API
export const { useRegisterMutation, useVerifyEmailMutation, useResendVerificationEmailMutation } = authApi;