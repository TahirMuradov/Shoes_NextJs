import SizeTable from "@/dashboardComponents/SizeComponents/SizeTable";
import { Locale } from "@/i18n-config"
import Result from "@/types/ApiResultType";
import PaginatedList from "@/types/Paginated.type";
import GetSize from "@/types/SizeTypes/GetAllSize";

const page:React.FC<{params:{lang:Locale,page:number}}> = async ({params:{lang,page}}) => {
  try {
    // This line should be placed at the very top of your file
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
if (page<1) {
page=1
}
   
    // Parse the JSON data from the response

    return (
      <SizeTable key={1} params={{lang:lang,page:page}}/>
     )
  
  } catch (error) {
    // Log any errors that occur during the fetch
    console.error('Error fetching data:', error);
  }
}

export default page