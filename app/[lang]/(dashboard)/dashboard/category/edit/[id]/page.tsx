import CategoryEditForm from "@/dashboardComponents/CategoryComponents/CategoryEditForm";
import { Locale } from "@/i18n-config";

const page:React.FC<{params:{lang:Locale,id:string}}>=({params:{id,lang}})=>{
    const apiDomen = process.env.apiDomen;
 return   <CategoryEditForm params={{id:id,lang:lang,apiDomen}}/>
}
export default page