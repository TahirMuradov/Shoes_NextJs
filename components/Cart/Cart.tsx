
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
interface CartParasm{
    lang:Locale,
    dictinoary:CartLanguage
}

const Cart:React.FC<CartParasm>=({lang,dictinoary})=>{
    const cartItems:CartType=useAppSelector((state)=>state.cart);
    const dispatch=useAppDispatch();
    
    function UpdateItem(id:string,size:number,count:number){
dispatch(cartSlice.actions.updateCart({
    id: id,
    quantity:count,
    size:size
})

)
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
        <td className="cart_product_img flex items-center">
            <Link href={`/${lang}/productdetail/${item.Id}`}><Image width={100} height={100} src={`${item.imgUrl}`} alt={`${item.name}`}/></Link>
            <h6>{item.name}</h6>
        </td>
        <td className="price"><span>${item.price}</span></td>
        <td className="text-center"><span>{item.size}</span></td>
        <td className="qty">
            <div className="quantity">
                <span onClick={()=>UpdateItem(item.Id,item.size,item.count-1)} className="qty-minus" >-</span>
                <input type="number" className="qty-text" id="qty" step="1" min="1" max="99" name="quantity" value={`${item.count}`} readOnly disabled />
                <span onClick={()=>UpdateItem(item.Id,item.size,item.count+1)} className="qty-plus" >+</span>
            </div>
        </td>
        <td className="total_price"><span>${(item.price*item.count).toFixed(2)}</span></td>
    </tr>
    ))
}
                             
                            </tbody>
                        </table>
                    </div>

                    <div className="cart-footer d-flex mt-30">
                        <div className="back-to-shop w-50">
                            <Link href={`/${lang}/shop`}>{dictinoary.continueShopping}</Link>
                        </div>
                        <div className="update-checkout w-50 text-right">
                            <a href="#">{dictinoary.clearCart}</a>
                          
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

                        <div className="custom-control custom-radio mb-30">
                            <input type="radio" id="customRadio1" name="customRadio" className="custom-control-input"/>
                            <label className="custom-control-label d-flex align-items-center justify-content-between" form="customRadio1"><span>Next day delivery</span><span>$4.99</span></label>
                        </div>

                        <div className="custom-control custom-radio mb-30">
                            <input type="radio" id="customRadio2" name="customRadio" className="custom-control-input"/>
                            <label className="custom-control-label d-flex align-items-center justify-content-between" form="customRadio2"><span>Standard delivery</span><span>$1.99</span></label>
                        </div>

                        <div className="custom-control custom-radio">
                            <input type="radio" id="customRadio3" name="customRadio" className="custom-control-input"/>
                            <label className="custom-control-label d-flex align-items-center justify-content-between" form="customRadio3"><span>Personal Pickup</span><span>Free</span></label>
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="cart-total-area mt-70">
                        <div className="cart-page-heading">
                            <h5>{dictinoary.cartTotal}</h5>
                            <p>{dictinoary.finalInfo}</p>
                        </div>

                        <ul className="cart-total-chart">
                            <li><span>{dictinoary.subtotal}</span> <span>$59.90</span></li>
                            <li><span>{dictinoary.shipping}</span> <span>Free</span></li>
                            <li><span><strong>{dictinoary.total}</strong></span> <span><strong>$59.90</strong></span></li>
                        </ul>
                        <a href="checkout.html" className="btn karl-checkout-btn">{dictinoary.proceedToCheckout}</a>
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