import LocaleSwitcher from "@/components/locale-switcher/Locale-switcher"
import { Locale } from "@/i18n-config"

import Link from "next/link"



const page =async  ({params:{lang}}:{params:{lang:Locale}}) => {


  const addCategory = async () => {
    try {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
      const response = await fetch('https://localhost:7115/api/Category/AddCategory', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'LangCode': 'az', 
        },
        body: JSON.stringify({
          LangContent: {
            'az': 'Kateqoriya adı2',
            'en': 'Category Name2',
            'ru': 'Название категории2'
          }
        })
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log('Category added successfully:', result);
      } else {
        console.error('Failed to add category:', result);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  

async function GetCategory(){
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const data = await fetch('https://localhost:7115/api/Category/GetCategory?Id=edfb5ffc-6a4b-4d72-a779-08dcc477a2a0',{
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'langCode':'ru'
      },
      method: "GET",
    }
    ) .then((res) => res.json())
    .then((dta) => console.log(dta.response))
    .catch((error) => console.error('Error fetching data:', error));
}


  return (
    <nav><ul>
    <li><Link href="/az">Home</Link></li>  
  </ul></nav>
  )
}

export default page