"use client"
import { i18n, Locale } from "@/i18n-config";
import Result from "@/types/ApiResultType"
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../common/Loader";
import GetPaymentMethodForUpdate from "@/types/PaymentMethodTypes/GetPaymentMethodForUpdate";


const UpdatePaymentMethodForm:React.FC<{lang:Locale,apiDomen:string|undefined,id:string}>=({
    apiDomen,
    id,
    lang
})=>{
const [shippingMethod,SetShippingMethod]=useState<Result<GetPaymentMethodForUpdate>|null>(null);
    const[loader,SetLoader]=useState<boolean>(false)
    const router=useRouter();
    useEffect(()=>{
        fetch(`${apiDomen}api/PaymentMethod/GetPaymentMethoForUpdate?Id=${id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'LangCode': `${lang}`, 
          }
      })
      .then(response =>  response.json())
      .then(result => {
          if (result.isSuccess) {
        SetShippingMethod(result)
         console.log("then result",result)
     
       
          } else {
              Swal.fire({
                  title: 'Error!',
                  text: result.message || 'Failed to Update Payment Method!',
                  icon: 'error',
                  confirmButtonText: 'Cool'
              });
          }
      })
      .catch(error => {
      
          Swal.fire({
              title: 'Error!',
              text: 'An unexpected error occurred!',
              icon: 'error',
              confirmButtonText: 'Cool'
          });
      });
      },[])

      function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
       e.preventDefault();
       SetLoader(true)
       const form = new FormData(e.currentTarget);      
   
       const newItems: { key: string, value: string | null }[] = [];

       for (const key of i18n.locales) {
           const inputValue = form.get(`PaymentMethodContent${key}`);

           if (inputValue !== null) {
               newItems.push({
                   key,
                   value: inputValue as string,
               });
      
           } else {
               Swal.fire({
                   title: 'Error!',
                   text: 'Inspecti de duzelis etme datalar duzgun gelmir!',
                   icon: 'error',
                   confirmButtonText: 'Cool'
                 }).then(res=>{
                   if (res.isConfirmed) {
                      
                       router.refresh(); // Reload the page if the locale doesn't match
                   }
                 })
               return;
           }
       }    
       console.log(form.get("isApi"))
       fetch(`${apiDomen}api/PaymentMethod/UpdatePaymentMethod`, {
           method:'PUT',
           headers: {
               'Content-Type': 'application/json',
               'LangCode': `${lang}`, // Or whatever language code you want to send
           },
           body: JSON.stringify({         
                id:id,          
                isApi:form.get("isApi")=="on"?true:false,
                lang:newItems.reduce((acc, item) => {
                       acc[item.key] = item.value;
                       return acc;
                   }, {} as { [key: string]: string | null }),
           
           }),
       })
       .then(response => response.json())
       .then(result => {
           if (result.isSuccess) {
               Swal.fire({
                   title: 'Success!',
                   text: 'Payment Method updated successfully!',
                   icon: 'success',
                   confirmButtonText: 'Cool'
               }).then((res) => {
                   if (res.isConfirmed) {
                     SetLoader(false)
                   
                 
                   
                       router.push("/dashboard/paymentmethod/1")
                   }
               });
           } else {
          console.log(result)
               Swal.fire({
                   title: 'Error!',
                   text: result.messages || 'Failed to updated Payment Method!',
                   icon: 'error',
                   confirmButtonText: 'Cool'
               }).then(res=>{
                 SetLoader(false)
                 
                 router.refresh();
               });
           }
       })
       .catch(error => {
           Swal.fire({
               title: 'Error!',
               text: 'An unexpected error occurred!',
               icon: 'error',
               confirmButtonText: 'Cool'
           }).then(x=>{
             SetLoader(false)
          
             router.refresh();
           });
       });
      
   }
   if (loader) {
       return(<Loader/>)
   }
   return(<form id="addPaymentgMethod" onSubmit={HandleSubmit}>
    <div className="grid grid-cols-4 gap-6 mb-6">
    <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
                <label htmlFor="productCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Payment Method Content:
                </label>
                {
            shippingMethod !== null && shippingMethod?.response?.content ? 
            Object.entries(shippingMethod?.response.content).map(([key, value]) => (
              i18n.locales.includes(key as Locale) ? (
                <input
                  key={key}
                  placeholder={`Payment Method Content in ${key.toUpperCase()} Language`}
                  type="text"
                  id={key}
                  name={`PaymentMethodContent${key}`}
                  defaultValue={`${value}` || ""}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              ) : null
            ))
          : null
             }
            </div>
            <div className="col-span-2">
            <div className="flex items-center">
 {
    shippingMethod?.response.isApi? <input defaultChecked  id="isApi" name="isApi" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>:<input  id="isApi"name="isApi" type="checkbox"  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
 } 
<label htmlFor="isApi" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Is Online Payment</label>
</div>
      </div>


    </div>

    <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                   focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                   text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Submit
    </button>
</form>)
}


export default UpdatePaymentMethodForm