// lib/redux/features/authSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { baseApi } from '../api/baseApi'; // Import baseApi to use its reducerPath

// Define a type for the user object based on your backend response
interface User {
  id: number;
  email: string;
  full_name: string | null;
  // Add any other fields from your UserInDB schema
  [key: string]: any; 
}

// Define a type for the authentication state
interface AuthState {
  user: User | null;
  token: string | null;
}

// Function to get initial state from localStorage
const getInitialState = (): AuthState => {
  try {
    // Check if window is defined (for server-side rendering)
    if (typeof window === 'undefined') {
      return { user: null, token: null };
    }
    const userItem = localStorage.getItem('user');
    const tokenItem = localStorage.getItem('accessToken');
    
    const user = userItem ? JSON.parse(userItem) : null;
    const token = tokenItem ? tokenItem : null;
    
    return { user, token };
  } catch (error) {
    console.error("Failed to parse auth state from localStorage", error);
    return { user: null, token: null };
  }
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Sets credentials in the state and localStorage. Called after login/verification.
     */
    setCredentials(
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('accessToken', token);
    },
    
    /**
     * Clears credentials from state and localStorage on logout.
     */
    logOut(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

// Selectors for easy access to state
export const selectCurrentUser = (state: { [baseApi.reducerPath]: any, auth: AuthState }) => state.auth.user;
export const selectCurrentToken = (state: { [baseApi.reducerPath]: any, auth: AuthState }) => state.auth.token;
