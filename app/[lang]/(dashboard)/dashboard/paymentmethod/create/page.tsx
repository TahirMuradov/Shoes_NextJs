import CreatePaymentMethodForm from "@/dashboardComponents/PaymentMethodComponents/CreatePaymentMethodForm";
import { Locale } from "@/i18n-config";

const page = ({params:{lang}}:{params:{lang:Locale}}) => {
    try {

        const apiDomen = process.env.apiDomen;
  
     
        return (
          <CreatePaymentMethodForm apiDomen={apiDomen}  lang={lang} key={1}/>
         )
      
      } catch (error) {
        // Log any errors that occur during the fetch
        console.error('Error fetching data:', error);
      }
}

export default page