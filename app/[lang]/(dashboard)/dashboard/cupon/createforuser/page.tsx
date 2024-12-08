import CreateCuponForUserForm from "@/dashboardComponents/CuponComponents/CreateCuponForUserForm";
import { Locale } from "@/i18n-config"
import React from "react"


const page:React.FC<{params:{lang:Locale}}> = ({params:{lang}}) => {
    const apiDomen = process.env.apiDomen;
    return<CreateCuponForUserForm params={{lang,apiDomen}} key={1}/> 
}

export default page