import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: '',
        token: ''
    },
    reducers: {
        login: (state, action) => {
            state.id = action.payload.id;
            state.token = action.payload.token;
            return state;
        },
        logout: (state) => {
            state.id = '';
            state.token = '';
            return state;
        }
    }
});


export const { login, logout } = userSlice.actions;
export default userSlice.reducer;