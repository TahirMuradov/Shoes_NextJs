import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Result from "@/types/ApiResultType";
import { ProductDetailLaunguage } from "@/types/DictionaryTypes/Dictionary";
import GetProductDetailType from "@/types/ProductTypes/GetProductDetailType";



export default async function Page ({ params }: { params: {lang:Locale, id: string } }){
    const apiDomen = process.env.apiDomen;
    const dictionary:ProductDetailLaunguage= (await getDictionary(params.lang)).ProductDetail
    try{

        const response = await fetch(`${apiDomen}api/Product/GetProductDetail?Id=${params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'LangCode': `${params.lang}`, 
                'Accept-Language': `${params.lang}`,  
            
            }
        });
        if (!response.ok) {
console.log(response)

        }
        const data:Result<GetProductDetailType> = await response.json();
      
        
if (data.isSuccess) {
   
    return(  
    <ProductDetail
    apiDomens={apiDomen}
    Product={data.response}
     dictionary={dictionary}
     lang={params.lang}
     key={params.id}
     />
)
}

    }catch(error){
        console.log(error)
    }
  
   
}

