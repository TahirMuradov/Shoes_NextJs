import CreateCuponForSubCategoryForm from "@/dashboardComponents/CuponComponents/CreateCuponForSubCategoryForm";
import { Locale } from "@/i18n-config"

const page:React.FC<{params:{lang:Locale}}>=({params:{lang}})=>{
    

        const apiDomen = process.env.apiDomen;
        return<CreateCuponForSubCategoryForm params={{apiDomen:apiDomen,lang}}/> 

    }

export default page