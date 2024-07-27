import Image from "next/image";
import  Product  from "@/types/Product";
import Link from "next/link";
interface ProductCardProps {
    product: Product;
    category:string[],
  }
const ProductCart:React.FC<ProductCardProps>=({product,category})=>{
    return(
        <Link href={`/${product.id}`}>
        <div className="single_gallery_item women wow animate-fadeIn cursor-pointer" data-wow-delay="0.2s">
     
        <div className="product-img">
            <Image src={product.img} alt=""/>
       
        </div>
  
        <div className="product-description">
            <h4 className="product-price">{product.price}</h4>
            <p>{product.description}</p>
       
        
        </div>
    </div>
        </Link>

    )
}
export default ProductCart;