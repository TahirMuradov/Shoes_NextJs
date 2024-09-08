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
       
          return (
            <CategoryTable  lang={params.lang} page={params.page} key={1}/>
           )
        
        } catch (error) {
          // Log any errors that occur during the fetch
          console.error('Error fetching data:', error);
        }
      
      
   

}

export default page 