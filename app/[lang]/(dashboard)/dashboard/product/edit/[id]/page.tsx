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
          const apiDomen = process.env.apiDomen;

       
    
    return (
            <ProductUpdateForm apiDomen={apiDomen}  lang={lang} id={id}/>
           )
        
        } catch (error) {
          // Log any errors that occur during the fetch
          console.error('Error fetching data:', error);
        }
      
      
   

}

export default page 