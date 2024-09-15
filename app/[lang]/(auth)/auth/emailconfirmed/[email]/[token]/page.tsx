import Loader from "@/dashboardComponents/common/Loader";

import { Locale } from "@/i18n-config"
import Result from "@/types/ApiResultType";






const page:React.FC<{params:{lang:Locale,email:string,token:string}}> = async ({params:{lang,email,token}}) => {



    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const apiDomen = process.env.apiDomen;



    const response = await fetch(`${apiDomen}api/Auth/ChecekdConfirmedEmailToken`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'LangCode': lang,  // Sending LangCode in the header as required by the API
        'Accept-Language': lang  // You can add this if needed for additional localization
      },
      body:JSON.stringify({
        email:decodeURIComponent(email),
        token:decodeURIComponent(token)
      })
    });

 
    
if (response.ok) {
  
  return (
    <>Your Profile Confirmed</>
   )
}
const result:Result<null>= await response.json();
console.log(result.message)
console.log(result.messages)

  

}
export default page;