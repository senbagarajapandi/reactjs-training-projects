import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex === -1) {
        state.items.push({ ...action.payload, quantity: 1 });
      } else {
        state.items[itemIndex].quantity += 1;
      }
    },
    updateItemQuantity(state, action) {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity = action.payload.quantity;
      }
    },
    removeItemFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
  },
});

export const { addItemToCart, updateItemQuantity, removeItemFromCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartTotal = (state) => {
  return state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export default cartSlice.reducer;