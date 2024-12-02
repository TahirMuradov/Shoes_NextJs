import ForgotPassword from "@/components/Auth/ForgotPassword";


const forgotPassword:React.FC=()=>{



  try {
    const apiDomen = process.env.apiDomen;
    return <ForgotPassword key={1}/>
  } catch (error) {
    
  }
}
export default forgotPassword