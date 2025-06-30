import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { baseApi } from '../api/baseApi';

interface User {
  id: number;
  email: string;
  full_name: string | null;
  [key: string]: any; 
}

interface AuthState {
  user: User | null;
  token: string | null;
}

const getInitialState = (): AuthState => {
  try {
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

export const selectCurrentUser = (state: { [baseApi.reducerPath]: any, auth: AuthState }) => state.auth.user;
export const selectCurrentToken = (state: { [baseApi.reducerPath]: any, auth: AuthState }) => state.auth.token;
