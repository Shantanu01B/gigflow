import { configureStore } from "@reduxjs/toolkit";
import authActions from "./redux/authSlice";

export const store = configureStore({
    reducer: {
        auth: authActions.reducer,
    },
});