import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { RootState } from "./store";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null
    } as { user: { name?: string, email: string }, token: string },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            return state;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            // storage.removeItem('persist:root');
            return state;
        }
    }
});

export const setCurrentUser = (state: RootState) => state.auth.user;
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;