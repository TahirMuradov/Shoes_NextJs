import CuponTable from "@/dashboardComponents/CuponComponents/CuponTable";
import { Locale } from "@/i18n-config";

const page:React.FC<{ params: { lang: Locale,page:number } }>  = async ({ params }) => {
   
    try {
     
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
if (params.page<1) {
 params.page=1
}
const apiDomen = process.env.apiDomen;

      return (
       
        <CuponTable apiDomen={apiDomen} lang={params.lang} page={params.page} key={1}/>
       )
    
    } catch (error) {
     
      console.error('Error fetching data:', error);
    }
  
  


}

export default page 