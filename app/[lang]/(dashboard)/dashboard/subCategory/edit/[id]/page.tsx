import SubCategoryEditForm from "@/dashboardComponents/SubCategoryComponents/SubCategoryEditForm/SubCategoryEditForm";
import { Locale } from "@/i18n-config"


const page:React.FC<{ params: { lang: Locale,id:string } }> = async ({ params }) => {

 try {
  
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
          const apiDomen = process.env.apiDomen;
        

          return (
            <SubCategoryEditForm key={1}apiDomen={apiDomen} lang={params.lang} id={params.id}/>
           )
        
        } catch (error) {
        
          console.error( error);
        }
}
export default page