import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Appel réel à l'API pour le login
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    try {
      const response = await axios.post("http://localhost:3001/api/v1/user/login", {
        email,
        password,
      });

      // On récupère les infos renvoyées par l'API
      const { token, firstName, lastName, userName } = response.data.body;

      return { token, firstName, lastName, userName, email };
    } catch (error) {
      throw new Error(error.response?.data?.message || "Invalid email or password");
    }
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

        // 🔥 CORRECTION : on stocke chaque valeur séparément
        state.userInfo = {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          userName: action.payload.userName || "", // peut être vide au début
          email: action.payload.email,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;



