"use client"
import { i18n, Locale } from "@/i18n-config"
import Result from "@/types/ApiResultType";
import GetSize from "@/types/SizeTypes/GetSize";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../common/Loader";
import { signOut, useSession } from "next-auth/react";



const SizeUpdateForm:React.FC<{params:{lang:Locale,id:string,apiDomen:string|undefined}}> = ({params:{id,lang,apiDomen}}) => {
    const[size,SetSize]=useState<Result<GetSize>|null>(null);
    const[loader,SetLoader]=useState<boolean>(false)
        const router=useRouter();
    const sessions=useSession();


useEffect(()=>{
    SetLoader(true)
    fetch(`${apiDomen}api/Size/GetSize?Id=${id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'langCode': `${lang}` ,
            'Accept-Language': `${lang}`,
             'Authorization':`Bearer ${sessions.data?.user.token}`
        },
        cache:"no-store",
        method: "GET",
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
        }
        
        return response.json()
    })
       .then(result => {
        
        if (result) {
            if (result.isSuccess) {
              SetSize(result)
              SetLoader(false)
            }
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
                     SetLoader(false);
                     SetSize(null);
                     router.refresh();
                 }
             });
            }

        }

       })
       .catch(error => {
           Swal.fire({
               title: 'Error!',
               text: `An unexpected error occurred!${error}`,
               icon: 'error',
               confirmButtonText: 'Cool',
               allowEnterKey:false,
               allowOutsideClick:false
           }).then((x)=>{
            if(x.isConfirmed){
SetSize(null)
                SetLoader(false)
             
                router.refresh();
            }
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
        fetch(`${apiDomen}api/Size/UpdateSize`, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                'LangCode': `${lang}`, 
                'Accept-Language': `${lang}`,
                   'Authorization':`Bearer ${sessions.data?.user.token}`
            },
            body:JSON.stringify({
              id:id, 
              NewSizeNumber:form.get("Size")
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
            }  
          return  response.json()
        })
        .then(result => {
            if (result) {
                
                if (result.isSuccess) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Size updated successfully!',
                        icon: 'success',
                        confirmButtonText: 'Cool',
                        allowEscapeKey:false,
                        allowOutsideClick:false
                    }).then((res) => {
                        if (res.isConfirmed) {
                          SetLoader(false)                 
                         router.push("/dashboard/size/1")
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
                text: `${error}`,
                icon: 'error',
                confirmButtonText: 'Cool',
                allowEscapeKey:false,
                allowOutsideClick:false
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
               size?.response!== null ? 
               <input
               onChange={(e)=>CheckedSizeNumber(e)}
               key={size?.response.id}
             min={0}
               type="number"
               id={size?.response.id}
               name='Size'
               defaultValue={`${size?.response.size}` || ""}
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