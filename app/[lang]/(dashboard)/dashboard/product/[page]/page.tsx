import Result from '@/types/ApiResultType'
import PaginatedList from '@/types/Paginated.type'
import { Locale } from '@/i18n-config'
import GetProduct from '@/types/ProductTypes/GetProduct'
import ProductsTable from '@/dashboardComponents/ProductComponents/ProductsTable'

const page:React.FC<{ params: { lang: Locale,page:number } }>  = async ({ params:{lang,page} }) => {
   
        try {
          // This line should be placed at the very top of your file
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    if (page<1) {
     page=1
    }
          // Fetch data from the API
          const response = await fetch(`https://localhost:7115/api/Product/GetAllProductDashboard?page=${page}`, {
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
          const data:Result<PaginatedList<GetProduct> >= await response.json();
          const backUrl = process.env.backUrl;

          return (
            < ProductsTable backUrl={backUrl}  products={data.response} Lang={lang} page={page} key={95}/>
           )
        
        } catch (error) {
          // Log any errors that occur during the fetch
          console.error('Error fetching data:', error);
        }
      
      
   

}

export default page 