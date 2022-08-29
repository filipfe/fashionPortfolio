import { createSlice } from "@reduxjs/toolkit/dist/createSlice";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: {

        }
    },
    reducers: {
        add: (state, action) => {
            state.value = {...state, action}
        }
    }
})