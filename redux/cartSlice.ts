import CartItemType from '@/types/CartTypes/CartItem.type';
import CartType from '@/types/CartTypes/Cart.type';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import CartItemUpdate from '@/types/CartTypes/CartItemUpdate.type';
import CartItemDelete from '@/types/CartTypes/CartItemDelete.type';
import { RootState } from './store';
import { getCartCookie, setCartCookie } from '@/utils/cookies'; // Updated import path

const initialState: CartType = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};

// Initialize state with cookie data if available
// const cookieCart = getCartCookie();
// if (cookieCart) {
//   initialState.totalAmount = cookieCart.totalAmount;
//   initialState.totalQuantity = cookieCart.totalQuantity;
//   initialState.items = cookieCart.items;
// }

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      const checkedData: CartItemType | null | undefined = state.items.find(
        (x) => x.Id == action.payload.Id && x.size == action.payload.size
      );
      if (checkedData) {
        checkedData.count += action.payload.count;
        state.totalAmount += action.payload.count * checkedData.price;
        state.totalQuantity += action.payload.count;
  
      } else {
        state.items.push(action.payload);
        state.totalAmount += action.payload.price * action.payload.count;
        state.totalQuantity += action.payload.count;

      }
    },
    deleteProduct: (state, action: PayloadAction<CartItemDelete>) => {
      const checkedData: CartItemType | null | undefined = state.items.find(
        (x) => x.Id == action.payload.id && x.size == action.payload.size
      );
      if (checkedData) {
        state.items = state.items.filter((x) => x != checkedData);
        state.totalAmount -= checkedData.count * checkedData.price;
        state.totalQuantity -= checkedData.count;
       
      }
    },
    updateCart: (state, action: PayloadAction<CartItemUpdate>) => {
      const checkedData: CartItemType | null | undefined = state.items.find(
        (x) => x.Id == action.payload.id && x.size == action.payload.size
      );
      if (checkedData) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter((x) => x != checkedData);
          state.totalAmount -= checkedData.count * checkedData.price;
          state.totalQuantity -= checkedData.count;
        } else {
          const quantityDifference = action.payload.quantity - checkedData.count;
          checkedData.count = action.payload.quantity;

          state.totalAmount += quantityDifference * checkedData.price;
          state.totalQuantity += quantityDifference;
        }
    
      }
    },
  },
});

export const { addToCart, deleteProduct, updateCart } = cartSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state;
export default cartSlice.reducer;
