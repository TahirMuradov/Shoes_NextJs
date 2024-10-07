"use client"
import Result from "@/types/ApiResultType";
import PaginatedList from "@/types/Paginated.type";
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Locale } from "@/i18n-config";
import { signOut, useSession } from "next-auth/react";
import Loader from "@/dashboardComponents/common/Loader";
import GetDisCountAreaType from "@/types/WebUI/DiscountArea/GetDicCountAreaType";




const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
const DisCountAreaTable:React.FC<{Lang:Locale,page:number,apiDomen:string|undefined}>=({Lang,page,apiDomen})=>{
      const [loader,SetLoader]=useState<boolean>(false)
    const [Products,SetProducts]=useState<Result<PaginatedList<GetDisCountAreaType>>>();
    const router=useRouter();
    const sessions=useSession();

    useEffect(()=>{
      fetch(`${apiDomen}api/DisCountArea/GetDisCountAreaForTable?page=${page}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'langCode': `${Lang}`,  // You can dynamically set this value based on user selection or other logic
          'Accept-Language': `${Lang}`,
         'Authorization':`Bearer ${sessions.data?.user.token}`

        },
        cache:"no-store",
        method: "GET",
      }).then(x=>{
        if (x.status==401) {
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
      }else if(!x.ok){
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
        return x.json()
      }
    
    ).then(res=>{
   if (res) {
    
     if (res.isSuccess) {
       
       SetProducts(res)
     }else {
       let errors = "<ul>";
       if (Array.isArray(res.messages)) {
       
           res.messages.forEach((message:string)=> {
               errors += `<li>${message}</li>`;
           });
       } else if (res.message) {
        
           errors += `<li>${res.message}</li>`;
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
    });
    },[])

    function Delete(id:string){
    
        SetLoader(true)
       fetch(`${apiDomen}api/DisCountArea/DeleteDisCountArea?Id=${id}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'langCode': `${Lang}`,  // You can dynamically set this value based on user selection or other logic
            'Accept-Language': `${Lang}`,
   'Authorization':`Bearer ${sessions.data?.user.token}`
          },
         method: "DELETE",
        }).then(response=>{
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
           
          }
        });
        return;
        }
         return response.json()
        })
        .then(responsData=>{
          if (responsData) {
            
            if (responsData.isSuccess) {
              Swal.fire({
                  title: 'Success!',
                  text: 'Product delete successfully!',
                  icon: 'success',
                  confirmButtonText: 'Cool'
              }).then((res) => {
                  if (res.isConfirmed) {
                 router.refresh();
                    SetLoader(false)
                  }
              })
          }else{
            let errors = "<ul>";
            if (Array.isArray(responsData.messages)) {
            
                responsData.messages.forEach((message:string)=> {
                    errors += `<li>${message}</li>`;
                });
            } else if (responsData.message) {
             
                errors += `<li>${responsData.message}</li>`;
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
        ;
      }
      if (loader) {
        return( <Loader/>)
      }

    return(
        <TableContainer component={Paper} >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align='center'>Id</StyledTableCell>
              <StyledTableCell align='center'>Title</StyledTableCell>
              <StyledTableCell align='center'>Description</StyledTableCell>
               <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Products?.response.data.map((row) => (
              <StyledTableRow key={row.id}>
                
                <StyledTableCell align='center' component="th" scope="row">
                  {row.id}
                </StyledTableCell>
       
             
                <StyledTableCell>
                    {row.title}
                </StyledTableCell>
                <StyledTableCell>
                    {row.description}
                </StyledTableCell>
       
                      <StyledTableCell align="center">
                      
  <button onClick={()=>Delete(row.id)} className="m-3 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
    Delete
  </button>
  <Link href={`/dashboard/webui/discountarea/edit/${row.id}`} className="m-3 bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
    Edit
  </Link>
                      </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}
export default DisCountAreaTable