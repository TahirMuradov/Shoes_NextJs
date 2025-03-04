"use client"

import Loader from "@/dashboardComponents/common/Loader";
import { i18n, Locale } from "@/i18n-config"
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

const HomeSliderItemCreateFrom:React.FC<{apiDomen:string|undefined,lang:Locale,}>=({lang,apiDomen})=>{
    const[loader,SetLoader]=useState<boolean>(false)
    const router=useRouter();
    const sessions=useSession();
   
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    SetLoader(true);
        const form = e.currentTarget;
        const formData = new FormData(form);
      
        const Title: { key: string, value: string | null }[] = [];
        const Description: { key: string, value: string | null }[] = [];

        for (const key of i18n.locales) {
            
            const title = formData.get(`Title${key}`);

const description = formData.get(`Description${key}`);

            if (description !== null) {
                Description.push({
                    key,
                    value: description as string,
                });
       
            } else {
              router.refresh()
                return;
            }
            if (title !== null) {
                Title.push({
                    key,
                    value: title as string,
                });
       
            } else {
               router.refresh();
                return;
            }
            formData.delete(`Description${key}`);            
            formData.delete(`Title${key}`);
            
        }
        formData.append("Title",JSON.stringify(Title))
        formData.append("Description",JSON.stringify(Description))
       
    
        fetch(`${apiDomen}api/HomeSliderItem/AddHomeSliderItem`, {
            method: 'POST',
            headers: {
                'LangCode': `${lang}`,  
                'Accept-Language': `${lang}`,              
                'Authorization': `Bearer ${sessions.data?.user.token}`
            },
            body: formData,
        })
        .then(response => {
                  
            if (response.status === 401) {
                Swal.fire({
                    title: 'Authorization Error!',
                    text: 'Your session has expired. Please log in again.',
                    icon: 'info',
                    confirmButtonText: 'Login',
                     allowEscapeKey:false,
                     allowOutsideClick:false                     
                }).then(res => {
                    if (res.isConfirmed) {
                        signOut({redirect:false});
                        router.push("/auth/login") ;
                        SetLoader(false);
                       
                    }
                });
                return;
            }
         

        return response.json();
           
        }).then(result=>{
            if (result) {
                
                if (result.isSuccess) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Category added successfully!',
                        icon: 'success',
                        confirmButtonText: 'Cool',
                        allowEscapeKey:false,
                        allowOutsideClick:false,
                    }).then(res => {
                        if (res.isConfirmed) {
                            router.push("/dashboard/category/1");
                            SetLoader(false);                          
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
                allowOutsideClick:false,
            }).then(res => {
                if (res.isConfirmed) {
                    SetLoader(false);
                    router.refresh();
                }
            });
        });
  
     
    

  

      };
      if(loader)return <Loader/>
    return(
        <form id="addHomeSliderItemForm" onSubmit={handleSubmit}  encType="multipart/form-data">

        <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
                <label htmlFor="productCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Title:
                </label>
                {
                i18n.locales.map((locale) => (
                    <input
                        key={locale}
                        placeholder={`Title in ${locale} Language`}
                        type="text"
                        id={`Title${locale}`}
                        name={`Title${locale}`}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                                   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                   dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                ))}
            </div>
            <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
                <label htmlFor="productCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Description:
                </label>
                {
                i18n.locales.map((locale) => (
                    <input
                        key={locale}
                        placeholder={`Description in ${locale} Language`}
                        type="text"
                        id={`Description${locale}`}
                        name={`Description${locale}`}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                                   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                   dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                ))}
            </div>
    
  
    
  

    
  
  
          <div className="col-span-4">
            <label htmlFor="pictures" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Pictures:
            </label>
            <input
              type="file"
              id="BackgroundImage"
              name="BackgroundImage"
            
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
      </form>
)
}
export default HomeSliderItemCreateFrom