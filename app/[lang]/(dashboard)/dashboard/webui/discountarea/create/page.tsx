import DisCountAreaCreateForm from "@/dashboardComponents/WebUi/DisCountArea/DisCountAreaCreateForm";
import { Locale } from "@/i18n-config"


const page :React.FC<{params:{lang:Locale}}> = ({params:{lang}}) =>  {
    try {
        // This line should be placed at the very top of your file
        // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const apiDomen = process.env.apiDomen;
        return (
    <DisCountAreaCreateForm params={{apiDomen:apiDomen,lang:lang}} />
        )
      } catch (error) {
        // Log any errors that occur during the fetch
        console.error('Error in server', error);
      }
}

export default page