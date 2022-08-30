import { createSlice } from "@reduxjs/toolkit";

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

export default cartSlice.reducer