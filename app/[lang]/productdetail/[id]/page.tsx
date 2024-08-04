import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { ProductDetail as productType } from "@/types/ProductDetail.type";
import {ProductDetailDatas}from'@/types/data'

export default function Page ({ params }: { params: { id: string } }){
    const Data:productType|null|undefined=ProductDetailDatas.find(x=>x.id==params.id)
    // async function generateStaticParams() {
     
    //     const posts = await fetch('https://.../posts').then((res) => res.json())
       
    //     return posts
    //   }
    return(<>
  
    <ProductDetail
     description={Data?.description} 
     imgUrl={Data?.imgUrl} 
     information={Data?.information} 
     id={Data?.id}
     price={Data?.price}
     relatedProducts={Data?.relatedProducts}
     size={Data?.size}
     sizeInStock={Data?.sizeInStock}
     key={Data?.id}
     />
    </>
)
}

