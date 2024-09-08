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

    // Fetch data from the API
    const responseSize = await fetch(`${apiDomen}api/Size/GetAllSize`, {
        cache:"no-store",
      method: "GET",
    });
    const responseSubCategory = await fetch(`${apiDomen}/api/SubCategory/GetAllSubCategory`, {
      headers:{
        'LangCode':`${lang}`
      },
      cache:"no-store",
    method: "GET",
  });
    // Check if the response is OK (status 200-299)
    if (!responseSize.ok) {
      throw new Error(`HTTP error! status: ${responseSize.status}`);
    }

    // Parse the JSON data from the response
    const dataSize:Result<GetSize[]>= await responseSize.json();
 
    const dataSubCategory:Result< GetSubCategory[]>= await responseSubCategory.json();
  

    return (
      <ProductCreateForm apiDomen={apiDomen} key={1} lang={lang}sizes={dataSize.response} subcategories={dataSubCategory.response} />
     )
  
  } catch (error) {
    // Log any errors that occur during the fetch
    console.error('Error fetching data:', error);
  }
}

export default page
