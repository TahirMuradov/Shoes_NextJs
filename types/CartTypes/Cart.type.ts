import CartItemType from "./CartItem.type";

export default interface CartType{
    items:CartItemType[],
    totalAmount:number,
    totalQuantity:number
}