import Image from "next/image";
import  Product  from "@/types/Product";
import Link from "next/link";
import Slider from "react-slick";
import { useRef } from "react";



interface ProductCardProps {
    product: Product;

  }
const ProductCart:React.FC<ProductCardProps>=({product})=>{
    const baseUrl='http://localhost:3000/img/product-img';
    let sliderRef = useRef(null);
    const settings = {

        customPaging: function(i:number) {
          return (
            <a>
              <img src={`${baseUrl}/product-${i + 1}.jpg`} />
            </a>
          );
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        autoplay:true,
    
    
        
      };
    return(
      
        <div className="single_gallery_item women wow animate-fadeIn cursor-pointer" data-wow-delay="0.2s">
     
        <div className="product-img">
            <div className="slider-container">

        <Slider {...settings} ref={(slider:any)=>(sliderRef = slider)}>
            {
                product.imgUrls.map(Url=>(
                    <div>
                    <Image src={`${Url}`}  width={1000} height={1444} alt={`${product.description}`} />
        </div>
                ))
            }
         
        
      </Slider>
            </div>
          
       
        </div>
        <Link href={`/${product.id}`}>
        <div className="product-description">
            <h4 className="product-price">{product.price}</h4>
            <p>{product.description}</p>
       
        
        </div>
        </Link>
    </div>

    )
}
export default ProductCart;