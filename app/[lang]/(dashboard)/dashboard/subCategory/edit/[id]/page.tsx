import SubCategoryEditForm from "@/dashboardComponents/SubCategoryComponents/SubCategoryEditForm/SubCategoryEditForm";
import { Locale } from "@/i18n-config"
import Result from "@/types/ApiResultType";
import GetCategoryAllDashboard from "@/types/CategoryTypes/GetALLCategory";
import GetSubCategoryForUpdate from "@/types/SubCategoriesType/GetSubCategoryForUpdate";

const page:React.FC<{ params: { lang: Locale,id:string } }> = async ({ params }) => {

 try {
          // This line should be placed at the very top of your file
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
          const apiDomen = process.env.apiDomen;
        

          return (
            <SubCategoryEditForm key={1}apiDomen={apiDomen} lang={params.lang} id={params.id}/>
           )
        
        } catch (error) {
          // Log any errors that occur during the fetch
          console.error('Error fetching data:', error);
        }
}
export default page