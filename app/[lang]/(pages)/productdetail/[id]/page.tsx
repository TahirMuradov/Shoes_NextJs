import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { ProductDetailLaunguage } from "@/types/DictionaryTypes/Dictionary";
import { ProductDetail as productType } from "@/types/ProductDetail.type";
import {ProductDetailDatas}from'@/types/data'
import { NextRequest } from "next/server";

export default async function Page ({ params }: { params: {lang:Locale, id: string } }){
    const Data:productType|null|undefined=ProductDetailDatas.find(x=>x.id==params.id)
  
    const dictionary:ProductDetailLaunguage= (await getDictionary(params.lang)).ProductDetail
    // async function generateStaticParams() {
     
    //     const posts = await fetch('https://.../posts').then((res) => res.json())
       
    //     return posts
    //   }
    return(<>
  
    <ProductDetail
    Product={Data}
     dictionary={dictionary}
     lang={params.lang}
     key={Data?.id}
     />
    </>
)
}

