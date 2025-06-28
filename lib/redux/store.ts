// store.ts - MODIFIED
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api/baseApi';
import { authApi } from './api/authApi'; // 1. Import authApi

export const store = configureStore({
  reducer: {
    // 2. Add the reducer for baseApi AND authApi
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // 3. Chain the middleware for both APIs
    getDefaultMiddleware()
      .concat(baseApi.middleware)
    
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;