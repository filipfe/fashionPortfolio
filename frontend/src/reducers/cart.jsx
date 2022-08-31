import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        add: (state, action) => {
            state.cart.push(action.payload)
        },
        remove: (state, action) => {
            let newCart = state.cart.filter(item => item.id !== action.payload.id)
            state.cart = newCart
        }
    }
})

export const { add, remove } = cartSlice.actions

export default cartSlice.reducer