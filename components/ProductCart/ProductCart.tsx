import Image from "next/image";

import Link from "next/link";
import Slider from "react-slick";
import { Locale } from "@/i18n-config";
import GetProductForUIType from "@/types/ProductTypes/GetProductForUIType";





interface ProductCardProps {
    product: GetProductForUIType,
    lang:Locale,
    apiDomen:string|undefined


  }
const ProductCart:React.FC<ProductCardProps>=({product,lang,apiDomen})=>{
    const baseUrl=process.env.baseUrl;
 
    const settings = {

        customPaging: function(i:number) {
         
        
          return (
            <a>
              <img width={100} height={100} src={`${apiDomen}${product.imgUrls[i]}`} alt={`${product.title}`}/>
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
                    <Image src={`${apiDomen}${Url}`}  width={345} height={498} alt={`${product.title}`} />
        </div>
                ))
            }
         
        
      </Slider>
            </div>
          
       
        </div>
        <Link href={`/${lang}/productdetail/${product.id}`}>
        <div className="product-description">
          {
            product.disCount==0? null:<h4 className="product-price"><s>
               {product.price }  azn
              </s>
              &nbsp;&nbsp;&nbsp;
            
            {product.disCount}     azn
            </h4>
          }
            
            <p>{product.title}</p>
       
        
        </div>
        </Link>
    </div>

    )
}
export default ProductCart;