"use client"
import { i18n, Locale } from "@/i18n-config";
import { useState } from "react";
import Loader from "../common/Loader";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const CategoryCreateForm: React.FC<{params:{lang:Locale,apiDomen:string|undefined}}> = ({params:{lang,apiDomen}}) => {
    const [items, setItems] = useState<{ key: string, value: string | null }[]>([]);
    const router=useRouter();
    const[loader,SetLoader]=useState<boolean>(false)

    const sessions=useSession();
    function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        SetLoader(true);

        const form = new FormData(e.currentTarget);
        const newItems: { key: string, value: string | null }[] = [];

        for (const key of i18n.locales) {
            const inputValue = form.get(`CategoryName${key}`);

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
                        setItems([]);
                        router.refresh(); // Reload the page if the locale doesn't match
                    }
                  })
                return;
            }
        }

        setItems(newItems); // Update state with the new items
        fetch(`${apiDomen}api/Category/AddCategory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'LangCode': `${lang}`,  
                'Accept-Language': `${lang}`,              
                'Authorization': `Bearer ${sessions.data?.user.token}`
            },
            body: JSON.stringify({
                isFeatured: form.get("isFeatured"),
                LangContent: newItems.reduce((acc, item) => {
                    acc[item.key] = item.value;
                    return acc;
                }, {} as { [key: string]: string | null }),
            }),
        })
        .then(async response => {
            const result = await response.json();
        
            if (response.status === 401) {
                Swal.fire({
                    title: 'Authorization Error!',
                    text: 'Your session has expired. Please log in again.',
                    icon: 'warning',
                    confirmButtonText: 'Login'
                }).then(res => {
                    if (res.isConfirmed) {
                        signOut(); // Oturum sonlandırılıyor
                        SetLoader(false);
                        router.refresh();
                    }
                });
                return;
            }
        
            if (result.isSuccess) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Category added successfully!',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                }).then(res => {
                    if (res.isConfirmed) {
                        SetLoader(false);
                        setItems([]);
                        router.push("/dashboard/category/1"); // Sayfa yönlendirme
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
                    html: errors, // Mesajlar HTML formatında gösteriliyor
                    icon: 'error',
                    confirmButtonText: 'Cool'
                }).then(res => {
                    if (res.isConfirmed) {
                        SetLoader(false);
                        setItems([]);
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
            }).then(res => {
                if (res.isConfirmed) {
                    SetLoader(false);
                    setItems([]);
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
        <form id="addCategoryForm" onSubmit={HandleSubmit}>
            <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
                    <label htmlFor="productCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Category Name:
                    </label>
                    {i18n.locales.map((locale) => (
                        <input
                            key={locale}
                            placeholder={`Category Name in ${locale} Language`}
                            type="text"
                            id={locale}
                            name={`CategoryName${locale}`}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                       focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                                       dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                       dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    ))}
                </div>
                <div className="col-span-2">
                <div className="flex items-center">
    <input id="isfeatured" name="isFeatured" type="checkbox"  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
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
    );
};

export default CategoryCreateForm;