"use client"
import { Locale } from "@/i18n-config";
import PaginatedList from "@/types/Paginated.type";
import GetSize from "@/types/SizeTypes/GetAllSize";
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../common/Loader";
import Result from "@/types/ApiResultType";
import { signOut, useSession } from "next-auth/react";
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
const SizeTable:React.FC<{params:{lang:Locale,page:number,apiDomen:string|undefined}}>=({params:{lang,page,apiDomen}})=>{
    const [loader,SetLoader]=useState<boolean>(false)
    const [size,SetSizes]=useState<Result<PaginatedList<GetSize>>|null>(null)
    const sessions=useSession();
    const router=useRouter();
    useEffect(()=>{
SetLoader(true)
      fetch(`${apiDomen}api/Size/GetAllSizeForTable?page=${page}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'langCode': `${lang}`,
          'Accept-Language': `${lang}`,
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
                  signOut({redirect:false}); 
                  router.push("/auth/login");
                  SetLoader(false);

              }
          });
          return;
      }
      return  x.json()
      }).then(result=>{
    
       
          if (result) {
              if (result.isSuccess) {
                SetSizes(result)
                SetLoader(false)
              }else                
               {
    
               let errors = "<ul>";
               if (Array.isArray(result.messages)) {
               
                   result.messages.forEach((message:string)=> {
                       errors += `<li>${message}</li>`;
                   });
               } else if (result.message) {
                
                   errors += `<li>${result.message}</li>`;
               }
               else{
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
                allowEnterKey:false,
                allowOutsideClick:false
            }).then((x)=>{
             if(x.isConfirmed){
 
                 SetLoader(false)
              
                 router.refresh();
             }
            });
        });
    },[])
    function SizeDelete(id:string){
        SetLoader(true)
        fetch(`${apiDomen}api/Size/DeleteSize?Id=${id}`, {
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             'langCode': `${lang}` ,
             'Accept-Language': `${lang}`,
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
                    signOut({redirect:false}); 
                    router.push("/auth/login");
                    SetLoader(false);

                }
            });
            return;
        }
          
          return response.json()})
         .then(responsData=>{
          if (responsData) {
            
            if (responsData.isSuccess) {
              Swal.fire({
                  title: 'Success!',
                  text: 'Size delete successfully!',
                  icon: 'success',
                  confirmButtonText: 'Cool'
              }).then((res) => {
                  if (res.isConfirmed) {
                    SetSizes(prevSizes => {
                      if (!prevSizes) return null;
              
                      return {
                          ...prevSizes,
                          response: {
                              ...prevSizes.response,
                              data: prevSizes.response.data.filter(edu => edu.id !== id)
                          }
                      };
                  });
                    SetLoader(false)
                      router.refresh();
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
       
       }).catch(err=>{
        Swal.fire({
          title: 'Error!',
          html: err, 
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
       })
    }
    if (loader) {
        return(<Loader/>)
    }
    return(
    <TableContainer component={Paper} >
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell align='center'>Size Id</StyledTableCell>
          <StyledTableCell align='center'>Size Number</StyledTableCell>
          <StyledTableCell align='center'>Size Stock Count</StyledTableCell>      
           
          <StyledTableCell align="center">Actions</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {size?.response.data.map((row) => (
          <StyledTableRow key={row.id}>
            
            <StyledTableCell align='center' component="th" scope="row">
              {row.id}
            </StyledTableCell>
            <StyledTableCell align="center">{row.size}</StyledTableCell>
            <StyledTableCell align="center">{row.stockCount}</StyledTableCell>
         
          
         
                  <StyledTableCell align="center">
                  
<button onClick={()=>SizeDelete(row.id)} className=" mx-3 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
Delete
</button>
<Link href={`/dashboard/size/edit/${row.id}`} className=" mx-3 bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
Edit
</Link>
                  </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)}
export default SizeTable;