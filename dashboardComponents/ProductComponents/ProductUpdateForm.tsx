"use client"
import { i18n, Locale } from "@/i18n-config"

import GetProductForUpdate from "@/types/ProductTypes/GetProdutForUpdate";

import GetSize from "@/types/SizeTypes/GetSize"
import GetSubCategory from "@/types/SubCategoriesType/GetSubCategory"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../common/Loader";
import ProductAddedImage from "./ProductAddedImage";


const ProductUpdateForm:React.FC<{lang:Locale,apiDomen:string|undefined,sizes:GetSize[],subcategories:GetSubCategory[],Product:GetProductForUpdate}>=({lang,sizes,subcategories,Product,apiDomen})=>{
    const[loader,SetLoader]=useState<boolean>(false);
    const [newPhotos, setNewPhotos] = useState<File[]>([]);
    const PictureinputRef = useRef<HTMLInputElement | null>(null);

  const router=useRouter();
  function NumberInputCheckedValue(e: ChangeEvent<HTMLInputElement>) {
    if (Number.parseFloat(e.target.value) < 1) {
      e.target.value = "";
    }
  }

function NewPhotoDelete(photoName: string,dom:boolean) {
  
if (dom) {
  let element = document.getElementById(photoName) as HTMLElement;
  element.remove();
}else{
  setNewPhotos(newPhotos.filter(x=>x.name!=photoName));

}
}
function NewPhotoAdded(e:React.ChangeEvent<HTMLInputElement>){
e.preventDefault()
const files = e.currentTarget.files;
if (files) {  
  const newFilesArray = Array.from(files);
  setNewPhotos((prevPhotos) => [...prevPhotos, ...newFilesArray]);
  } else {
  console.log("No files selected");
}


}
useEffect(()=>{
 console.log(newPhotos)
  const newFileList = new DataTransfer();

  newPhotos.forEach((file) => {
    newFileList.items.add(file);
  });
  if (PictureinputRef.current) {
    PictureinputRef.current.files = newFileList.files;
  }
},[newPhotos])
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    SetLoader(true)
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
form
//size   
 const Size: { key: string, value: number | null }[] = [];

    for (const size of sizes) {
      const sizeInput = document.getElementById(`${size.id}`) as HTMLInputElement | null;
      if (sizeInput) {
        const sizeValue = sizeInput.value;
        if (Number.parseInt( sizeValue) <= 0) {
          formData.delete(`SizeId-${size.id}`);
          continue;
        }
     Size.push({
      key: size.id,
      value: Number.parseInt(sizeValue),
     })
  
    
        formData.delete(`SizeId-${size.id}`);
      }
    }
    formData.append("Sizes",JSON.stringify(Size))
    //productName
    const productName: { key: string, value: string | null }[] = [];
    const productDescription: { key: string, value: string | null }[] = [];

    for (const key of i18n.locales) {
        const inputNameValue = (form.querySelector(`input[name="Name${key}"]`) as HTMLInputElement).value;
        formData.delete(`Name${key}`);
      
        const inputDescriptionValue =  (form.querySelector(`input[name="Description${key}"]`) as HTMLInputElement).value;
        formData.delete(`Description${key}`);

        if (inputNameValue !== null) {
          productName.push({
                key,
                value: inputNameValue as string,
            });
   
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Inspect de duzelis etme datalar duzgun gelmir!',
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
        if (inputDescriptionValue !== null) {
          productDescription.push({
                key,
                value: inputDescriptionValue as string,
            });
   
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Inspect de duzelis etme datalar duzgun gelmir!',
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
    formData.append("Description",JSON.stringify(productDescription))
formData.append("ProductName",JSON.stringify( productName))
formData.append("Id",Product.id)

     
    // Array.from(formData.entries()).forEach(([key, value]) => {
    //   console.log(`Key: ${key}, Value: ${value}`);
    // });
    try {
      fetch(`${apiDomen}api/Product/UpdateProduct`, {
        method: "PUT",
        body: formData,
        headers: {
          'LangCode': `${lang}`,
        },
      }) .then(response => response.json())
      .then(result => {
          if (result.isSuccess) {
              Swal.fire({
                  title: 'Success!',
                  text: 'Product updated successfully!',
                  icon: 'success',
                  confirmButtonText: 'Cool'
              }).then((res) => {
                  if (res.isConfirmed) {
                    SetLoader(false)
                  
                
                  
                      router.push("/dashboard/product/1")// Clear the form
                  }
              });
          } else {
         console.log(result)
              Swal.fire({
                  title: 'Error!',
                  text: result.messages || 'Failed to updated product!',
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
      });;

     
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'An unexpected error occurred!',
            icon: 'error',
            confirmButtonText: 'Cool'
        }).then(x=>{
          SetLoader(false)
       
          router.refresh();
        })
    }
  };
  if (loader) 
   return ( <Loader/>)
  
    return(
    
        <form id="addPictureForm" onSubmit={handleSubmit} encType="multipart/form-data">

        <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
                <label htmlFor="productCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Product Name:
                </label>
                {
                i18n.locales.map((locale) => (
                    <input
                        key={locale}
                        placeholder={`Product  Name in ${locale} Language`}
                        defaultValue={`${Product.productName[locale as keyof typeof Product.productName]}`}
                        type="text"
                        id={locale}
                        name={`Name${locale}`}
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
                  Product Description:
                </label>
                {
                i18n.locales.map((locale) => (
                    <input
                        key={locale}
                        defaultValue={`${Product.description[locale as keyof typeof Product.productName]}`}
                        placeholder={`Product  Description in ${locale} Language`}
                        type="text"
                        id={locale}
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
            <label htmlFor="productCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Product Code:
            </label>
            <input
            defaultValue={Product.productCode}
              type="text"
              id="ProductCode"
              name="ProductCode"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                         dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
  
          <div className="col-span-2">
            <label htmlFor="discountPrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Discount Price:
            </label>
            <input
            defaultValue={Product.discountPrice}
            onChange={(e)=>NumberInputCheckedValue(e)}
              type="number"
              id="discountPrice"
              name="DiscountPrice"
              step="0.01"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                         dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
  
          <div className="col-span-2">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Price:
            </label>
            <input
            defaultValue={Product.price}
             onChange={(e)=>NumberInputCheckedValue(e)}
              type="number"
              id="price"
              name="Price"
              step="0.01"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                         dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
  
          <div className="col-span-4">
            <label htmlFor="sizes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Sizes:
            </label>
            <div id="sizes" className="grid grid-cols-3 gap-4">
{
    sizes.map((size)=>(

              <div className="">
                <label htmlFor={size.id} className="text-sm font-medium text-gray-900 dark:text-white">№ {size.size}</label>
                <input
                id={size.id}
                name={`SizeId-${size.id}`}
                  type="number"
                  defaultValue={`${Product.sizes.find((x)=>x.sizeId==size.id)?.stockCount}`}
                  placeholder={`Size ${size.size} Quantity`}
                  onChange={(e) =>{
                    if (Number.parseInt(e.target.value)<1) {
                      e.target.value=''
                    }
                   
                    }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                             focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 
                />
              </div>
    ))
}
           
            </div>
          </div>
  
          <div className="col-span-4">
            <label htmlFor="subCategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Sub Categories:
            </label>
            <select
              id="subCategory"
              name="SubCategoriesID"
              multiple
              
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                         dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required>
             
                {
                    subcategories.map((category)=>(
                     Product.subCategories.includes(category.id)?<option selected value={category.id}>{category.content}</option>:<option value={category.id}>{category.content}</option>
                    ))
                }
       
              
         
            </select>
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
              name="NewPictures"
              multiple
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                         dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            
            />
<div id="pictures">

        {

            Product.pictureUrls.map((x)=>{
   return  <ProductAddedImage apiDomen={apiDomen??"https://localhost:7115/"} Photo={null}  CurrentPictureUrl={x} onPhotoDelete={NewPhotoDelete}/>
})
            
        }{
          newPhotos.map((x,index)=>{
            return <ProductAddedImage apiDomen={apiDomen??"https://localhost:7115/"} CurrentPictureUrl={null} Photo={x} key={Product.pictureUrls.length+index} onPhotoDelete={NewPhotoDelete}/>
          })
        }
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
export default ProductUpdateForm