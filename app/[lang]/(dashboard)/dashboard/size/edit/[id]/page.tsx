
import SizeUpdateForm from "@/dashboardComponents/SizeComponents/SizeUpdateForm";
import { Locale } from "@/i18n-config"
import Result from "@/types/ApiResultType";
import GetSizeForUpdate from "@/types/SizeTypes/GetSize";


const page = async ({params:{lang,id}}:{params:{lang:Locale,id:string}}) => {
  try {
    // This line should be placed at the very top of your file
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const apiDomen = process.env.apiDomen;
    // Fetch data from the API



   

    return (
      <SizeUpdateForm key={1} params={{lang:lang,id:id,apiDomen:apiDomen}}/>
     )
  
  } catch (error) {
    // Log any errors that occur during the fetch
    console.error('Error fetching data:', error);
  }
}

export default page