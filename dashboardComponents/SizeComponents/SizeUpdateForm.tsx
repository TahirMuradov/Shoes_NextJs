"use client"
import { i18n, Locale } from "@/i18n-config"
import Result from "@/types/ApiResultType";
import GetSizeForUpdate from "@/types/SizeTypes/GetSizeForUpdate";

import { useRouter } from "next/navigation";

import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../common/Loader";


const SizeUpdateForm:React.FC<{params:{lang:Locale,id:string,Size:GetSizeForUpdate}}> = ({params:{id,lang,Size}}) => {
    const router=useRouter();
function CheckedSizeNumber(e:ChangeEvent<HTMLInputElement>){
 if (Number.parseInt( e.target.value)<1) {
    e.target.value = '';
 } 

}
    const[loader,SetLoader]=useState<boolean>(false)
    function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        SetLoader(true)
        const form = new FormData(e.currentTarget);          
        fetch('https://localhost:7115/api/Size/UpdateSize', {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                'LangCode': `${lang}`, // Or whatever language code you want to send
            },
            body:JSON.stringify({
              id:id, // ID of the size being updated
              NewSizeNumber:form.get("Size")
          }),
        })
        .then(response => response.json())
        .then(result => {
            if (result.isSuccess) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Size updated successfully!',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                }).then((res) => {
                    if (res.isConfirmed) {
                      SetLoader(false)
                    
                  
                    
                        router.push("/dashboard/size/1")// Clear the form
                    }
                });
            } else {
           console.log(result)
                Swal.fire({
                    title: 'Error!',
                    text: result.messages || 'Failed to updated size!',
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
    return (
        <form id="addCategoryForm" onSubmit={HandleSubmit}>
        <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
                <label htmlFor="productCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                 Size Number:
                </label>
                {
               Size!== null ? 
               <input
               onChange={(e)=>CheckedSizeNumber(e)}
               key={Size.id}
             min={0}
               type="number"
               id={Size.id}
               name='Size'
               defaultValue={`${Size.size}` || ""}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                          dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                          dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               required
             />
            : null
               }
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
    </form>
  )
}

export default SizeUpdateForm