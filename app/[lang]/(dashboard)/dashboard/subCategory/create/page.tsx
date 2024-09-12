
import { i18n, Locale } from "@/i18n-config";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'
import { useState } from "react";
import Loader from "@/dashboardComponents/common/Loader";
import SubCategoryCreateForm from "@/dashboardComponents/SubCategoryComponents/SubCategoryCreateForm/SubCategoryCreateFrom";
import Result from "@/types/ApiResultType";
import GetCategoryAllDashboard from "@/types/CategoryTypes/GetALLCategory";

const Page: React.FC<{params:{lang:Locale}}> = async ({params:{lang}}) => {
  try {
    const apiDomen = process.env.apiDomen;
    // Fetch data from the API
    const response = await fetch(`${apiDomen}api/Category/GetAllCategory`, {
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'langCode': `${lang}`  // You can dynamically set this value based on user selection or other logic
     },
     cache:"no-store",
     method: "GET",
   });
const resultData:Result<GetCategoryAllDashboard[]>=await response.json();

if (!response) {
 return <Loader/>
}
 return (
     <SubCategoryCreateForm params={{lang:lang,categories:resultData.response,apiDomen:apiDomen}}/>
 );
  }catch(error){
    console.error(error);
  }
  
};

export default Page;
