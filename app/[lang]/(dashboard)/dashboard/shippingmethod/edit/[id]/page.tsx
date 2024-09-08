import { Locale } from "@/i18n-config"


const page:React.FC<{params:{lang:Locale,id:string}}> = ({params:{lang,id}}) => {
  return (
    <div>page</div>
  )
}

export default page