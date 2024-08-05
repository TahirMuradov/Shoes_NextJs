import Image from "next/image";
import  Product  from "@/types/Product.type";
import Link from "next/link";
import Slider from "react-slick";
import { Locale } from "@/i18n-config";





interface ProductCardProps {
    product: Product,
    lang:Locale


  }
const ProductCart:React.FC<ProductCardProps>=({product,lang})=>{
    const baseUrl=process.env.baseUrl;
 
    const settings = {

        customPaging: function(i:number) {
         
        
          return (
            <a>
              <img width={100} height={100} src={`${product.imgUrls[i]}`} alt={`${product.description}`}/>
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
      
        <div className="single_gallery_item women wow animate-fadeIn" data-wow-delay="0.2s">
     
        <div className="product-img">
            <div className="slider-container">

        <Slider {...settings} >
            {
                product.imgUrls.map(Url=>(
                    <div key={Url}>
                    <Image src={`${Url}`}  width={1000} height={1444} alt={`${product.description}`} />
        </div>
                ))
            }
         
        
      </Slider>
            </div>
          
       
        </div>
        <Link href={`/${lang}/productdetail/${product.id}`}>
        <div className="product-description">
            <h4 className="product-price">{product.price}</h4>
            <p>{product.description}</p>
       
        
        </div>
        </Link>
    </div>

    )
}
export default ProductCart;