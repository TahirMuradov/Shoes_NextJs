"use client"
import { i18n, Locale } from "@/i18n-config";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";
import GetCategoryAllDashboard from "@/types/CategoryTypes/GetALLCategory";
import Loader from "@/dashboardComponents/common/Loader";
import { signOut, useSession } from "next-auth/react";
import Result from "@/types/ApiResultType";
const SubCategoryCreateForm:React.FC<{params:{lang:Locale,apiDomen:string|undefined}}> = ({params:{lang,apiDomen}}) => {
    const router=useRouter();
    const [Categories, SetCategories] = useState<Result<GetCategoryAllDashboard[]>>();

    const session=useSession();
    const sessions=useSession();
    const[loader,SetLoader]=useState<boolean>(false)
useEffect(()=>{
    fetch(`${apiDomen}api/Category/GetAllCategory`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'langCode': `${lang}`,
         'Accept-Language': `${lang}`,
                   'Authorization':`Bearer ${sessions.data?.user.token}`
        },
        cache:"no-store",
        method: "GET",
      })
      .then(res=>{
        if (res.status==401) {
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
        }else if(!res.ok){
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
        }
       return res.json()})
      .then(data=>{
        
        if (data.isSuccess) {
            
            
            SetCategories(data)
        }else{
            let errors = "<ul>";
            if (Array.isArray(data.messages)) {
            
                data.messages.forEach((message:string)=> {
                    errors += `<li>${message}</li>`;
                });
            } else if (data.message) {
             
                errors += `<li>${data.message}</li>`;
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
     
      
},[])
    function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        SetLoader(true);

        const form = new FormData(e.currentTarget);
        const newItems: { key: string, value: string | null }[] = [];

        for (const key of i18n.locales) {
            const inputValue = form.get(`SubCategoryName${key}`);

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
                        // setItems([]);
                        router.refresh(); // Reload the page if the locale doesn't match
                    }
                  })
                return;
            }
        }

        // setItems(newItems); // Update state with the new items
        fetch(`${apiDomen}api/SubCategory/AddSubCategory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'LangCode': `${lang}`, // Or whatever language code you want to send
                'Accept-Language': `${lang}`,
                   'Authorization':`Bearer ${sessions.data?.user.token}`
            },
            body: JSON.stringify({
                CategoryId:form.get("categoryId"),
                LangContent: newItems.reduce((acc, item) => {
                    acc[item.key] = item.value;
                    return acc;
                }, {} as { [key: string]: string | null }),
            }),
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
       return     response.json()
        } )
        .then(result => {
            if (result) {
                
                if (result.isSuccess) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Category added successfully!',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    }).then((res) => {
                        if (res.isConfirmed) {
                            SetLoader(false)
                            // setItems([]); 
                        
                            router.push("/dashboard/subcategory/1")// Clear the form
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
            }).then((res)=>{
if (res.isConfirmed) {
    SetLoader(false)
    // setItems([]);
    router.refresh();
}
            });
        });
    }
    if (loader) {
        return <Loader/>
    }
    return(  <form id="addCategoryForm" onSubmit={HandleSubmit}>
        <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
                <label htmlFor="productCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                   Sub Category Name:
                </label>
                {
                i18n.locales.map((locale) => (
                    <input
                        key={locale}
                        placeholder={`SubCategory Name in ${locale} Language`}
                        type="text"
                        id={locale}
                        name={`SubCategoryName${locale}`}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                                   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                   dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                ))}
            </div>
            <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
            <label htmlFor="categoryId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an Categories</label>
  <select name="categoryId" id="categoryId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
   {
    Categories?.response.map((category)=>(

        <option value={category.id}>{category.content}</option>
    ))
   }
  
  </select>
           
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
export default SubCategoryCreateForm;