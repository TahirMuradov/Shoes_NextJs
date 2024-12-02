import ForgotPassword from "@/components/Auth/ForgotPassword";
import { Locale } from "@/i18n-config";


const forgotPassword:React.FC<{Lang:Locale}> = ({Lang}) => {



  try {
    const apiDomen = process.env.apiDomen;
    return <ForgotPassword key={1} lang={Lang} apiDomen={apiDomen}/>
  } catch (error) {
    
  }
}
export default forgotPassword