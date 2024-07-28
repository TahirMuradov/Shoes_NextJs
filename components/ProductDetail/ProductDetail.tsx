"use client"
import {ProductDetail as ProductType} from "@/types/ProductDetail.type";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Image from "next/image";
import Slider from "react-slick";
import ProductCart from "../ProductCart/ProductCart";

const ProductDetail:React.FC<ProductType>=(Product:ProductType)=>{
const baseUrl:string="";
const settings1 = {
 
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }; const settings2 = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows:false
  };
    return(
        <section className="single_product_details_area section_padding_0_100">
        <div className="w-4/5 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div >
                    <div className="single_product_thumb">
                        <div id="product_details_slider" className="carousel slide" data-ride="carousel">

                        <Slider {...settings1}>
                            {
                                Product.imgUrl?.map((url, index) => (
                                    <div key={index}>
                                <Image src={url} width={585} height={400} alt={`${Product.description}`} objectFit="cover"/>
                                  </div>
                                ))
                            }
      
      
      </Slider>
                        </div>
                    </div>
                </div>

                <div >
                    <div className="single_product_desc">

                        <h4 className="title">{Product.description}</h4>

                        <h4 className="price">$ {Product.price}</h4>

                        <p className="available">Available: <span className="text-muted">In Stock</span></p>

                     

                        <div className="widget size mb-50">
                            <h6 className="widget-title">Size</h6>
                            <div className="widget-desc">
                                <ul>
                                    {
                                        Product.size?.map((size, index) => (
                                            <li key={index}><a className="cursor-pointer">{size}</a></li>
                                        ))
                                    }
                               
                                
                                </ul>
                            </div>
                        </div>

              
                        <form className="cart clearfix mb-50 flex" method="post">
                            <div className="quantity">
                                <span className="qty-minus" ><i className="fa fa-minus" aria-hidden="true"></i></span>
                                <input type="number" className="qty-text" id="qty" step="1" min="1" max="12" name="quantity" value="1"/>
                                <span className="qty-plus"><i className="fa fa-plus" aria-hidden="true"></i></span>
                            </div>
                            <button type="submit" name="addtocart" value="5" className="btn cart-submit block">Add to cart</button>
                        </form>

                        <Accordion>
  <AccordionSummary id="panel-header" aria-controls="panel-content">
    Information
  </AccordionSummary>
  <AccordionDetails>
  {Product.information}
  </AccordionDetails>
</Accordion>

                    </div>
                </div>
            </div>
     
        </div>
        <div className="you_may_like_area">

<div className="w-[90%]">
<div className="flex">
                    <div className="w-full">
                        <div className="section_heading text-center">
                            <h2>related Products</h2>
                        </div>
                    </div>
                </div>

<div className="slider-container">
      <Slider {...settings2}>
      

        {Product.relatedProducts?.map((product,index)=>(
<div className="px-2">

    <ProductCart product={product} key={index}/>
</div>
        ))}
        
       
      </Slider>
    </div>
</div>
        </div>
    </section>
    )
}
export default ProductDetail;