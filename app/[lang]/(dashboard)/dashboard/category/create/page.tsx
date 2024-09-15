import CategoryCreateForm from '@/dashboardComponents/CategoryComponents/CategoryCreateForm';
import { Locale } from '@/i18n-config'

import React from 'react'

const page = ({params:{lang}}:{params:{lang:Locale}}) => {
    const apiDomen = process.env.apiDomen;

  return (
   <CategoryCreateForm params={{lang:lang,apiDomen}}/>
  )
}

export default page



