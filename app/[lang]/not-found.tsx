import Image from 'next/image'
import Link from 'next/link'
 import _404 from '@/public/404.png'
import { i18n, Locale } from '@/i18n-config'
import { NotFoundLanguage } from '@/types/DictionaryTypes/Dictionary'
import { getDictionary } from '@/get-dictionary'
import HomeIcon from '@mui/icons-material/Home';
import { headers } from 'next/headers'

export default async function NotFound() {
const headersList=headers();
  const fullUrl = headersList.get('referer') || "";
  let langUrl=fullUrl.split("/")[3];
 let locale= i18n.locales.includes( langUrl as Locale) ? (langUrl as Locale) : "az"
const dictionary= (await getDictionary(locale)).NotFound
  return (
    <div className='w-full text-center'>
        <div className="w-4/5 mx-auto flex  justify-center items-center">

<Image src={_404} width={640} height={480} alt='404'/>
        </div>
      <Link className='karl-checkout-btn border-red-500 text-black my-3' href={`/${locale}`}><HomeIcon/></Link>
    </div>
  )
}