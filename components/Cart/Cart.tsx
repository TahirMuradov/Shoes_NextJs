
'use client'
import Image from "next/image"
import img1 from "../../public/img/product-img/product-10.jpg"
import CartType from "@/types/CartTypes/Cart.type"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { cartSlice } from "@/redux/cartSlice";
import { Alert } from "@mui/material";
import Link from "next/link";
import { Locale } from "@/i18n-config";
import { CartLanguage } from "@/types/DictionaryTypes/Dictionary";
import GetAllPaymentMethod from "@/types/PaymentMethodTypes/GetAllPaymentMethod";
import GetAllShippingMethod from "@/types/ShippingMethodType/GetALLShippingMethod";
import Result from "@/types/ApiResultType";
import PaymentMethodSelectType from "@/types/CartTypes/PaymentMethodSelectType";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCartCookie } from "@/utils/cookies";
import Swal from "sweetalert2";
interface CartParasm{
    lang:Locale,
    dictinoary:CartLanguage,
    apiDomen:string|undefined,
    ShippingMethods:Result< GetAllShippingMethod[]>
}

const Cart:React.FC<CartParasm>=({lang,dictinoary,apiDomen,ShippingMethods})=>{
    const cartItems:CartType=useAppSelector((state)=>state.cart);
    const [shippingMethods,SetShippingMethods]=useState<GetAllShippingMethod[]|null|undefined>(ShippingMethods.response)
    const dispatch=useAppDispatch();
    const router=useRouter();
    
    function UpdateItem(id:string,size:number,count:number){
dispatch(cartSlice.actions.updateCart({
    id: id,
    quantity:count,
    size:size
})

)
    }
   async function  checkOutBtn(){
var cookie:CartType|null=await getCartCookie()

if (!cookie?.paymentMethod) {
    Swal.fire({
        title: 'Info!',
        text: 'Select in Shiping Method',
        icon: 'info',
        confirmButtonText: 'Cool',
        allowEscapeKey:false,
        allowOutsideClick:false
      })
}else{
    router.push(`/${lang}/checkout`)
}
    }
    function ClearCart(){
dispatch(cartSlice.actions.clearCart(null))
    }
    function SelectedPaymentMethod(paymentMethod:PaymentMethodSelectType){
       if (shippingMethods?.find(x=>x.id==paymentMethod.paymentMethodId)) {
        dispatch(cartSlice.actions.addedPaymentMethod(paymentMethod));
       }else{
        router.refresh();
       }
    }
if (cartItems.items.length!=0) {
    
    return (
        <div className="cart_area section_padding_100 clearfix">
        <div className="w-4/5 mx-auto">
            <div className="grid grid-cols-1">
                <div className="">
                    <div className="cart-table clearfix">
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th>{dictinoary.product}</th>
                                    <th>{dictinoary.price}</th>
                                    <th>{dictinoary.size}</th>
                                    <th>{dictinoary.quantity}</th>
                                    <th>{dictinoary.total}</th>
                                </tr>
                            </thead>
                            <tbody>
{
    cartItems.items.map((item, index) => (
        <tr key={index}>
        <td className="cart_product_img flex items-center break-words">
            <Link href={`/${lang}/productdetail/${item.Id}`}><Image width={100} height={100} src={`${apiDomen}${item.imgUrl}`} alt={`${item.name}`}/></Link>
            <h6>{item.name}</h6>
        </td>
        <td className="price text-center break-words"><span>${item.price}</span></td>
        <td className="text-center break-words"><span>{item.size}</span></td>
        <td className="qty break-words">
            <div className="quantity">
                <span onClick={()=>UpdateItem(item.Id,item.size,item.count-1)} className="qty-minus" >-</span>
                <input type="number" className="qty-text" id="qty" step="1" min="1" max="99" name="quantity" value={`${item.count}`} readOnly disabled />
                <span onClick={()=>UpdateItem(item.Id,item.size,item.count+1)} className="qty-plus" >+</span>
            </div>
        </td>
        <td className="total_price text-center break-words"><span>${(item.price*item.count).toFixed(2)}</span></td>
    </tr>
    ))
}
                             
                            </tbody>
                        </table>
                    </div>

                    <div className="cart-footer d-flex mt-30">
                        <div className="back-to-shop w-50">
                            <Link href={`/${lang}/shop/1`}>{dictinoary.continueShopping}</Link>
                        </div>
                        <div className="update-checkout w-50 text-right">
                            <button onClick={ClearCart}>{dictinoary.clearCart}</button>
                          
                        </div>
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <div className="">
                    {/* <div className="coupon-code-area mt-70">
                        <div className="cart-page-heading">
                            <h5>Cupon code</h5>
                            <p>Enter your cupone code</p>
                        </div>
                        <form action="#">
                            <input type="search" name="search" placeholder="#569ab15"/>
                            <button type="submit">Apply</button>
                        </form>
                    </div> */}
                </div>
                <div className="">
                    <div className="shipping-method-area mt-70">
                        <div className="cart-page-heading">
                            <h5>{dictinoary.shippingMethod}</h5>
                   
                        </div>
{
    ShippingMethods?.response?.map((method)=>(

<>{
    cartItems.paymentMethod?.paymentMethodId==method.id?
    <div className="grid grid-cols-2">

                        <div className="custom-control custom-radio mb-30">
                            <input defaultChecked onClick={()=>SelectedPaymentMethod({
                                paymentMethodId:method.id,
                                paymentMethodPrice:method.price,
                                paymentmethodDisCount:method.disCount
                            })} type="radio" id={method.id} name={method.id} className="custom-control-input"/>
                          

                            <label className="custom-control-label d-flex align-items-center justify-content-between" form="customRadio1">{method.content} </label>
                           
                        </div>
                        {method.disCount==0?<span> ₼ {method.price}</span>:<span className="grid grid-cols-2 gap-0"> <s>₼{method.price}</s> {method.disCount} ₼</span>}
</div>:<div className="grid grid-cols-2">

<div className="custom-control custom-radio mb-30">
    <input onClick={()=>SelectedPaymentMethod({
        paymentMethodId:method.id,
        paymentMethodPrice:method.price,
        paymentmethodDisCount:method.disCount
    })} type="radio" id={method.id} name={method.id} className="custom-control-input"/>
  

    <label className="custom-control-label d-flex align-items-center justify-content-between" form="customRadio1">{method.content} </label>
   
</div>
{method.disCount==0?<span> ₼ {method.price}</span>:<span className="grid grid-cols-2 gap-0"> <s>₼{method.price}</s> {method.disCount} ₼</span>}
</div>
}
</>
    ))
}


                     
                    </div>
                </div>
                <div className="">
                    <div className="cart-total-area mt-70">
                        <div className="cart-page-heading">
                            <h5>{dictinoary.cartTotal}</h5>
                            <p>{dictinoary.finalInfo}</p>
                        </div>

                        <ul className="cart-total-chart">
                            <li><span>{dictinoary.subtotal}</span> <span> ₼ {cartItems.totalAmount}</span></li>
                            <li><span>{dictinoary.shipping}</span>  {cartItems.paymentMethod?.paymentmethodDisCount==0?<span> ₼ {cartItems.paymentMethod?.paymentMethodPrice}</span>:<span> ₼ {cartItems.paymentMethod?.paymentmethodDisCount}</span>}</li>
                            <li><span><strong>{dictinoary.total}</strong></span> <span><strong> ₼  {cartItems.paymentMethod?.paymentmethodDisCount==0? cartItems.totalAmount+cartItems.paymentMethod.paymentMethodPrice:
                            cartItems.paymentMethod?.paymentmethodDisCount? cartItems.totalAmount+cartItems.paymentMethod?.paymentmethodDisCount:cartItems.totalAmount}</strong></span></li>
                        </ul>
                        <button onClick={async () =>checkOutBtn()}  className="btn karl-checkout-btn text-center">{dictinoary.proceedToCheckout}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}else{
    return(
    <div className="w-4/5 mx-auto my-2">

    <Alert variant="outlined" severity="info">
       {dictinoary.emptyCart}
      </Alert>
    </div>
      )
}
}
export default Cart