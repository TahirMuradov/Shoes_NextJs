"use client"
import { i18n, Locale } from "@/i18n-config";
import Result from "@/types/ApiResultType";
import GetCategoryForUpdate from "@/types/CategoryTypes/GetCategoryForUpdate";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../common/Loader";
import { signOut, useSession } from "next-auth/react";

const CategoryEditForm:React.FC<{ params: { lang: Locale,id:string ,apiDomen:string|undefined} }> = ({ params })=>{
    const router=useRouter();
    const sessions=useSession();
    const [category,setCategory]=useState<Result<GetCategoryForUpdate>|null>(null);
    const [loader,SetLoader]=useState<boolean>(false)

    const GetCategoryFetch= async ()=>{

        const response = await fetch(`${params.apiDomen}api/Category/GetCategoryForUpdate?Id=${params.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'LangCode': `${params.lang}`, 
                'Accept-Language': `${params.lang}`,  
                'Authorization': `Bearer ${sessions.data?.user.token}`
            }
        });

        if (response.status === 401) {
            Swal.fire({
                title: 'Unauthorized',
                text: 'Your session has expired. Please log in again.',
                icon: 'error',
                confirmButtonText: 'Cool'
            }).then(() => {
                signOut();
            });
        }

  const data=  await  response.json()
            if (data.isSuccess) {
                setCategory(data);
            } else {
              let error="<ul>"
              if (data.message) {
                error+=`<li>${data.message}</li>`
              }
              data.messages.forech((message:string)=>{

                error+=`<li>${message}</li>`
              })
              error+="</ul>"
                Swal.fire({
                    title: 'Error!',
                    html: error || 'Failed to fetch category!',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                });
            }
      
    }

    useEffect(() => {
        GetCategoryFetch();
    }, []);

    function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        SetLoader(true)
        const form = new FormData(e.currentTarget);
        const newItems: { key: string, value: string | null }[] = [];

        for (const key of i18n.locales) {
            const inputValue = form.get(`CategoryName${key}`);
            if (inputValue !== null) {
                newItems.push({
                    key,
                    value: inputValue as string,
                });
            }
        }

        fetch(`${params.apiDomen}api/Category/UpdateCategory`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'LangCode': `${params.lang}`,
              'Accept-Language': `${params.lang}`,
              'Authorization': `Bearer ${sessions.data?.user.token}`
          },
          body: JSON.stringify({
              id: params.id, 
              isFeatured: form.get("isFeatured") == "on" ? true : false,
              lang: newItems.reduce((acc, item) => {
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
                  text: 'Category updated successfully!',
                  icon: 'success',
                  confirmButtonText: 'Cool'
              }).then((res) => {
                  if (res.isConfirmed) {
                      SetLoader(false);
                      router.push("/dashboard/category/1");
                  }
              });
          } else {
              // Hata mesajlarını HTML formatında göstermek için hazırlanmış kod
              let errorMessage = '<ul>';
  
              if (result.message) {
                  errorMessage += `<li>${result.message}</li>`;
              }
  
              if (result.messages && Array.isArray(result.messages)) {
                  result.messages.forEach((msg: string) => {
                      errorMessage += `<li>${msg}</li>`;
                  });
              }
  
              errorMessage += '</ul>';
  
              Swal.fire({
                  title: 'Error!',
                  html: errorMessage || 'Failed to update category!',
                  icon: 'error',
                  confirmButtonText: 'Cool'
              }).then(() => {
                  SetLoader(false);
                  router.refresh();
              });
          }
      })
      .catch(error => {
          Swal.fire({
              title: 'Info!',
              text: 'Yeniden Login Olun!',
              icon: 'info',
              confirmButtonText: 'Cool'
          }).then((res) => {
            if (res.isConfirmed) {
              
              SetLoader(false);
              signOut();
              router.refresh();
            }
          });
      });
    }

    if (loader) {
        return <Loader />
    }

    return (
        <form id="addCategoryForm" onSubmit={HandleSubmit}>
            <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
                    <label htmlFor="productCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Category Name:
                    </label>
                    {
                        category !== null ? 
                        Object.entries(category.response.content).map(([key, value]) => (
                            i18n.locales.includes(key as Locale) ? (
                                <input
                                    key={key}
                                    placeholder={`Category Name in ${key.toUpperCase()} Language`}
                                    type="text"
                                    id={key}
                                    name={`CategoryName${key}`}
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
                        <input id="isfeatured" name="isFeatured" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="isfeatured" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Is featured</label>
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
        </form>
    )
}

export default CategoryEditForm;
