import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: 'login',
    initialState: { value: { logged: false }},
    reducers: {
        login: state => {
            state.value.logged = true
        },
        logout: state => {
            state.value.logged = false
        }
    }
})

export const { login, logout } = loginSlice.actions