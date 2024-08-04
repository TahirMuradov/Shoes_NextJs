import { getDictionary } from '@/get-dictionary';
import { Locale } from '@/i18n-config';


const _404 = async ({
  params: { lang },
}: {
  params: { lang: Locale };
}) => {
  const dictionary = await getDictionary(lang);
  return (
    <div>{dictionary.products.cart}</div>
  )
}

export default _404