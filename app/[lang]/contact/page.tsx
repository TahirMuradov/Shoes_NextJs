import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config"
import { ContactLaunguage } from "@/types/DictionaryTypes/Dictionary";

import WhatsAppIcon from '@mui/icons-material/WhatsApp';


const page = async ({params}:{params:{lang:Locale}}) => {
    const dictionary:ContactLaunguage= (await getDictionary(params.lang)).Contact
  return (
    <section id="contact">
    <div className="text text-center py-12">
    <h3 className="text-center ">{dictionary.ContactUs}</h3>

    </div>
    <div className="w-4/5 m-auto pb-[10%]">

    <div className="grid gap-x-32 grid-cols-1 lg:grid-cols-2">
      <div className="map">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d452.3117252643741!2d49.75667013924053!3d40.30287755168066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307f18c89cd74b%3A0xf89452850aeae4d1!2s%C4%B0stanbul%20shoes!5e0!3m2!1str!2saz!4v1722850484639!5m2!1str!2saz" width="600" height="450" style={{border:0}} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div>
         <ul>
            <li> {dictionary.Adress}</li>
            <li>{dictionary.PhoneNumber} <WhatsAppIcon sx={{
      
      color: 'green'}}
     /> </li>
         </ul>
         </div>
    </div>
    </div>
  </section>
  )
}

export default page