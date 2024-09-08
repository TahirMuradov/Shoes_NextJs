
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
    const response = await fetch(`${apiDomen}api/Size/GetSize?Id=${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'langCode': `${lang}`  // You can dynamically set this value based on user selection or other logic
      },
      cache:"no-store",
      method: "GET",
    });

    // Check if the response is OK (status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the JSON data from the response
    const data:Result<GetSizeForUpdate>= await response.json();
    return (
      <SizeUpdateForm key={1} params={{lang:lang,Size:data.response,id:id,apiDOmen:apiDomen}}/>
     )
  
  } catch (error) {
    // Log any errors that occur during the fetch
    console.error('Error fetching data:', error);
  }
}

export default page