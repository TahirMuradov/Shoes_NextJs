"use client"

import Loader from "@/dashboardComponents/common/Loader";
import ProductAddedImage from "@/dashboardComponents/ProductComponents/ProductAddedImage";
import { i18n, Locale } from "@/i18n-config";
import Result from "@/types/ApiResultType";
import GetCategoryForUI from "@/types/CategoryTypes/GetCategoryForUI";
import GetSubCategoryForUI from "@/types/SubCategoriesType/GetSubCategoryForUI";
import GetTopCategoryAreaForUpdate from "@/types/WebUI/TopCategoryArea/GetTopCategoryAreaForUpdate";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const TopCategoryUpdateAreaForm: React.FC<{params:{lang:Locale,apiDomen:string|undefined,id:string}}> = ({params:{lang,apiDomen,id}}) => {

    const router=useRouter();
    const[loader,SetLoader]=useState<boolean>(false)
    const [newPhotos, setNewPhotos] = useState<File[]>([]);
    const PictureinputRef = useRef<HTMLInputElement | null>(null);
const [Data,SetData]=useState<Result<GetTopCategoryAreaForUpdate>>();
const [SubCategory,SetSubCategory]=useState<Result<GetSubCategoryForUI[]>>();
const [Category,SetCategory]=useState<Result<GetCategoryForUI[]>>();
    const sessions=useSession();
    function NewPhotoAdded(e:React.ChangeEvent<HTMLInputElement>){
        e.preventDefault()
        const files = e.currentTarget.files;
        if (files) {  
          const newFilesArray = Array.from(files);
          setNewPhotos((prevPhotos) => [...prevPhotos, ...newFilesArray]);
          } else {
          console.log("No files selected");
        }
        document.getElementById("pictures")?.removeChild
        
        }
        function NewPhotoDelete(photoName: string,dom:boolean) {
  
            if (dom) {
              let element = document.getElementById(photoName) as HTMLElement;
              element.remove();
            }else{
              setNewPhotos(newPhotos.filter(x=>x.name!=photoName));
            
            }
            }
    useEffect(()=>{

        const newFileList = new DataTransfer();
      
        newPhotos.forEach((file) => {
          newFileList.items.add(file);
        });
        if (PictureinputRef.current) {
          PictureinputRef.current.files = newFileList.files;
        }
      },[newPhotos])
    const GetTopCategoryFetch= async ()=>{

        const response = await fetch(`${apiDomen}api/TopCategoryArea/GetTopCategoryAreaForUpdate?Id=${id}`, {
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
                      signOut();

                }
            });
        }
if (!response.ok) {
    Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred!',
        icon: 'error',
        confirmButtonText: 'Cool'
    }).then(x=>{
      if (x.isConfirmed) {
        
          SetLoader(false)

     signOut()
 
      }
    });

}
  const data:Result<GetTopCategoryAreaForUpdate>=  await  response.json()

  if (data) {
    
      if (data.isSuccess) {
          SetData(data);
      } else {
        let error="<ul>"
        if (data.message) {
          error+=`<li>${data.message}</li>`
        }
        data.messages?.forEach((message:string)=>{
         error+=`<li>${message}</li>`
        })
        error+="</ul>"
          Swal.fire({
              title: 'Error!',
              html: error || 'Failed to fetch category!',
              icon: 'error',
              confirmButtonText: 'Cool',
              allowOutsideClick: false, 
              allowEscapeKey:false,
          }).then((res)=>{
              if (res.isConfirmed) {
                  
                  router.refresh();
              }
          });
      }
  }
      
    }
    const GetSubCategoryFetch=async()=>{
        const response = await fetch(`${apiDomen}api/SubCategory/GetAllSubCategory`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'LangCode':`${lang}`,
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
                      signOut();

                }
            });
        }
if (!response.ok) {
    Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred!',
        icon: 'error',
        confirmButtonText: 'Cool'
    }).then(x=>{
      if (x.isConfirmed) {
        
          SetLoader(false)

     signOut()
 
      }
    });

}
  const data:Result<GetSubCategoryForUI[]>=  await  response.json()

  if (data) {
    
      if (data.isSuccess) {
          SetSubCategory(data);
      } else {
        let error="<ul>"
        if (data.message) {
          error+=`<li>${data.message}</li>`
        }
        data.messages?.forEach((message:string)=>{
         error+=`<li>${message}</li>`
        })
        error+="</ul>"
          Swal.fire({
              title: 'Error!',
              html: error || 'Failed to fetch category!',
              icon: 'error',
              confirmButtonText: 'Cool',
              allowOutsideClick: false, 
              allowEscapeKey:false,
          }).then((res)=>{
              if (res.isConfirmed) {
                  
                  router.refresh();
              }
          });
      }
  }
    }
    const GetCategoryFetch =async()=>{
        const response = await fetch(`${apiDomen}api/Category/GetAllCategory`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'LangCode':`${lang}`,
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
                      signOut();

                }
            });
        }
