import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    token: null,
    user: {},
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setLogInState: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUsers: (state, action) => {
            state.user = action.payload;
        }
    }
})

export const { setToken, setUsers, setLogInState } = authSlice.actions;
export default authSlice.reducer;