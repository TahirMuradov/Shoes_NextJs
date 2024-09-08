import SubCategoryTable from "@/dashboardComponents/SubCategoryComponents/SubactegoryTables"
import { Locale } from "@/i18n-config";
import Result from "@/types/ApiResultType";
import PaginatedList from "@/types/Paginated.type";
import GetSubCategory from "@/types/SubCategoriesType/GetSubCategory";


const page:React.FC<{params:{lang:Locale,page:number}}> = async ({params:{lang,page}})  => {
    try {
        // This line should be placed at the very top of your file
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  if(!Number.isInteger(page)||page<1){
page=1
  }
     
  
   
       
        return (
          <SubCategoryTable key={1}  Lang={lang} page={page}/>
         )
      
      } catch (error) {
        // Log any errors that occur during the fetch
        console.error('Error fetching data:', error);
      }
}

export default page