if (!response.ok) {
    Swal.fire({
        title: 'Error!',
        text: 'An unexpected error occurred!',
        icon: 'error',
        confirmButtonText: 'Cool'
    }).then(x=>{
      if (x.isConfirmed) {
        
          SetLoader(false)

     signOut()
 
      }
    });

}
  const data:Result<GetCategoryForUI[]>=  await  response.json()

  if (data) {
    
      if (data.isSuccess) {
          SetCategory(data);
      } else {
        let error="<ul>"
        if (data.message) {
          error+=`<li>${data.message}</li>`
        }
        data.messages?.forEach((message:string)=>{
         error+=`<li>${message}</li>`
        })
        error+="</ul>"
          Swal.fire({
              title: 'Error!',
              html: error || 'Failed to fetch category!',
              icon: 'error',
              confirmButtonText: 'Cool',
              allowOutsideClick: false, 
              allowEscapeKey:false,
          }).then((res)=>{
              if (res.isConfirmed) {
                  
                  router.refresh();
              }
          });
      }
  }
    }
useEffect( ()  =>{
GetTopCategoryFetch();
GetSubCategoryFetch();
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

            form.delete(`Title${key}`);
            form.delete(`Description${key}`);
        }
        const idcategory= form.get("categories")
        if (idcategory) {
            if (Category?.response.find(x=>x.id==form.get("categories"))) {
                form.append("CategoryId",idcategory)
            }else{
                form.append("SubCategoryId",idcategory)
                
            }
            form.delete("categories");
        }
     form.append("Title",JSON.stringify(Title))
     form.append("Description",JSON.stringify(Description))
form.append("Id",id)
   
        fetch(`${apiDomen}api/TopCategoryArea/UpdateTopCategoryArea`, {
            method: 'PUT',
            headers: {
             
                'LangCode': `${lang}`,  
                'Accept-Language': `${lang}`,              
                'Authorization': `Bearer ${sessions.data?.user.token}`
            },
            body:form,
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
            
           return response.json()})
        .then(result => {
            if (result) {
                
                if (result.isSuccess) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'HomeSlider Updated successfully!',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    }).then((res) => {
                        if (res.isConfirmed) {
                          SetLoader(false)
                         router.push("/dashboard/webui/homeslideritem/1")
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
        // .catch(error => {
        //     Swal.fire({
        //         title: 'Error!',
        //         text: 'An unexpected error occurred!',
        //         icon: 'error',
        //         confirmButtonText: 'Cool'
        //     }).then(x=>{
        //       SetLoader(false)
           
        //       router.refresh();
        //     });
        // });
    }
if (loader) {
    return <Loader/>
}

if (Data?.response.title) {
    console.log(Data)
    return (
        <form id="addDisCountAreaForm" onSubmit={HandleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-4 gap-6 mb-6">
                <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Title
                    </label>
                    {  Object.entries(Data?.response.title).map(([key, value]) => (
                        <input
                            key={key}
                            placeholder={`Title  in ${key} Language`}
                            type="text"
                            id={`${key}`}
                            defaultValue={`${value}`}
                            name={`Title${key}`}
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
                    {  Object.entries(Data?.response.description).map(([key, value]) => (
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
                <div className="col-span-4">
            <label htmlFor="pictures" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
             New Pictures:
            </label>
            <input
            ref={PictureinputRef}
            onChange={(e)=>NewPhotoAdded(e)}
              type="file"
              id="photo"
              name="NewImage"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                         dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            
            />
<div id="pictures">

        {

         
<ProductAddedImage apiDomen={apiDomen??"https://localhost:7115/"} Photo={null}  CurrentPictureUrl={Data?.response.pictureUrl} onPhotoDelete={NewPhotoDelete}/>


        
        }{
            newPhotos.map((x,index)=>{
          
                return <ProductAddedImage apiDomen={apiDomen??"https://localhost:7115/"} CurrentPictureUrl={null} Photo={x} key={index} onPhotoDelete={NewPhotoDelete}/>
           
            })
          }
</div>
          </div>
          <div className="col-span-4">
          <label htmlFor="categories" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categories</label>
  <select name="categories" id="categories" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

{
    Category?.response.map((data)=>(
        data.id===Data.response.categoryId?
        <option defaultChecked key={data.id} value={data.id}>{data?.name}</option>: <option key={data.id} value={data.id}>{data?.name}</option>
    ))
}
{
    SubCategory?.response.map((data)=>(
       data.id===Data.response.categoryId? <option defaultChecked key={data.id} value={data.id}>{data?.content}</option>: <option key={data.id} value={data.id}>{data?.content}</option>

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
        </form>
    );
}
};
export default TopCategoryUpdateAreaForm;