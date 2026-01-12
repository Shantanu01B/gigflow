import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

/* REGISTER */
export const registerUser = createAsyncThunk(
    "auth/register",
    async(data, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/register", data);
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response &&
                err.response.data &&
                err.response.data.message ?
                err.response.data.message :
                "Register failed"
            );
        }
    }
);


/* LOGIN */
export const loginUser = createAsyncThunk(
    "auth/login",
    async(data, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/login", data);
            return res.data;
        } catch (err) {
            return rejectWithValue(
                err.response &&
                err.response.data &&
                err.response.data.message ?
                err.response.data.message :
                "Login failed"
            );

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
    await api.post("/auth/logout");
});

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export default authSlice.reducer;