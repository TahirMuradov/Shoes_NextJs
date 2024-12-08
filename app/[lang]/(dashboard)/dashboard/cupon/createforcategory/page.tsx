import CreateCuponForCategoryForm from "@/dashboardComponents/CuponComponents/CreateCuponForCategoryForm"
import { Locale } from "@/i18n-config"

const page:React.FC<{params:{lang:Locale}}>=({params:{lang}})=>{
    

        const apiDomen = process.env.apiDomen;
        return<CreateCuponForCategoryForm params={{apiDomen:apiDomen,lang}}/> 

    }

export default page