import LocaleSwitcher from "@/components/locale-switcher/Locale-switcher"
import { Locale } from "@/i18n-config"
import Link from "next/link"


const page = ({params:{lang}}:{params:{lang:Locale}}) => {
  return (
    <nav><ul>
    <li><Link href="/az">Home</Link></li>
  </ul></nav>
  )
}

export default page