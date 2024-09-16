import { Locale } from '@/i18n-config'

import ProductsTable from '@/dashboardComponents/ProductComponents/ProductsTable'

const page:React.FC<{ params: { lang: Locale,page:number } }>  = async ({ params:{lang,page} }) => {
   
        try {
          
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    if (page<1) {
     page=1
    }
         
        
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