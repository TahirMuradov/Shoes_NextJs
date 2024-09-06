import Result from '@/types/ApiResultType'
import { Locale } from '@/i18n-config'
import ProductUpdateForm from '@/dashboardComponents/ProductComponents/ProductUpdateForm'
import GetSize from '@/types/SizeTypes/GetSize'
import GetSubCategory from '@/types/SubCategoriesType/GetSubCategory'
import GetProductForUpdate from '@/types/ProductTypes/GetProdutForUpdate'

const page:React.FC<{ params: { lang: Locale,id:string} }>  = async ({ params :{ id,lang}}) => {
   
        try {
          // This line should be placed at the very top of your file
          process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
   
          // Fetch data from the API
          const responseSize = await fetch('https://localhost:7115/api/Size/GetAllSize', {
            cache:"no-store",
          method: "GET",
        });
        const responseSubCategory = await fetch('https://localhost:7115/api/SubCategory/GetAllSubCategory', {
          headers:{
            'LangCode':`${lang}`
          },
          cache:"no-store",
        method: "GET",
      });
      const responseProduct = await fetch(`https://localhost:7115/api/Product/GetProductDetailDashboard?id=${id}`, {
        headers:{
          'LangCode':`${lang}`
        },
        cache:"no-store",
      method: "GET",
    });
          // Check if the response is OK (status 200-299)
          if (!responseSize.ok) {
            throw new Error(`HTTP error! status: ${responseSize.status}`);
          }    if (!responseSubCategory.ok) {
            throw new Error(`HTTP error! status: ${responseSubCategory.status}`);
          }
          if (!responseProduct.ok) {
            throw new Error(`HTTP error! status: ${responseProduct.status}`);
          }
          // Parse the JSON data from the response
          const backUrl = process.env.backUrl;
    const dataSize:Result<GetSize[]>= await responseSize.json();
 const dataProduct:Result<GetProductForUpdate>=await responseProduct.json();
    const dataSubCategory:Result< GetSubCategory[]>= await responseSubCategory.json();
         console.log(dataProduct.response)
    
    return (
            <ProductUpdateForm backUrl={backUrl} Product={dataProduct.response} lang={lang} sizes={dataSize.response} subcategories={dataSubCategory.response}/>
           )
        
        } catch (error) {
          // Log any errors that occur during the fetch
          console.error('Error fetching data:', error);
        }
      
      
   

}

export default page 