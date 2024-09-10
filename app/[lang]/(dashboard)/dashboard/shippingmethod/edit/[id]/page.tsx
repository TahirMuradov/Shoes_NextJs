import ShippingMethodEditForm from "@/dashboardComponents/ShippingMethodComponents/ShippingMethodEditForm";
import { Locale } from "@/i18n-config"


const page:React.FC<{params:{lang:Locale,id:string}}> = ({params:{lang,id}}) => {
  const apiDomen = process.env.apiDomen;
  return (
   <ShippingMethodEditForm apiDomen={apiDomen} id={id}  lang={lang} key={1}/>
  )
}

export default page