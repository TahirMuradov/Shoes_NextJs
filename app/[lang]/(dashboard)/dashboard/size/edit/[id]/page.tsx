
import SizeUpdateForm from "@/dashboardComponents/SizeComponents/SizeUpdateForm";
import { Locale } from "@/i18n-config"
import Result from "@/types/ApiResultType";
import GetSizeForUpdate from "@/types/SizeTypes/GetSizeForUpdate";


const page = async ({params:{lang,id}}:{params:{lang:Locale,id:string}}) => {
  try {
    // This line should be placed at the very top of your file
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    // Fetch data from the API
    const response = await fetch(`https://localhost:7115/api/Size/GetSize?Id=${id}`, {
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
      <SizeUpdateForm key={1} params={{lang:lang,Size:data.response,id:id}}/>
     )
  
  } catch (error) {
    // Log any errors that occur during the fetch
    console.error('Error fetching data:', error);
  }
}

export default page