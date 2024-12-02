import { Locale } from "@/i18n-config";

const page:React.FC<{params:{lang:Locale,token:string,email:string}}>=({params})=>{
    
return(<>

{params.lang}<br/>
{params.email}<br/>
{params.token}
</>)
}
export default page
