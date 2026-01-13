import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

/* REGISTER */
const registerUser = createAsyncThunk(
    "auth/register",
    async(data, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/register", data);
            return res.data;
        } catch (err) {
            let message = "Register failed";
            if (err.response && err.response.data && err.response.data.message) {
                message = err.response.data.message;
            }
            return rejectWithValue(message);
        }
    }
);

/* LOGIN */
const loginUser = createAsyncThunk(
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
const fetchMe = createAsyncThunk(
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
const logoutUser = createAsyncThunk("auth/logout", async() => {
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
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const payload = action.payload;
                let token = null;
                let user = payload;

                if (payload && payload.token) {
                    token = payload.token;
                    if (payload.user) user = payload.user;
                }

                if (token) {
                    localStorage.setItem("token", token);
                    state.token = token;
                }

                state.user = user;
            })
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
            });
    },
});

/* ✅ DEFAULT EXPORT OBJECT (NO NAMED EXPORTS) */
const authActions = {
    registerUser,
    loginUser,
    fetchMe,
    logoutUser,
    reducer: authSlice.reducer,
};

export default authActions;