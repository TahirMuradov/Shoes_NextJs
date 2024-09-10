"use client"
import { Locale } from "@/i18n-config";
import { useRouter } from "next/navigation";

import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../common/Loader";

const SizeCreateForm:React.FC<{lang:Locale,apiDomen:string|undefined}>=({lang,apiDomen})=>{
    
    const[loader,SetLoader]=useState<boolean>(false)
     const router=useRouter();
    function CheckedSizeNumber(e:ChangeEvent<HTMLInputElement>){
        if (Number.parseInt( e.target.value)<1) {
           e.target.value = '';
        } 
       
       }
       function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        SetLoader(true)
        const form = new FormData(e.currentTarget);          
        fetch(`${apiDomen}api/Size/AddSize`, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'LangCode': `${lang}`, // Or whatever language code you want to send
            },
            body:JSON.stringify({
        
              Size:form.get("Size")
          }),
        })
        .then(response => response.json())
        .then(result => {
            if (result.isSuccess) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Size added successfully!',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                }).then((res) => {
                    if (res.isConfirmed) {
                      SetLoader(false)
                    
                  
                    
                        router.push("/dashboard/size/1")
                    }
                });
            } else {
           console.log(result)
                Swal.fire({
                    title: 'Error!',
                    text: result.messages || 'Failed to added size!',
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
        return (<Loader/>)
    }
    return( <form id="addCategoryForm" onSubmit={HandleSubmit}>
        <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
                <label htmlFor="productCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 Size Number:
                </label>
             
               <input
               onChange={(e)=>CheckedSizeNumber(e)}
            
             min={0}
               type="number"
               id="size"
               name='Size'
             
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
export default SizeCreateForm