import { Locale } from '@/i18n-config'

import ProductsTable from '@/dashboardComponents/ProductComponents/ProductsTable'

const page:React.FC<{ params: { lang: Locale,page:number } }>  = async ({ params:{lang,page} }) => {
   
        try {
          // This line should be placed at the very top of your file
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    if (page<1) {
     page=1
    }
          // Fetch data from the API
      
          // Parse the JSON data from the response
        
          const apiDomen = process.env.apiDomen;

          return (
            < ProductsTable apiDomen={apiDomen}  Lang={lang} page={page} key={95}/>
           )
        
        } catch (error) {
          // Log any errors that occur during the fetch
          console.error('Error fetching data:', error);
        }
      
      
   

}

export default page 