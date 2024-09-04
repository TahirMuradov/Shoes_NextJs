import SizeCreateForm from "@/dashboardComponents/SizeComponents/SizeCreateForm"
import { Locale } from "@/i18n-config"


const page:React.FC<{params:{lang:Locale}}> = ({params:{lang}}) => {
  return (
  <SizeCreateForm lang={lang} key={1} />
  )
}

export default page