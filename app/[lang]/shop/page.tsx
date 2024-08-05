import Shop from "@/components/Shop/Shop"
import { getDictionary } from "@/get-dictionary"
import { Locale } from "@/i18n-config"
import { ShopLaunguage } from "@/types/DictionaryTypes/Dictionary"



const page:React.FC<{params:{lang:Locale}}>=async ({params:{lang}})=>{
    const dictionary:ShopLaunguage= (await getDictionary(lang)).Shop
    return (<>
 
    <Shop dictinory={dictionary} lang={lang}/>
    </>
)
}
export default page