import { Locale } from '@/i18n-config'
import React from 'react'

const page:React.FC<{params:{lang:Locale,id:string}}> = ({params:{lang,id}}) => {
  return (
    <div>langCode:{lang}
    id:{id}
    </div>
  )
}

export default page