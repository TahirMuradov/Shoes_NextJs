import CartItemType from "./CartItem.type";
import PaymentMethodSelectType from "./PaymentMethodSelectType";

export default interface CartType{
    items:CartItemType[],
    totalAmount:number,
    totalQuantity:number,
    paymentMethod:PaymentMethodSelectType|null
}