import DisCountAreaTable from "@/dashboardComponents/WebUi/DisCountArea/DisCountAreaTable";
import { Locale } from "@/i18n-config"


const page :React.FC<{params:{page:number,lang:Locale}}> = ({params:{page,lang}}) =>  {
    try {
        // This line should be placed at the very top of your file
        // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const apiDomen = process.env.apiDomen;
  if (page<1) {
   page=1
  }
     
        return (
    <DisCountAreaTable Lang={lang} apiDomen={apiDomen} page={page} key={1}/>
         )
      
      } catch (error) {
        // Log any errors that occur during the fetch
        console.error('Error fetching data:', error);
      }
}

export default page