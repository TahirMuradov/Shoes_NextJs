import CartItemType from "./CartItem.type";
import ShippingMethodSelectType from "./ShippingMethodSelectType";

export default interface CartType{
    items:CartItemType[],
    totalAmount:number,
    totalQuantity:number,
    ShippingMethod:ShippingMethodSelectType|null
}