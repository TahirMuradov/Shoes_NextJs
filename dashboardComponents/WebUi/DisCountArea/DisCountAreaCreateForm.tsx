"use client"

import Loader from "@/dashboardComponents/common/Loader";
import { i18n, Locale } from "@/i18n-config";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useState } from "react";
import Swal from "sweetalert2";

const DisCountAreaCreateForm: React.FC<{params:{lang:Locale,apiDomen:string|undefined}}> = ({params:{lang,apiDomen}}) => {

    const router=useRouter();
    const[loader,SetLoader]=useState<boolean>(false)

    const sessions=useSession();
    console.log(sessions)
    function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        SetLoader(true);

        const form = new FormData(e.currentTarget);
        const Title: { key: string, value: string | null }[] = [];
        const Description: { key: string, value: string | null }[] = [];

        for (const key of i18n.locales) {
            const title = form.get(`Title${key}`);
            const description = form.get(`Description${key}`);
            if (description !== null) {
                Description.push({
                    key,
                    value: description as string,
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
            if (title !== null) {
                Title.push({
                    key,
                    value: title as string,
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

     console.log( JSON.stringify({
        titleContent:Title,
        descriptionContent: Description
    }))
   
        fetch(`${apiDomen}api/DisCountArea/AddDiscountArea`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'LangCode': `${lang}`,  
                'Accept-Language': `${lang}`,              
                'Authorization': `Bearer ${sessions.data?.user.token}`
            },
            body: JSON.stringify({
                titleContent:Title.reduce((acc, item) => {
                    acc[item.key] = item.value;
                    return acc;
                }, {} as { [key: string]: string | null }),
                descriptionContent: Description.reduce((acc, item) => {
                    acc[item.key] = item.value;
                    return acc;
                }, {} as { [key: string]: string | null }),
            }),
        })
        .then(async response => {
                  
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
                        signOut(); 
                        SetLoader(false);
                        router.refresh();
                    }
                });
                return;
            }
            else if(!response.ok){
                console.log(response)
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

            const result = await response.json();
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
                            SetLoader(false);
                          
                            router.push("/dashboard/category/1");
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
                confirmButtonText: 'Cool',
                allowEscapeKey:false,
                allowOutsideClick:false,
            }).then(res => {
                if (res.isConfirmed) {
                    SetLoader(false);
                 
                    signOut();
                    router.refresh();
                }
            });
        });
    }
if (loader) {
    return <Loader/>
}
    return (
        <form id="addDisCountAreaForm" onSubmit={HandleSubmit}>
            <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Title
                    </label>
                    {i18n.locales.map((locale) => (
                        <input
                            key={locale}
                            placeholder={`Title  in ${locale} Language`}
                            type="text"
                            id={`${locale}`}
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
                    <label htmlFor="Description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Description
                    </label>
                    {i18n.locales.map((locale) => (
                        <input
                            key={locale}
                            placeholder={`Description  in ${locale} Language`}
                            type="text"
                            id={`${locale}`}
                            name={`Description${locale}`}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    ))}
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
    );
};
export default DisCountAreaCreateForm;