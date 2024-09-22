"use client"
import { i18n, Locale } from "@/i18n-config";
import Result from "@/types/ApiResultType"
import GetShippingMethodForUpdate from "@/types/ShippingMethodType/GetShippingMethodForUpdate"
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../common/Loader";
import { signOut, useSession } from "next-auth/react";


const ShippingMethodEditForm:React.FC<{lang:Locale,apiDomen:string|undefined,id:string}>=({
    apiDomen,
    id,

    lang
})=>{
const [shippingMethod,SetShippingMethod]=useState<Result<GetShippingMethodForUpdate>|null>(null);
    const[loader,SetLoader]=useState<boolean>(false)
    const sessions=useSession();
    const router=useRouter();
    useEffect(()=>{
        fetch(`${apiDomen}api/ShippingMethod/GetShippingMethodForUpdate?Id=${id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'LangCode': `${lang}`, 
              'Accept-Language': `${lang}`,
                 'Authorization':`Bearer ${sessions.data?.user.token}`
          }
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
        }
      });
      return;
      }
   return     response.json()
      })
      .then(result => {
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
   function CheckedSizeNumber(e:ChangeEvent<HTMLInputElement>){
       if (Number.parseInt( e.target.value)<1) {
          e.target.value = '';
       } 
      
      }
      function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
       e.preventDefault();
       SetLoader(true)
       const form = new FormData(e.currentTarget);      
   
       const newItems: { key: string, value: string | null }[] = [];

       for (const key of i18n.locales) {
           const inputValue = form.get(`ShippingContent${key}`);

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
       fetch(`${apiDomen}api/ShippingMethod/UpdateShippingMethod?Id=${id}`, {
           method:'PUT',
           headers: {
               'Content-Type': 'application/json',
               'LangCode': `${lang}`, // Or whatever language code you want to send
               'Accept-Language': `${lang}`,
                  'Authorization':`Bearer ${sessions.data?.user.token}`
           },
           body: JSON.stringify({
            Id:id,
            discountPrice:form.get("discountPrice"),
               price:form.get("price"),
               Lang: newItems.reduce((acc, item) => {
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
       return response.json()})
       .then(result => {
           if (result.isSuccess) {
               Swal.fire({
                   title: 'Success!',
                   text: 'Shipping Method updated successfully!',
                   icon: 'success',
                   confirmButtonText: 'Cool'
               }).then((res) => {
                   if (res.isConfirmed) {
                     SetLoader(false)                
                                    
                       router.push("/dashboard/shippingmethod/1")
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
   return(<form id="addShippingMethod" onSubmit={HandleSubmit}>
       <div className="grid grid-cols-4 gap-6 mb-6">
       <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
                   <label htmlFor="productCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                       Shipping Content:
                   </label>
                   {
            shippingMethod !== null && shippingMethod?.response?.langContent ? 
            Object.entries(shippingMethod?.response.langContent).map(([key, value]) => (
              i18n.locales.includes(key as Locale) ? (
                <input
                  key={key}
                  placeholder={`Shipping Content in ${key.toUpperCase()} Language`}
                  type="text"
                  id={key}
                  name={`ShippingContent${key}`}
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
           <label htmlFor="discountPrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
             Discount Price:
           </label>
           <input
           onChange={(e)=>CheckedSizeNumber(e)}
             type="number"
             id="discountPrice"
             name="discountPrice"
             defaultValue={shippingMethod?.response.discountPrice}
             step="1"
             min={0}
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             required
           />
         </div>
 
         <div className="col-span-2">
           <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
             Price:
           </label>
           <input
            onChange={(e)=>CheckedSizeNumber(e)}
             type="number"
             id="price"
             name="price"
             step="1"
             defaultValue={shippingMethod?.response.price}
             min={0}
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             required
           />
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


export default ShippingMethodEditForm