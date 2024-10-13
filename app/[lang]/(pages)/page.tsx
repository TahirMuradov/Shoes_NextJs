import HomeSlider from "@/components/HomeSlider/HomeSlider";
import NewArriwal from "@/components/NewArriwal/NewArriwal";
import TopCategory from "@/components/TopCategory/TopCategory";
import DisCountArea from "@/components/TopDiscountArea/DisCountArea";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { HomeLaunguage } from "@/types/DictionaryTypes/Dictionary";
import { Metadata } from "next";
import logo from "../../../public/İSTANBUL.png"
import GetAllHomeSliderItemType from "@/types/WebUI/HomeSliderItem/GetAllHomeSliderItemType";
import Result from "@/types/ApiResultType";
import GetNewArriwalCategory from "@/types/WebUI/NewArriwalArea/GetNewArriwalCategoriesType";
import GetNewArriwalProduct from "@/types/WebUI/NewArriwalArea/GetNewArriwalProductType";





export const metadata: Metadata = {
  
  title: 'Istanbul Shoes | Home',
  description: 'Istanbul Shoes | Home',

icons:{
  icon: logo.src,
  
}

}
export default async function Home({params:{lang}}:{params:{lang:Locale}}) {


  const dictionary:HomeLaunguage= (await getDictionary(lang)).Home
  try{

    const apiDomen = process.env.apiDomen;
    // This line should be placed at the very top of your file
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const response:Response = await  fetch(`${apiDomen}api/HomeSliderItem/GetHomeSliderItemForUI`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'langCode': `${lang}`,  
            'Accept-Language': `${lang}`
  
    },
    cache:"no-store",
    method: "GET",
  })
  if (!response.ok) {
    console.log(response)
  }
  const HomeSliderData:Result<GetAllHomeSliderItemType[]> = await response.json();
  
  
  const responseNewArriwalCategory:Response=await  fetch(`${apiDomen}api/NewArriwal/GetNewArriwalCategories`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'langCode': `${lang}`,  
            'Accept-Language': `${lang}`
  
    },
    cache:"no-store",
    method: "GET",
  })
  if (!responseNewArriwalCategory.ok) {
    console.error(responseNewArriwalCategory)
  }
  
  const NewArriwalCategory:Result<GetNewArriwalCategory[]>=await responseNewArriwalCategory.json();
  
  
  const responseNewArriwalProduct:Response=await  fetch(`${apiDomen}api/NewArriwal/GetNewArriwalProduct`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'langCode': `${lang}`,  
            'Accept-Language': `${lang}`
  
    },
    cache:"no-store",
    method: "GET",
  })
  if (!responseNewArriwalProduct.ok) {
    console.error(responseNewArriwalProduct)
  }
  
  const NewArriwalProduct:Result<GetNewArriwalProduct[]>=await responseNewArriwalProduct.json();
    return (
      <main className="">
        <DisCountArea params={{Lang:lang}}/>
  
    {
      HomeSliderData.isSuccess?
      <HomeSlider apiDomen={apiDomen}  homeSliderItem={HomeSliderData.response} dictinory={dictionary.Slider} local={lang}/>
      :null
    }   
        <TopCategory dictinory={dictionary.Category_Top} locale={lang} />
       <NewArriwal apiDomen={apiDomen} Products={NewArriwalProduct.response} Categories={NewArriwalCategory.response} dictinory={dictionary.NewArrivals} locale={lang} />
       
      </main>
    );
  }catch(error){

    console.error(error)
  }

}
