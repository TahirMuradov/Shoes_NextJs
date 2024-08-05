import Cart from "@/components/Cart/Cart"
import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";



export default async function Page ({
    params: { lang },
  }: {
    params: { lang: Locale };
  }){

    const dictionary= (await getDictionary(lang)).Cart
    return(<Cart dictinoary={dictionary} lang={lang}/>)
}