import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser, login, logout } from "../services/supabase/auth";

export const fetchLogin = createAsyncThunk(
  "auth/login",
  async function (credentials) {
    const request = await login(credentials);
    return request;
  }
);

export const fetchLogout = createAsyncThunk("auth/logout", async function () {
  const signOut = await logout();
  return signOut;
});

export const fetchSession = createAsyncThunk("auth/session", async function () {
  const session = await getUser();
  return session;
});

const initialState = {
  authenticated: false,
  status: "idle",
  isError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState(state) {
      state.authenticated = false;
      state.isError = false;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogin.fulfilled, (state) => {
        state.authenticated = true;
        state.status = "finished";
      })
      .addCase(fetchLogin.rejected, (state, { error }) => {
        state.status = "idle";
        state.isError = error.message;
      })
      .addCase(fetchSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSession.fulfilled, (state) => {
        state.authenticated = true;
        state.status = "finished";
      })
      .addCase(fetchSession.rejected, (state, { error }) => {
        state.status = "idle";
        state.isError = error.message;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogout.fulfilled, (state) => {
        state.authenticated = false;
        state.status = "finished";
      })
      .addCase(fetchLogout.rejected, (state, { error }) => {
        state.status = "idle";
        state.isError = error.message;
      });
  },
});

export default authSlice.reducer;
export const { resetAuthState } = authSlice.actions;
