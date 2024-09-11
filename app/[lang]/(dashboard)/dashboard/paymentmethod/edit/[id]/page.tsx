import UpdatePaymentMethodForm from '@/dashboardComponents/PaymentMethodComponents/UpdatePaymentMethodForm'
import { Locale } from '@/i18n-config'
import React from 'react'

const page:React.FC<{params:{lang:Locale,id:string}}> = ({params:{lang,id}}) => {
  try{

    
    const apiDomen = process.env.apiDomen;
  
    return (
      <UpdatePaymentMethodForm apiDomen={apiDomen} id={id} lang={lang} key={1}/>
     )
  }catch (error) {
    // Log any errors that occur during the fetch
    console.error('Error fetching data:', error);
  }

}

export default page