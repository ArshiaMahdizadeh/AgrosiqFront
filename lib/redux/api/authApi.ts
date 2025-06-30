import { baseApi } from './baseApi';
import { setCredentials } from '../features/authSlice';

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
    
    login: builder.mutation({
        query: (credentials) => ({
            url: 'auth/login/access-token',
            method: 'POST',
            body: credentials,
        }),
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
            try {
                const { data } = await queryFulfilled;
                 if (data && data.access_token) {
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
  useLoginMutation,
} = authApi;
