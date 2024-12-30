import CreateCuponForProductForm from "@/dashboardComponents/CuponComponents/CreateCuponForProductForm";
import { Locale } from "@/i18n-config"

const page:React.FC<{params:{lang:Locale}}>=({params:{lang}})=>{
    

        const apiDomen = process.env.apiDomen;
        return<CreateCuponForProductForm params={{apiDomen:apiDomen,lang}}/> 

    }

export default page