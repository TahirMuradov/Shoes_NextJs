import ChangePasswordForm from "@/components/Auth/ChangePasswordForm";
import { Locale } from "@/i18n-config";
import Result from "@/types/ApiResultType";


const page:React.FC<{params:{lang:Locale,token:string,email:string}}>=async ({params})=>{
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const apiDomen = process.env.apiDomen;
    const response = await fetch(
        `${apiDomen}api/Auth/CheckTokenForForgotPassword?Email=${encodeURIComponent(params.email)}&Token=${encodeURIComponent(params.token)}`
      );
   const result:Result<null>= await response.json();
    if (result.isSuccess) {
        return <ChangePasswordForm apiDomen={apiDomen} email={params.email} lang={params.lang} token={params.token} key={1}/>
    }
return(<>

{decodeURIComponent( params.lang)}<br/>
{decodeURIComponent( params.email)}<br/>
{decodeURIComponent( params.token)}
</>)
}
export default page
