import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        logged: false,
        info: {
            id: '',
            first_name: '',
            last_name: '',
            email: ''
        },
        tokens: {
            access: '',
            refresh: ''
        }
    },
    reducers: {
        login: (state, action) => {
            state.logged = true
            state.info = {
                id: action.payload.info.user_id,
                first_name: action.payload.info.first_name,
                last_name: action.payload.info.last_name,
                email: action.payload.info.email,
            }
            state.tokens = {
                access: action.payload.tokens[0],
                refresh: action.payload.tokens[1]
            }
        },
        logout: state => {
            state.logged = false
            state.info = {
                id: '',
                first_name: '',
                last_name: '',
                email: ''
            }
            state.tokens = {
                access: '',
                refresh: ''
            }
        }
    }
})

export const { login, logout } = loginSlice.actions

export default loginSlice.reducer