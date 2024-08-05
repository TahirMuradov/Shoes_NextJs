import HomeSlider from "@/components/HomeSlider/HomeSlider";
import NewArriwal from "@/components/NewArriwal/NewArriwal";
import TopCategory from "@/components/TopCategory/TopCategory";
import DisCountArea from "@/components/TopDiscountArea/DisCountArea";
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { HomeLaunguage } from "@/types/DictionaryTypes/Dictionary";





export default async function Home({params:{lang}}:{params:{lang:Locale}}) {
  const dictionary:HomeLaunguage= (await getDictionary(lang)).Home
  return (
    <main className="">
      <DisCountArea/>
      <HomeSlider dictinory={dictionary.Slider} local={lang}/>
      <TopCategory dictinory={dictionary.Category_Top} locale={lang} />
     <NewArriwal dictinory={dictionary.NewArrivals} locale={lang} />
     
    </main>
  );
}
