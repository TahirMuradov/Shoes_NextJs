"use client"
import { Locale } from "@/i18n-config";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'
import { ChangeEvent, useEffect, useState } from "react";
import Loader from "@/dashboardComponents/common/Loader";
import { signOut, useSession } from "next-auth/react";
import Result from "@/types/ApiResultType";
import GetAllUserForSelect from "@/types/userTypes/GetAllUserForSelect";
const CreateCuponForUserForm:React.FC<{params:{lang:Locale,apiDomen:string|undefined}}> = ({params:{lang,apiDomen}}) => {
    const router=useRouter();
    const [Users, SetUsers] = useState<Result<GetAllUserForSelect[]>>();
   const sessions=useSession();
    const[loader,SetLoader]=useState<boolean>(false)
useEffect(()=>{
    fetch(`${apiDomen}api/Auth/GetAllUserForSelect`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
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
            
            
            SetUsers(data)
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
function NumberInputCheckedValue(e: ChangeEvent<HTMLInputElement>) {
    if (Number.parseFloat(e.target.value) < 1||Number.parseFloat(e.target.value) >100) {
      e.target.value = "";
    }
  }
    function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        SetLoader(true);

        const form = new FormData(e.currentTarget);
       

     
       
        fetch(`${apiDomen}api/Cupon/AddSpecificCuponForCategory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'LangCode': `${lang}`, 
                'Accept-Language': `${lang}`,
                   'Authorization':`Bearer ${sessions.data?.user.token}`
            },
            body: JSON.stringify({
                userId:form.get("userId"),
                disCountPercent:form.get("discountpercent")
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
                return ;
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
    return(  <form id="addCuponForm" onSubmit={HandleSubmit}>
        <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
                <label htmlFor="productCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  DisCount Percent
                </label>
              
                    <input
                    onChange={(e)=>NumberInputCheckedValue(e)}
                    min={0}
                    max={100}
                      placeholder="DisCount Percent"
                        type="number"
                        name='discountpercent'
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                   focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                                   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                   dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
             
            </div>
            <div className="col-span-4 border-2 border-gray-200 border-dashed rounded-lg p-4">
            <label htmlFor="userId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an User Email</label>
  <select name="userId" id="userId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
   {
    Users?.response.map((user)=>(

        <option value={user.id}>{user.email}</option>
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
export default CreateCuponForUserForm;