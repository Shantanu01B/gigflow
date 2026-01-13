import { configureStore } from "@reduxjs/toolkit";
import authActions from "./authSlice"; // ✅ FIXED PATH

export const store = configureStore({
    reducer: {
        auth: authActions.reducer,
    },
});