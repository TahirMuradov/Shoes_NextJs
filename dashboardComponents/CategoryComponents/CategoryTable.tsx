"use client"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Result from '@/types/ApiResultType';
import PaginatedList from '@/types/Paginated.type';
import GetCategoryAllDashboard from '@/types/CategoryTypes/GetALLCategory';
import Link from 'next/link';
import { Locale } from '@/i18n-config';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import Loader from '../common/Loader';


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





export default function CategoryTable({categories,lang}:{categories:Result<PaginatedList<GetCategoryAllDashboard>>,lang:Locale}) {
  const router=useRouter();
 const [loader,SetLoader]=React.useState<boolean>(false)
  function CategoryDelete(id:string){
    SetLoader(true)
   fetch(`https://localhost:7115/api/Category/DeleteCategory?Id=${id}`, {
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
            text: 'Category delete successfully!',
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
          SetLoader(false)
            router.push("/category")// Clear the form
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
            <StyledTableCell align='center'>Category Id</StyledTableCell>
            <StyledTableCell align='center'>Category Name</StyledTableCell>
         
       
        
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.response.data.map((row) => (
            <StyledTableRow key={row.id}>
              
              <StyledTableCell align='center' component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="center">{row.content}</StyledTableCell>
           
            
           
                    <StyledTableCell align="center">
                    
<button onClick={()=>CategoryDelete(row.id)} className=" mx-3 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
  Delete
</button>
<Link locale={lang} href={`/dashboard/category/edit/${row.id}`} className=" mx-3 bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
  Edit
</Link>
                    </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}