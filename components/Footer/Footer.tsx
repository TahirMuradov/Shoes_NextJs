import Image from "next/image"
import logo from '../../public/İSTANBUL.png'
import { FooterLaunguage } from "@/types/DictionaryTypes/Dictionary";
import { Locale } from "@/i18n-config";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Link from "next/link";
interface FooterParams{
    dictionary:FooterLaunguage,
    lang:Locale
    
}
const Footer:React.FC<FooterParams>=( {dictionary,lang} )=>{
    const currentYear = new Date().getFullYear();
  return   (

    <footer className="footer_area">
    <div className="w-4/5 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-2">
        <div className="">
          <div className="single_footer_area">
            <div className="footer-logo">
              <Image src={logo} alt="logo" />
            </div>
            <div className="copywrite_text d-flex align-items-center">
              <p dangerouslySetInnerHTML={{ __html: dictionary.copywriteText.replace('{{year}}', currentYear.toString()) }} />
            </div>
          </div>
        </div>

        <div className="">
          <div className="single_footer_area">
            <ul className="footer_widget_menu">
         
          
           
             
              <li><Link href={`/${lang}`}>{dictionary.menu.home}</Link></li>
              <li><Link href={`/${lang}/shop`}>{dictionary.menu.shop}</Link></li>
              <li><Link href={`/${lang}/cart`}>{dictionary.menu.cartDetail}</Link></li>
              <li><Link href={`/${lang}/contact`}>{dictionary.menu.contact}</Link></li>
            </ul>
          </div>
        </div>
{/* 
        <div className="">
          <div className="single_footer_area">
            <ul className="footer_widget_menu">
              <li><a href="#">{dictionary.menu.myAccount}</a></li>
       
            </ul>
          </div>
        </div> */}

    
      </div>
      <div className="line"></div>

      <div className="footer_bottom_area">
        <div className="grid grid-cols-1">
          <div className="">
            <div className="footer_social_area text-center">
              <Link href="#"><InstagramIcon/></Link>
              <Link href="#"><WhatsAppIcon/></Link>
              <Link href="#"><FacebookIcon/></Link>
       
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  )

}
export default Footer