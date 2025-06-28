// lib/redux/api/authApi.ts
import { baseApi } from './baseApi';
import { setCredentials } from '../features/authSlice'; // Import the action

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
        url: `auth/verify-email?token=${token}`,
        method: 'GET',
      }),
      /**
       * This is the key part. When the verification API call is successful,
       * we take the response data and dispatch the setCredentials action
       * to update the global authentication state.
       */
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data && data.user && data.access_token) {
            dispatch(
              setCredentials({
                user: data.user,
                token: data.access_token,
              })
            );
          }
        } catch (error) {
          // You can handle error scenarios here if needed
          console.error('Email verification failed:', error);
        }
      },
    }),
    
    resendVerificationEmail: builder.mutation({
      query: ({ email }) => ({
        url: 'auth/resend-verification-email',
        method: 'POST',
        body: { email }
      })
    }),
    
    // You would add your login endpoint here with the same onQueryStarted logic
    login: builder.mutation({
        query: (credentials) => ({
            url: 'auth/login/access-token',
            method: 'POST',
            body: credentials, // remember this should be form-data
        }),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            try {
                const { data } = await queryFulfilled;
                 if (data && data.access_token) {
                    // For login, you might need another call to get user data,
                    // or just save the token and let another component fetch user details.
                    // For simplicity, we'll assume login also returns the user.
                    // dispatch(setCredentials({ user: data.user, token: data.access_token }));
                 }
            } catch (error) {
                 console.error('Login failed:', error);
            }
        }
    })
  }),
  overrideExisting: false, 
});

export const { 
  useRegisterMutation, 
  useVerifyEmailMutation, 
  useResendVerificationEmailMutation,
  useLoginMutation, // Export new hook
} = authApi;
