import CartItemType from '@/types/CartTypes/CartItem.type'
import CartType from '@/types/CartTypes/Cart.type'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import CartItemUpdate from '@/types/CartTypes/CartItemUpdate.type'
import CartItemDelete from '@/types/CartTypes/CartItemDelete.type'



const initialState:CartType = {
items:[],
totalAmount:0,
totalQuantity:0
}

export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state,action:PayloadAction<CartItemType>) => {
const checkedData:CartItemType|null|undefined=state.items.find(x=>x.Id==action.payload.Id&&x.size==action.payload.size);
if (checkedData) {
   checkedData.count=action.payload.count;
   state.totalAmount+=checkedData.count*checkedData.price;
   state.totalQuantity+=checkedData.count;
}else{
    state.items.push(action.payload);
}
     
    },
    deleteProduct: (state,action:PayloadAction<CartItemDelete>) => {
    const checkedData:CartItemType|null|undefined=state.items.find(x=>x.Id==action.payload.id&&x.size==action.payload.size)
   if (checkedData) {
    state.items=state.items.filter(x=>x!=checkedData)
    state.totalAmount-=checkedData.count*checkedData.price;
    state.totalQuantity-=checkedData.count;
   }
},
    updateCart: (state, action: PayloadAction<CartItemUpdate>) => {
   
        const checkedData:CartItemType|null|undefined=state.items.find(x=>x.Id==action.payload.id&&x.size==action.payload.size)
         if (checkedData) {            
             state.totalAmount-=checkedData.count*checkedData.price;
             state.totalQuantity-=checkedData.count;
             checkedData.count=action.payload.quantity
             state.totalAmount+=checkedData.count*checkedData.price;
             state.totalQuantity+=checkedData.count;

        }
    
    
    },
  },
})


export const { addToCart, deleteProduct, updateCart } = counterSlice.actions

export default counterSlice.reducer