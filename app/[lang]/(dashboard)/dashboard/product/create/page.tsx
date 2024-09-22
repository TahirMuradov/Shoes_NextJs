import ProductCreateForm from "@/dashboardComponents/ProductComponents/ProductCreateForm"
import { Locale } from "@/i18n-config"
import Result from "@/types/ApiResultType";
import GetSize from "@/types/SizeTypes/GetSize";
import GetSubCategory from "@/types/SubCategoriesType/GetSubCategory";
import React from "react"




const page:React.FC<{params:{lang:Locale}}> = async ({params:{lang}}) => {

  try {
    // This line should be placed at the very top of your file
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const apiDomen = process.env.apiDomen;


 

  
  
 

  

    return (
      <ProductCreateForm apiDomen={apiDomen} key={1} lang={lang} />
     )
  
  } catch (error) {
    // Log any errors that occur during the fetch
    console.error('Error fetching data:', error);
  }
}

export default page
