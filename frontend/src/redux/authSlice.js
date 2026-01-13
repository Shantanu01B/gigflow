import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

/* LOGIN */
export const loginUser = createAsyncThunk(
    "auth/login",
    async(data, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/login", data);
            return res.data;
        } catch (err) {
            let message = "Login failed";
            if (err.response && err.response.data && err.response.data.message) {
                message = err.response.data.message;
            }
            return rejectWithValue(message);
        }
    }
);

/* FETCH CURRENT USER */
export const fetchMe = createAsyncThunk(
    "auth/me",
    async(_, { rejectWithValue }) => {
        try {
            const res = await api.get("/auth/me");
            return res.data;
        } catch {
            return rejectWithValue(null);
        }
    }
);

/* LOGOUT */
export const logoutUser = createAsyncThunk("auth/logout", async() => {
    localStorage.removeItem("token");
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: localStorage.getItem("token"),
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

        // LOGIN SUCCESS
            .addCase(loginUser.fulfilled, (state, action) => {
            var payload = action.payload;
            var token = null;
            var user = null;

            if (payload && payload.token) {
                token = payload.token;
                user = payload.user ? payload.user : payload;
            } else {
                user = payload;
            }

            if (token) {
                localStorage.setItem("token", token);
                state.token = token;
            }

            state.user = user;
        })

        // FETCH ME SUCCESS
        .addCase(fetchMe.fulfilled, (state, action) => {
            state.user = action.payload;
        })

        // LOGOUT
        .addCase(logoutUser.fulfilled, (state) => {
            state.user = null;
            state.token = null;
        });
    },
});

export default authSlice.reducer;