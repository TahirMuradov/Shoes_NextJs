import ForgotPassword from "@/components/Auth/ForgotPassword";
import { Locale } from "@/i18n-config";


const forgotPassword:React.FC<{params:{lang:Locale}}> = ({params}) => {



  try {
    const apiDomen = process.env.apiDomen;
    return <ForgotPassword key={1} lang={params.lang} apiDomen={apiDomen}/>
  } catch (error) {
    
  }
}
export default forgotPassword