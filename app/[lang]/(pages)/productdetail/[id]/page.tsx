import ProductDetail from "@/components/ProductDetail/ProductDetail";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Result from "@/types/ApiResultType";
import { ProductDetailLaunguage } from "@/types/DictionaryTypes/Dictionary";
import GetProductDetailType from "@/types/ProductTypes/GetProductDetailType";




export default async function Page ({ params }: { params: {lang:Locale, id: string } }){
    const validStr = (str:string) => str ? true : false

if (!validStr(params.id)) return null;
    

    const apiDomen = process.env.apiDomen;
    const dictionary:ProductDetailLaunguage= (await getDictionary(params.lang)).ProductDetail
    try{
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const response = await fetch(`${apiDomen}api/Product/GetProductDetail?Id=${params.id}`, {
            method: 'GET',
            cache:"no-store",
            headers: {
                'Content-Type': 'application/json',
                'LangCode': `${params.lang}`, 
                'Accept-Language': `${params.lang}`,  

            
            }
        });
        const data= await response.json();
        console.log(data)
        if (!data.isSuccess) {

            let errors = "<ul>";
            if (Array.isArray(data.messages)) {
            
                data.messages.forEach((message:string)=> {
                    errors += `<li>${message}</li>`;
                });
            } else if (data.message) {
             
                errors += `<li>${data.message}</li>`;
            }
            else if(data.errors){
       
               data.errors.Description.forEach((message:string)=> {
                   errors += `<li>${message}</li>`;
               });
            }
            errors += "</ul>";
    
          console.error(errors)

        }

        
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

