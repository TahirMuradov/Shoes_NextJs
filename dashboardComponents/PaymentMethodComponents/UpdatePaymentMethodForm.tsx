"use client"
import { i18n, Locale } from "@/i18n-config";
import Result from "@/types/ApiResultType"
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../common/Loader";
import GetPaymentMethodForUpdate from "@/types/PaymentMethodTypes/GetPaymentMethodForUpdate";
import { signOut, useSession } from "next-auth/react";


const UpdatePaymentMethodForm:React.FC<{lang:Locale,apiDomen:string|undefined,id:string}>=({
    apiDomen,
    id,
    lang
})=>{
const [shippingMethod,SetShippingMethod]=useState<Result<GetPaymentMethodForUpdate>|null>(null);
    const[loader,SetLoader]=useState<boolean>(false)
    const router=useRouter();
    const sessions=useSession();
    useEffect(()=>{
        fetch(`${apiDomen}api/PaymentMethod/GetPaymentMethoForUpdate?Id=${id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'LangCode': `${lang}`, 
                  'Accept-Language': `${lang}`,
             'Authorization':`Bearer ${sessions.data?.user.token}`
          }
      })
      .then(response =>{ 
        
  
            if (response.status==401) {
                Swal.fire({
                    title: 'Authorization Error!',
                    text: 'Your session has expired. Please log in again.',
                    icon: 'info',
                    confirmButtonText: 'Login',
                     allowEscapeKey:false,
                     allowOutsideClick:false                     
                }).then(res => {
                    if (res.isConfirmed) {
                        signOut(); 
                        SetLoader(false);
                                        }
                });
                return ;
            }else if(!response.ok){
                Swal.fire({
                    title: 'Error!',
                    text: 'An unexpected error occurred!',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                }).then(x=>{
                  if (x.isConfirmed) {
                     SetLoader(false)      
                 signOut()
                    }
                });
                return ;
            }
     
        
        return  response.json()})
      .then(result => {
        if (result) {
            
            if (result.isSuccess) {
          SetShippingMethod(result)
          
       
         
            } else {
              let errors = "<ul>";
              if (Array.isArray(result.messages)) {
              
                  result.messages.forEach((message:string)=> {
                      errors += `<li>${message}</li>`;
                  });
              } else if (result.message) {
               
                  errors += `<li>${result.message}</li>`;
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
                      SetLoader(false);
                     router.refresh();
                  }
              });
            }
        }
      })
      .catch(error => {
      
          Swal.fire({
              title: 'Error!',
              text: 'An unexpected error occurred!',
              icon: 'error',
              confirmButtonText: 'Cool',
              allowEscapeKey:false,
              allowOutsideClick:false,

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
   
       fetch(`${apiDomen}api/PaymentMethod/UpdatePaymentMethod`, {
           method:'PUT',
           headers: {
               'Content-Type': 'application/json',
               'LangCode': `${lang}`, // Or whatever language code you want to send
               'Accept-Language': `${lang}`,
                  'Authorization':`Bearer ${sessions.data?.user.token}`
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
       .then(response => {
        if (response.status==401) {
            Swal.fire({
                title: 'Authorization Error!',
                text: 'Your session has expired. Please log in again.',
                icon: 'info',
                confirmButtonText: 'Login',
                 allowEscapeKey:false,
                 allowOutsideClick:false                     
            }).then(res => {
                if (res.isConfirmed) {
                    signOut(); 
                    SetLoader(false);
                    router.refresh();
                }
            });
            return;
        }else if(!response.ok){
            Swal.fire({
                title: 'Error!',
                text: 'An unexpected error occurred!',
                icon: 'error',
                confirmButtonText: 'Cool'
            }).then(x=>{
              if (x.isConfirmed) {
                 SetLoader(false)  
             signOut()
                router.refresh();
              }
            });
            return;
        }
        return response.json()
    })
       .then(result => {
        if (result) {
            
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
    
             let errors = "<ul>";
             if (Array.isArray(result.messages)) {
             
                 result.messages.forEach((message:string)=> {
                     errors += `<li>${message}</li>`;
                 });
             } else if (result.message) {
              
                 errors += `<li>${result.message}</li>`;
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
                     SetLoader(false);
                     router.refresh();
                 }
             });
            }
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