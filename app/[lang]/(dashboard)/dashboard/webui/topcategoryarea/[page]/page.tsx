import TopCategoryAreaTable from "@/dashboardComponents/WebUi/TopCategoryArea/TopCategoryAreaTable";
import { Locale } from "@/i18n-config"

const page :React.FC<{params:{page:number,lang:Locale}}> = ({params:{page,lang}}) => {
    try {
        // This line should be placed at the very top of your file
        // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const apiDomen = process.env.apiDomen;
if (page<1)page=1;
     
        return (
    <TopCategoryAreaTable  Lang={lang} apiDomen={apiDomen} page={page}/>

         )
      
      } catch (error) {
        // Log any errors that occur during the fetch
        console.error('Error in server:', error);
      }
}

export default page