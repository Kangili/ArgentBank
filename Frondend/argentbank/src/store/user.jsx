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

      // On récupère le token et les infos utilisateur
      // MODIF : récupération du firstName et lastName pour l'affichage dans Profile
      const { token, firstName, lastName } = response.data.body;

      return { token, firstName, lastName, email };
    } catch (error) {
      // Message d'erreur de l'API ou message générique
      throw new Error(error.response?.data?.message || "Invalid email or password");
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
        // MODIF : création de userInfo.name pour affichage dans Header/Profile
        state.userInfo = {
          name: action.payload.firstName + " " + action.payload.lastName,
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


