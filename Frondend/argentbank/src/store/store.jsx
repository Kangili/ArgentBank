import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user"; // ton reducer user

// Création du store Redux avec seulement le userReducer pour l'instant
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
