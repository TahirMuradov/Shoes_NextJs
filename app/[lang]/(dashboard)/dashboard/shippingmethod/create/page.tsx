import ShippingMethodCreateForm from "@/dashboardComponents/ShippingMethodComponents/ShippingMethodCreateForm";
import { Locale } from "@/i18n-config"


const page = ({params:{lang}}:{params:{lang:Locale}}) => {
    const apiDomen = process.env.apiDomen;
  return (
   <ShippingMethodCreateForm apiDomen={apiDomen}  lang={lang}  key={1}/>
  )
}

export default page