"use client"
import Loader from "@/dashboardComponents/common/Loader";
import { i18n, Locale } from "@/i18n-config";
import Result from "@/types/ApiResultType";
import GetDisCountAreaForUpdate from "@/types/WebUI/DiscountArea/GetDisCountAreaForUpdateType";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UpdateDisCountAreaForm: React.FC<{params:{lang:Locale,apiDomen:string|undefined,id:string}}> = ({params:{lang,apiDomen,id}}) => {

    const router=useRouter();
    const[loader,SetLoader]=useState<boolean>(false)
const [discountArea,SetDisCountArea]=useState<Result<GetDisCountAreaForUpdate>>();
    const sessions=useSession();

    const GetCategoryFetch= async ()=>{
try {
    SetLoader(true)
    const response = await fetch(`${apiDomen}api/DisCountArea/GetDisCountAreaForUpdate?Id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': `${lang}`,  
            'Authorization': `Bearer ${sessions.data?.user.token}`
        }
    });

    if (response.status == 401) {
        Swal.fire({
            title: 'Unauthorized',
            text: 'Your session has expired. Please log in again.',
            icon: 'error',
            confirmButtonText: 'Cool',
            allowOutsideClick: false, 
            allowEscapeKey:false,
        }).then((res) => {
            
            if (res.isConfirmed) {
                  signOut({redirect:false});
                  router.push("/auth/login");

            }
        });
    }

const data=  await  response.json()

if (data) {

  if (data.isSuccess) {
      SetDisCountArea(data);
      SetLoader(false)
  } else {
    let errors = "<ul>";
    if (Array.isArray(data.messages)) {
    
        data.messages.forEach((message:string)=> {
            errors += `<li>${message}</li>`;
        });
    } else if (data.message) {
     
        errors += `<li>${data.message}</li>`;
    }
    else if(data.errors){

       data.errors.Description.forEach((message:string)=> {
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
} catch (error) {
    Swal.fire({
        title: 'Error!',
        html: `${error}`, 
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
useEffect(()=>{
GetCategoryFetch();

},[])



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
       
            } else{
                router.refresh();
                return;
            }



            if (title !== null) {
                Title.push({
                    key,
                    value: title as string,
                });
       
            } else{

                router.refresh();
                    return;
            }
            
        }

     

        fetch(`${apiDomen}api/DisCountArea/UpdateDiscountArea`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'LangCode': `${lang}`,  
                'Accept-Language': `${lang}`,              
                'Authorization': `Bearer ${sessions.data?.user.token}`
            },
            body:JSON.stringify({
                Id:id,
                TitleContent:Title.reduce((acc, item) => {
                    acc[item.key] = item.value;
                    return acc;
                }, {} as { [key: string]: string | null }),
                DescriptionContent:Description.reduce((acc, item) => {
                    acc[item.key] = item.value;
                    return acc;
                }, {} as { [key: string]: string | null }),
            }),
        })
        .then( response => {
                  
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
                        router.push("/auth/login");
                        SetLoader(false);

                    }
                });
                return;
            }
          

          return response.json();
        
        })
        .then(result=>{
            if (result) {
                
                if (result.isSuccess) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'DisCount update successfully!',
                        icon: 'success',
                        confirmButtonText: 'Cool',
                        allowEscapeKey:false,
                        allowOutsideClick:false,
                    }).then(res => {
                        if (res.isConfirmed) {
                            SetLoader(false);                          
                            router.push("/dashboard/webui/discountarea/1");
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
    }
if (loader) {
    return <Loader/>
}
if (discountArea) {
    
    return (
        <form id="addDisCountAreaForm" onSubmit={HandleSubmit}>
            <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Title
                    </label>
                    { Object.entries(discountArea?.response.titleContent).map(([key,value]) => (
                        <input
                            key={key}
                            placeholder={`Title  in ${key} Language`}
                            type="text"
                            id={`${key}`}
                            name={`Title${key}`}
                            defaultValue={`${value}`}
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
                    { Object.entries(discountArea?.response.descriptionContent) .map(([key,value]) => (
                        <input
                            key={key}
                            placeholder={`Description  in ${key} Language`}
                            type="text"
                            id={`${key}`}
                            
                            defaultValue={`${value}`}
                            name={`Description${key}`}
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
}
};
export default UpdateDisCountAreaForm;