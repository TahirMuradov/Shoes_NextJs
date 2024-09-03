"use client"
import Loader from '@/dashboardComponents/common/Loader';
import { i18n, Locale } from '@/i18n-config'
import Result from '@/types/ApiResultType';
import GetCategoryForUpdate from '@/types/CategoryTypes/GetCategoryForUpdate';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';


const Page:React.FC<{ params: { lang: Locale,id:string } }> = ({ params }) => {
  const router=useRouter();
  const [items, setItems] = useState<{ key: string, value: string | null }[]>([]);
  const [category,setCategory]=useState<Result<GetCategoryForUpdate>|null>(null);
  const[loader,SetLoader]=useState<boolean>(false)
useEffect(()=>{
  fetch(`https://localhost:7115/api/Category/GetCategoryForUpdate?Id=${params.id}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'LangCode': `${params.lang}`, 
    }
})
.then(response => response.json())
.then(result => {
    if (result.isSuccess) {
  setCategory(result)
   console.log("then result",result)
   console.log("state respons",category)
 
    } else {
        Swal.fire({
            title: 'Error!',
            text: result.message || 'Failed to add category!',
            icon: 'error',
            confirmButtonText: 'Cool'
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
              Swal.fire({
                  title: 'success!',
                  text: 'Category Yenilendi!!',
                  icon: 'success',
                  confirmButtonText: 'Ok'
                }).then((res)=>{
if (res.isConfirmed) {

  SetLoader(false)
  setItems([]);
  router.refresh();
}
                })
          } else {
              Swal.fire({
                  title: 'Error!',
                  text: 'Inspecti de duzelis etme datalar duzgun gelmir!',
                  icon: 'error',
                  confirmButtonText: 'Cool'
                }).then(res=>{
                  if (res.isConfirmed) {
                    SetLoader(false)
                    setItems([]);
                    router.refresh();
                  }
                })
              return;
          }
      }

      setItems(newItems); // Update state with the new items
      fetch('https://localhost:7115/api/Category/UpdateCategory', {
          method:'PUT',
          headers: {
              'Content-Type': 'application/json',
              'LangCode': `${params.lang}`, // Or whatever language code you want to send
          },
          body:JSON.stringify({
            id: params.id, // ID of the category being updated
            lang: newItems.reduce((acc, item) => {
                acc[item.key] = item.value;
                return acc;
            }, {} as { [key: string]: string | null }), // Construct the dictionary for Lang property
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
                    SetLoader(false)
                    setItems([]);
                
                  
                      router.push("/dashboard/category")// Clear the form
                  }
              });
          } else {
         
              Swal.fire({
                  title: 'Error!',
                  text: result.message || 'Failed to updated category!',
                  icon: 'error',
                  confirmButtonText: 'Cool'
              }).then(res=>{
                SetLoader(false)
                setItems([]);
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
            setItems([]);
            router.refresh();
          });
      });
     
  }

 if (loader) {
    return<Loader/>
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

export default Page