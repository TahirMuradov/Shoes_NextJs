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
          // Fetch data from the API
          const responseSubCategory = await fetch(`${apiDomen}api/SubCategory/GetSubCategoryForUpdate?Id=${params.id}`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            cache:"no-store",
            method: "GET",
          });
          const responseCategory = await fetch(`${apiDomen}api/Category/GetAllCategory`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'LangCode': `${params.lang}`
            },
            cache:"no-store",
            method: "GET",
          });
          // Check if the response is OK (status 200-299)
          if (!responseSubCategory.ok) {
         
            throw new Error(`HTTP error! status: ${responseSubCategory.status}`);
          }
          if (!responseCategory.ok) {throw new Error(`HTTP error! status: ${responseCategory.status}`); }
    
          // Parse the JSON data from the response
          const SubCategory:Result<GetSubCategoryForUpdate>= await responseSubCategory.json();
          const Category:Result<GetCategoryAllDashboard[]>= await responseCategory.json();
          return (
            <SubCategoryEditForm key={1}apiDomen={apiDomen} lang={params.lang} Categories={Category.response} Subcategory={SubCategory.response}/>
           )
        
        } catch (error) {
          // Log any errors that occur during the fetch
          console.error('Error fetching data:', error);
        }
}
export default page