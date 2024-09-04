import Result from '@/types/ApiResultType'
import GetCategoryAllDashboard from '@/types/CategoryTypes/GetALLCategory'
import PaginatedList from '@/types/Paginated.type'
import CategoryTable from '../../../../../../dashboardComponents/CategoryComponents/CategoryTable'
import { Locale } from '@/i18n-config'

const page:React.FC<{ params: { lang: Locale,page:number } }>  = async ({ params }) => {
   
        try {
          // This line should be placed at the very top of your file
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    if (params.page<1) {
     params.page=1
    }
          // Fetch data from the API
          const response = await fetch(`https://localhost:7115/api/Category/GetAllCategoryForTable?page=${params.page}`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'langCode': `${params.lang}`  // You can dynamically set this value based on user selection or other logic
            },
            cache:"no-store",
            method: "GET",
          });
    
          // Check if the response is OK (status 200-299)
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          // Parse the JSON data from the response
          const data:Result< PaginatedList<GetCategoryAllDashboard> >= await response.json();
          return (
            <CategoryTable categories={data} lang={params.lang}/>
           )
        
        } catch (error) {
          // Log any errors that occur during the fetch
          console.error('Error fetching data:', error);
        }
      
      
   

}

export default page 