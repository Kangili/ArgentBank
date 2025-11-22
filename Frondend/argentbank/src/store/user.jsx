// src/store/user.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔥 LOGIN : récupère token + infos utilisateur
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    try {
      const response = await axios.post("http://localhost:3001/api/v1/user/login", {
        email,
        password,
      });

      const { token, firstName, lastName, userName } = response.data.body;

      return { token, firstName, lastName, userName, email };
    } catch (error) {
      throw new Error(error.response?.data?.message || "Invalid email or password");
    }
  }
);

// 🔥 PROFILE : fetch via GET (corrige le 404)
export const fetchUserProfile = createAsyncThunk(
  "user/profile",
  async (_, { getState }) => {
    const token = getState().user.token;

    const response = await axios.get(
      "http://localhost:3001/api/v1/user/profile", // GET ici
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.body; // { firstName, lastName, userName }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    userInfo: null,
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
        state.userInfo = {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          userName: action.payload.userName || "",
          email: action.payload.email,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;








