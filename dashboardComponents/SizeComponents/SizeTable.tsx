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
    const [size,SetSizes]=useState<Result<PaginatedList<GetSize>>>()
    const router=useRouter();
    useEffect(()=>{

      fetch(`${apiDomen}api/Size/GetAllSizeForTable?page=${page}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'langCode': `${lang}`  // You can dynamically set this value based on user selection or other logic
        },
        cache:"no-store",
        method: "GET",
      }).then(x=>x.json()).then(res=>SetSizes(res));
    },[])
    function SizeDelete(id:string){
        SetLoader(true)
        fetch(`${apiDomen}api/Size/DeleteSize?Id=${id}`, {
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
                 text: 'Size delete successfully!',
                 icon: 'success',
                 confirmButtonText: 'Cool'
             }).then((res) => {
                 if (res.isConfirmed) {
                  fetch(`${apiDomen}api/Size/GetAllSizeForTable?page=${page}`, {
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'langCode': `${lang}`  // You can dynamically set this value based on user selection or other logic
                    },
                    cache:"no-store",
                    method: "GET",
                  }).then(x=>x.json()).then(res=>SetSizes(res));
                   SetLoader(false)
                     router.refresh();// Clear the form
                 }
             })
         }else{
            console.log(responsData)
           Swal.fire({
             title: `Error!${responsData.statusCode}`,
          text: responsData.message  ,
             icon: 'error',
             confirmButtonText: 'Cool'
         }).then((res) => {
             if (res.isConfirmed) {
               SetLoader(false)
                 router.push("/dashboard/size/1")// Clear the form
             }
         })
         }
       
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