import SizeTable from "@/dashboardComponents/SizeComponents/SizeTable";
import { Locale } from "@/i18n-config"
import Result from "@/types/ApiResultType";
import PaginatedList from "@/types/Paginated.type";
import GetSize from "@/types/SizeTypes/GetSize";

const page:React.FC<{params:{lang:Locale,page:number}}> = async ({params:{lang,page}}) => {
  try {
    // This line should be placed at the very top of your file
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
if (page<1) {
page=1
}
    // Fetch data from the API
    const response = await fetch(`https://localhost:7115/api/Size/GetAllSize?page=${page}`, {
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
    const data:Result< PaginatedList<GetSize> >= await response.json();
    return (
      <SizeTable key={1} params={{lang:lang,page:page,Sizes:data.response}}/>
     )
  
  } catch (error) {
    // Log any errors that occur during the fetch
    console.error('Error fetching data:', error);
  }
}

export default page