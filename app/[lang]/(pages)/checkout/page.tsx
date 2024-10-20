import Image from 'next/image';
import Logo from "@/public/İSTANBUL.png";
import { FormControlLabel, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { pink } from '@mui/material/colors';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import { CheckOutLaunguage } from '@/types/DictionaryTypes/Dictionary';
import Result from '@/types/ApiResultType';
import GetAllPaymentMethod from '@/types/PaymentMethodTypes/GetAllPaymentMethod';
import CheckOut from '@/components/checkout/Checkout';


const page = async ({ params }: { params: { lang: Locale } }) => {
  const dictionary: CheckOutLaunguage = (await getDictionary(params.lang)).CheckOut;
  const apiDomen = process.env.apiDomen;
  try{

    const response = await fetch(`${apiDomen}api/PaymentMethod/GetAllPaymentMethodForUI`, {
        method: 'GET',
        cache:"no-store",
        headers: {
            'Content-Type': 'application/json',
            'LangCode': `${params.lang}`, 
            'Accept-Language': `${params.lang}`,  

        
        }
    });
    if (!response.ok) {
console.log(response)

    }
    const data:Result<GetAllPaymentMethod[]> = await response.json();
 
    
if (data.isSuccess) {



  return (
   <CheckOut key={1} params={{ApiDomens:apiDomen,dictionary:dictionary,lang:params.lang,paymentMethods:data.response}}/>
  );

}

}catch(error){
    console.log("Failed Fetch for Get Payment Method in Checkout Page UI",error)
}
};

export default page;
