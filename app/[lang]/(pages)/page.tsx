import HomeSlider from "@/components/HomeSlider/HomeSlider";
import TopCategory from "@/components/TopCategory/TopCategory";

import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import { HomeLaunguage } from "@/types/DictionaryTypes/Dictionary";
import type { Metadata } from 'next'
import Swal from "sweetalert2";
import GetHomeData from "@/types/WebUI/GetHomeData";
import Result from "@/types/ApiResultType";
import DisCountArea from "@/components/TopDiscountArea/DisCountArea";
import NewArriwal from "@/components/NewArriwal/NewArriwal";





// export const metadata: Metadata = {
  
//   title: 'Istanbul Shoes | Home',
//   description: 'Istanbul Shoes | Home',

// icons:{
//   icon: logo.src,
  
// }

// }


export const metadata: Metadata = {
  title: "Istanbul Shoes",
  description: "Get 30% off on designer bags (except new collection). Limited time offer!",
  keywords: ["shoes", "turkish shoes", "woman shoes", "accessories", "trendy bags"],
  authors: [{ name: "Istanbul Store", url: process.env.apiDomen }],


  openGraph: {
    title: "Trendy Bags - 30% Off | Fashion Store",
    description: "Get 30% off on designer bags (except new collection). Limited time offer!",
    url: "https://fashionstore.com",
    siteName: "Fashion Store",
    images: [
      {
        url: "https://fashionstore.com/images/bag-sale.jpg",
        width: 1200,
        height: 630,
        alt: "Trendy Bags Sale",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Trendy Bags - 30% Off | Fashion Store",
    description: "Get 30% off on designer bags (except new collection). Limited time offer!",
    images: ["https://fashionstore.com/images/bag-sale.jpg"],
  },

  // Diğer meta etiketler
  metadataBase: new URL("https://fashionstore.com"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      az: "/az",
      ru: "/ru",
    },
  },
};

export default async function Home({params:{lang}}:{params:{lang:Locale}}) {


  const dictionary:HomeLaunguage= (await getDictionary(lang)).Home
  try{

    const apiDomen = process.env.apiDomen;
    // This line should be placed at the very top of your file
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const response:Response = await  fetch(`${apiDomen}api/Home/GetAllData`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'langCode': `${lang}`,  
      'Accept-Language': `${lang}`
  
    },
    cache:"no-store",
    method: "GET",
  })

var result= await response.json();
if (!result.isSuccess) {
  
  let errors = "<ul>";
  if (Array.isArray(result.messages)) {
  
      result.messages.forEach((message:string)=> {
          errors += `<li>${message}</li>`;
      });
  } else if (result.message) {
   
      errors += `<li>${result.message}</li>`;
  }
  else if(result.errors){
  
     result.errors.Description.forEach((message:string)=> {
         errors += `<li>${message}</li>`;
     });
  }
  errors += "</ul>";
  
  Swal.fire({
      title: 'Error!',
      html: errors, 
      icon: 'error',
      confirmButtonText: 'Cool',
      allowEscapeKey:false,
      allowOutsideClick:false
  }).then(res => {
      if (res.isConfirmed) {
       
      }
  });
  return ;
}

const data:Result<GetHomeData>=result;
  

    return (
      <main className="">
        <DisCountArea params={{data:data.response.disCountAreas}}/>
        <HomeSlider apiDomen={apiDomen}  homeSliderItem={data.response. homeSliderItems} dictinory={dictionary.Slider} local={lang}/>
           <TopCategory data={data.response.topCategoryAreas} dictinory={dictionary.Category_Top} locale={lang} apiDomen={apiDomen} />
       <NewArriwal apiDomen={apiDomen} Products={data.response.newArriwalProducts} Categories={data.response.isFeaturedCategorys} dictinory={dictionary.NewArrivals} locale={lang} />
       
      </main>
    );
  }catch(error){
console.log(error)
  }

}
