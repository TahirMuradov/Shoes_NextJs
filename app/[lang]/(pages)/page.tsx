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





export const metadata: Metadata = {
  
  title: 'Istanbul Shoes | Home',
  description: 'Istanbul Shoes | Home',

icons:{
  icon: logo.src,
  
}

}
export default async function Home({params:{lang}}:{params:{lang:Locale}}) {


  const dictionary:HomeLaunguage= (await getDictionary(lang)).Home
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
console.log(HomeSliderData)
  return (
    <main className="">
      <DisCountArea params={{Lang:lang}}/>

  {
    HomeSliderData.isSuccess?
    <HomeSlider apiDomen={apiDomen}  homeSliderItem={HomeSliderData.response} dictinory={dictionary.Slider} local={lang}/>
    :null
  }   
      <TopCategory dictinory={dictionary.Category_Top} locale={lang} />
     <NewArriwal dictinory={dictionary.NewArrivals} locale={lang} />
     
    </main>
  );
}
