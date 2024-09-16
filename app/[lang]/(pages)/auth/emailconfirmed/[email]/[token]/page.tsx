
import Loader from "@/dashboardComponents/common/Loader";
import { Locale } from "@/i18n-config"
import Result from "@/types/ApiResultType";







const page:React.FC<{params:{lang:Locale,email:string,token:string}}> = async ({params:{lang,email,token}}) => {


try {

  const apiDomen = process.env.apiDomen;


  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
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
  
const data:Result<null>=await response.json();

  
if (data.isSuccess) {

return (
  <>Your Profile Confirmed</>
 )
}
return ( <Loader/> )
}catch(error){
console.log(error)
}


}



  


export default page;