"use client"
import { Locale } from "@/i18n-config";
import Result from "@/types/ApiResultType";
import PaginatedList from "@/types/Paginated.type";
import GetAllShippingMethod from "@/types/ShippingMethodType/GetALLShippingMethod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../common/Loader";
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import Link from "next/link";


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

const ShippingMethodTable = ({page,lang,apiDomen}:{page:number,lang:Locale,apiDomen:string|undefined}) => {
    const[shippingMethods,SetShippingMethods]=useState<Result<PaginatedList<GetAllShippingMethod>>>();
    const router=useRouter();
  
    useEffect(()=>{
    
      fetch(`${apiDomen}api/ShippingMethod/GetAllShippingMethod?page=${page}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'langCode': `${lang}`  // You can dynamically set this value based on user selection or other logic
        },
        cache:"no-store",
        method: "GET",
      }).then(res=>res.json()).then(x=>SetShippingMethods(x));
    },[])
     const [loader,SetLoader]=useState<boolean>(false)
      function ShippingMethodDelete(id:string){
        SetLoader(true)
       fetch(`${apiDomen}api/ShippingMethod/DeleteShippingMethod?Id=${id}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'langCode': `${lang}`  // You can dynamically set this value based on user selection or other logic
          },
         method: "DELETE",
        }).then(response=>response.json())
        .then(responsData=>{
          if (responsData.isSuccess) {
            Swal.fire({
                title: 'Success!',
                text: 'Shipping Method  delete successfully!',
                icon: 'success',
                confirmButtonText: 'Cool'
            }).then((res) => {
                if (res.isConfirmed) {
                  SetLoader(false)
                    router.refresh();// Clear the form
                }
            })
        }else{
          Swal.fire({
            title: 'Error!',
         
            icon: 'error',
            confirmButtonText: 'Cool'
        }).then((res) => {
            if (res.isConfirmed) {
              fetch(`${apiDomen}api/ShippingMethod/GetAllShippingMethod?page=${page}`, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'langCode': `${lang}`  // You can dynamically set this value based on user selection or other logic
                },
                cache:"no-store",
                method: "GET",
              }).then(res=>res.json()).then(x=>SetShippingMethods(x));
              SetLoader(false)
              router.refresh(); // Clear the form

            }
        })
        }
      
      })
        
        ;
      }
      if (loader) {
        return <Loader/>
      }
      return (
        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align='center'> Id</StyledTableCell>
                <StyledTableCell align='center'>Shipping Method Content</StyledTableCell>
                <StyledTableCell align='center'>DisCount</StyledTableCell>
                <StyledTableCell align='center'>Price</StyledTableCell>
             
           
            
                <StyledTableCell align="center">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shippingMethods?.response?.data.map((row) => (
                <StyledTableRow key={row.id}>
                  
                  <StyledTableCell align='center' component="th" scope="row">
                    {row.id}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.content}</StyledTableCell>
                  <StyledTableCell align="center">{row.disCount}</StyledTableCell>
                  <StyledTableCell align="center">{row.price}</StyledTableCell>
               
                
               
                        <StyledTableCell align="center">
                        
    <button onClick={()=>ShippingMethodDelete(row.id)} className=" mx-3 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
      Delete
    </button>
    <Link locale={lang} href={`/dashboard/shippingmethod/edit/${row.id}`} className=" mx-3 bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
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

export default ShippingMethodTable