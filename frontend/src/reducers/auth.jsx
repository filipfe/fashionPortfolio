import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: 'login',
    initialState: { logged: false },
    reducers: {
        login: state => {
            state.logged = true
        },
        logout: state => {
            state.logged = false
        }
    }
})

export const { login, logout } = loginSlice.actions

export default loginSlice.reducer