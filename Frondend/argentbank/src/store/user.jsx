import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Simule une API de login
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    // Ici tu peux appeler une vraie API
    if (email === "test@test.com" && password === "123456") {
      return { token: "fake-jwt-token", name: "Tony Jarvis", email };
    } else {
      throw new Error("Invalid email or password");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    userInfo: null, // Stocke les infos utilisateur
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userInfo = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userInfo = { name: action.payload.name, email: action.payload.email };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

