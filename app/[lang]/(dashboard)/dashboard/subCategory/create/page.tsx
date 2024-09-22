
import { i18n, Locale } from "@/i18n-config";

import Loader from "@/dashboardComponents/common/Loader";
import SubCategoryCreateForm from "@/dashboardComponents/SubCategoryComponents/SubCategoryCreateForm/SubCategoryCreateFrom";
import Result from "@/types/ApiResultType";
import GetCategoryAllDashboard from "@/types/CategoryTypes/GetALLCategory";

const Page: React.FC<{params:{lang:Locale}}> = async ({params:{lang}}) => {

    const apiDomen = process.env.apiDomen;


 return (
     <SubCategoryCreateForm params={{lang:lang,apiDomen:apiDomen}}/>
 );

  
};

export default Page;
