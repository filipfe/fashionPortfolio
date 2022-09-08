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
        }
    },
    reducers: {
        login: (state, action) => {
            state.logged = true
            state.info = {...action.payload}
        },
        logout: state => {
            state.logged = false
            state.info = {
                id: '',
                first_name: '',
                last_name: '',
                email: ''
            }
        }
    }
})

export const { login, logout } = loginSlice.actions

export default loginSlice.reducer