// Third Party Libraries
import { createSlice } from '@reduxjs/toolkit';

// Local Components and Hooks
import { api } from '../api';

const initialState: any = {
  auth: null,
  currentUser: null,
  permissions: null,
  isAuthenticated: false,
  isSkippedOnboarding: false,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    signOut: state => ({
      ...initialState,
      isSkippedOnboarding: state.isSkippedOnboarding,
    }),
    setRememberMe: (state, action) => {
      state.rememberMe = action.payload;
    },
    signIn: state => {
      state.isAuthenticated = true;
    },
    skipOnboarding: state => {
      state.isSkippedOnboarding = true;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.auth = payload;
      },
    );
  },
});
export const { signIn, signOut, skipOnboarding, setRememberMe } =
  authSlice.actions;
export default authSlice.reducer;
