import PaymentMethodTable from "@/dashboardComponents/PaymentMethodComponents/PaymentMethodTable";
import { Locale } from "@/i18n-config"

const page = ({params:{lang,page}}:{params:{lang:Locale,page:number}}) => {

  
  try {

    const apiDomen = process.env.apiDomen;
if (page<1) {
page=1
}
 
    return (
      <PaymentMethodTable apiDomen={apiDomen}  lang={lang} page={page} key={1}/>
     )
  
  } catch (error) {
    // Log any errors that occur during the fetch
    console.error('Error fetching data:', error);
  }
}

export default page