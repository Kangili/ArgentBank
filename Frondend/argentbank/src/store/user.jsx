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
      "http://localhost:3001/api/v1/user/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.body; // { firstName, lastName, userName }
  }
);

// 🔥 UPDATE USERNAME : PUT pour mettre à jour le username
export const updateUsername = createAsyncThunk(
  "user/updateUsername",
  async (newUsername, { getState, rejectWithValue }) => {
    const token = getState().user.token;

    try {
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        { userName: newUsername },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.body; // { firstName, lastName, userName }
    } catch (err) {
      console.error("Erreur updateUsername:", err);
      return rejectWithValue(err.response?.data || err.message);
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
    // --- Ajout de l'action updateUserName (utile si besoin de modification locale) ---
    updateUserName: (state, action) => {
      const { firstName, lastName } = action.payload;
      if (state.userInfo) {
        state.userInfo.firstName = firstName;
        state.userInfo.lastName = lastName;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
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

      // FETCH PROFILE
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })

      // 🔹 UPDATE USERNAME
      .addCase(updateUsername.fulfilled, (state, action) => {
        if (state.userInfo) {
          state.userInfo.userName = action.payload.userName;
        }
      })
      .addCase(updateUsername.rejected, (state, action) => {
        state.error = action.payload || "Erreur lors de la mise à jour du username";
      });
  },
});

export const { logout, updateUserName } = userSlice.actions;

export default userSlice.reducer;









