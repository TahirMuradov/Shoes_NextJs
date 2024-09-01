import { Locale } from '@/i18n-config'
import React from 'react'

const page = ({ params }: { params: { lang: Locale,id:string } }) => {
  return (
    <div>{params.id}</div>
  )
}

export default page