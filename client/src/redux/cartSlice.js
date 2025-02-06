import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [], // Stores cart items
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.qty += action.payload.qty;
        existingItem.price += action.payload.price;
      } else {
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      // Filter by the item's id, not index
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    updateCartItem: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        item.qty = action.payload.qty;
        item.price = action.payload.price;
      }
    },
    loadCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItem,
  loadCart,
} = cartSlice.actions;

export default cartSlice.reducer;
