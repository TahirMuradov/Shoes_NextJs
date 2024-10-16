import Cart from "@/components/Cart/Cart"
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Result from "@/types/ApiResultType";
import GetAllShippingMethod from "@/types/ShippingMethodType/GetALLShippingMethod";



export default async function Page ({
    params: { lang },
  }: {
    params: { lang: Locale };
  }){
    try {
      const apiDomen = process.env.apiDomen;
      const dictionary= (await getDictionary(lang)).Cart
      const responseShippinhMethod=await fetch(`${apiDomen}api/ShippingMethod/GetShippingMethodForUI`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'langCode': `${lang}`,
          'Accept-Language': `${lang}`
        },
        cache:"no-store",
       method: "GET",
      })
      if (!responseShippinhMethod.ok) {
        console.log("Error in CartDetail fetching ShippinhMethod:", responseShippinhMethod.statusText);
        return;
      }

var shippingMethodResult:Result<GetAllShippingMethod[]>=await responseShippinhMethod.json();

      return(<Cart  apiDomen={apiDomen} ShippingMethods={shippingMethodResult} dictinoary={dictionary} lang={lang}/>)

    }catch(error){
console.log("Fetch Failed in Cart:",error)
    }

}