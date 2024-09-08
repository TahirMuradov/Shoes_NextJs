
import CategoryEditForm from '@/dashboardComponents/CategoryComponents/CategoryEditForm';
import { Locale } from '@/i18n-config'

const page = (params:{lang:Locale,id:string}) => {
  const apiDomen = process.env.apiDomen;

  return (
<CategoryEditForm params={{id:params.id,lang:params.lang,apiDomen}}/>
  )
}

export default page