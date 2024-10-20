import CartItemType from '@/types/CartTypes/CartItem.type';
import CartType from '@/types/CartTypes/Cart.type';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import CartItemUpdate from '@/types/CartTypes/CartItemUpdate.type';
import CartItemDelete from '@/types/CartTypes/CartItemDelete.type';
import { RootState } from './store';
import { getCartCookie, setCartCookie } from '@/utils/cookies'; // Updated import path
import PaymentMethodSelectType from '@/types/CartTypes/ShippingMethodSelectType';
import ShippingMethodSelectType from '@/types/CartTypes/ShippingMethodSelectType';



const initializeCartState = async (): Promise<CartType> => {
  let initialState: CartType = {
    items: [],
    totalAmount: 0,
    totalQuantity: 0,
  ShippingMethod:null
  };

  const cookieData = await getCartCookie();

  if (cookieData) {
    initialState=cookieData
  }

  return initialState;
};


export const fetchInitialState = createAsyncThunk('cart/fetchInitialState', async () => {

  return await initializeCartState();
});

let initialState: CartType = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
  ShippingMethod:null
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: CartType, action: PayloadAction<CartItemType>) => {
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

      setCartCookie(state);
    },
    deleteProduct: (state: CartType, action: PayloadAction<CartItemDelete>) => {
      const checkedData: CartItemType | null | undefined = state.items.find(
        (x) => x.Id == action.payload.id && x.size == action.payload.size
      );
      if (checkedData) {
        state.items = state.items.filter((x) => x != checkedData);
        state.totalAmount -= checkedData.count * checkedData.price;
        state.totalQuantity -= checkedData.count;
      }
      setCartCookie(state);
    },
    updateCart: (state: CartType, action: PayloadAction<CartItemUpdate>) => {
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
        setCartCookie(state);
      }
    },
    clearCart:(state:CartType,action:PayloadAction<null>)=>{
      state.items=[]
      state.totalAmount=0;
      state.totalQuantity=0;
      setCartCookie(state)
    },
    addedShippingMethod:(state:CartType,action:PayloadAction<ShippingMethodSelectType>)=>
   {
    state.ShippingMethod={
      id:action.payload.id,
      disCount:action.payload.disCount,
      price:action.payload.price
    }

    setCartCookie(state)  
   }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialState.fulfilled, (state, action) => {
     
     state.items = action.payload.items;
     state.ShippingMethod=action.payload.ShippingMethod
     state.totalAmount = action.payload.totalAmount;
     state.totalQuantity = action.payload.totalQuantity;
     
    });
  },
});

export const { addToCart, deleteProduct, updateCart } = cartSlice.actions;

// Selectors
export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
