import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: []
    },
    reducers: {
        add: (state, action) => {
            let found = state.cart.findIndex(found => action.payload.id === found.id)
            if(found >= 0) state.cart[found].quantity++
            else state.cart.push(action.payload)
        },
        remove: (state, action) => {
            let found = state.cart.findIndex(found => action.payload.id === found.id)
            if(state.cart[found].quantity > 1) state.cart[found].quantity--
            else {
                state.cart.splice(found, 1)
            }
        }
    }
})

export const { add, remove } = cartSlice.actions

export default cartSlice.reducer