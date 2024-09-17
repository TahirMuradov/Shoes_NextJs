"use client"
import Result from "@/types/ApiResultType";
import PaginatedList from "@/types/Paginated.type";
import GetSubCategory from "@/types/SubCategoriesType/GetSubCategory";
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material"
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../common/Loader";
import { useSession } from "next-auth/react";

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
const SubCategoryTable:React.FC<{Lang:string,page:number,apiDomen:string|undefined}>=({Lang,page,apiDomen})=>{
    const [loader,SetLoader]=useState<boolean>(false)
    const [SubCategory,SetSubCategory]=useState<Result<PaginatedList<GetSubCategory>>>();
    const sessions=useSession();
    const router=useRouter();
    useEffect(()=>{

      fetch(`${apiDomen}api/SubCategory/GetAllSubCategoryForTable?page=${page}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'langCode': `${Lang}`  ,// You can dynamically set this value based on user selection or other logic
          'Accept-Language': `${Lang}`,
             'Authorization':`Bearer ${sessions.data?.user.token}`
        },
        cache:"no-store",
        method: "GET",
      }).then(res=>res.json()).then(x=>SetSubCategory(x));
    },[])
    function SubCategoryDelete(id:string){
        SetLoader(true)
       fetch(`${apiDomen}api/SubCategory/DeleteSubCategory?Id=${id}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'langCode': `${Lang}`,  // You can dynamically set this value based on user selection or other logic
            'Accept-Language': `${Lang}`,
               'Authorization':`Bearer ${sessions.data?.user.token}`
          },
         method: "DELETE",
        }).then(response=>response.json())
        .then(responsData=>{
          if (responsData.isSuccess) {
            Swal.fire({
                title: 'Success!',
                text: 'SubCategory delete successfully!',
                icon: 'success',
                confirmButtonText: 'Cool'
            }).then((res) => {
                if (res.isConfirmed) {
                  fetch(`${apiDomen}api/SubCategory/GetAllSubCategoryForTable?page=${page}`, {
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'langCode': `${Lang}`,  // You can dynamically set this value based on user selection or other logic
                      'Accept-Language': `${Lang}`,
   'Authorization':`Bearer ${sessions.data?.user.token}`
                    },
                    cache:"no-store",
                    method: "GET",
                  }).then(res=>res.json()).then(x=>SetSubCategory(x));
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
              SetLoader(false)
                router.push("/dashboard/subCategory/1")// Clear the form
            }
        })
        }
      
      })
        
        ;
      }
      if (loader) {
        return <Loader/>
      }
    return(
        <TableContainer component={Paper} >
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align='center'>Category Id</StyledTableCell>
              <StyledTableCell align='center'>Category Name</StyledTableCell>
           
         
          
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {SubCategory?.response.data.map((row) => (
              <StyledTableRow key={row.id}>
                
                <StyledTableCell align='center' component="th" scope="row">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell align="center">{row.content}</StyledTableCell>
             
              
             
                      <StyledTableCell align="center">
                      
  <button onClick={()=>SubCategoryDelete(row.id)} className=" mx-3 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
    Delete
  </button>
  <Link href={`/dashboard/Subcategory/edit/${row.id}`} className=" mx-3 bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
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
export default SubCategoryTable