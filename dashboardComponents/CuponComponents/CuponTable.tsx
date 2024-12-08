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
import Link from 'next/link';
import { Locale } from '@/i18n-config';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import Loader from '../common/Loader';
import { signOut, useSession } from 'next-auth/react';
import GetAllCupon from '@/types/CuponTypes/GetAllCupon';


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

export default function CuponTable({lang,page,apiDomen}:{lang:Locale,page:number,apiDomen:string|undefined}) {
  const router=useRouter();
  const sessions=useSession();
  
  const [categories, SetCupons] = React.useState<Result<PaginatedList<GetAllCupon>>>()
  const [loader, SetLoader] = React.useState<boolean>(false);

  const fetchCupons = async () => {
    try {
      const res = await fetch(`${apiDomen}api/Cupon/GetAllCupon?Page=${page}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'langCode': `${lang}`,
          'Accept-Language': `${lang}`,
          'Authorization': `Bearer ${sessions.data?.user.token}`,
        },
        cache: "no-store",
        method: "GET",
      });
      
      if (res.ok) {
        const data: Result<PaginatedList<GetAllCupon>>= await res.json();
        if (data) {
          
          SetCupons(data); 
        }
      } 
      if (res.status === 401) {
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
    else if(!res.ok){
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
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {    
    fetchCupons(); 
  }, [apiDomen, lang, page, sessions.data?.user.token]);

  const CuponDelete = async (id: string) => {
    SetLoader(true);
    try {
      const res = await fetch(`${apiDomen}api/Cupon/RemoveCupon?Id=${id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'langCode': `${lang}`,
          'Accept-Language': `${lang}`,
          'Authorization': `Bearer ${sessions.data?.user.token}`,
        },
        method: "DELETE",
      });
      if (res.status === 401) {
        Swal.fire({
          title: 'Info!',
          text: 'Please log in again!',
          icon: 'info',
          confirmButtonText: 'Cool',
          allowEscapeKey:false,
          allowOutsideClick:false,
        }).then((res) => {
          if (res.isConfirmed) {
            signOut();
          }
        });
        return;
      }
      if(!res.ok){
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
      const responsData = await res.json();
      if (responsData) {
        
        if (responsData.isSuccess) {
          Swal.fire({
            title: 'Success!',
            text: 'Category deleted successfully!',
            icon: 'success',
            confirmButtonText: 'Cool',
            allowEscapeKey:false,
            allowOutsideClick:false,
          }).then((res) => {
            if (res.isConfirmed) {
              SetLoader(false);
              fetchCupons();
            }
          });
        } else {
          let errorMessage = '<ul>';
    
                if (responsData.message) {
                    errorMessage += `<li>${responsData.message}</li>`;
                }
    
                if (responsData.messages && Array.isArray(responsData.messages)) {
                    responsData.messages.forEach((msg: string) => {
                        errorMessage += `<li>${msg}</li>`;
                    });
                }
    
                errorMessage += '</ul>';
    
                Swal.fire({
                    title: 'Error!',
                    html: errorMessage || 'Failed to update category!',
                    icon: 'error',
                    allowOutsideClick: false, 
                    allowEscapeKey:false,
                    confirmButtonText: 'Cool'
  
                }).then((res) => {
                  if (res.isConfirmed) {
                    
                    SetLoader(false);
                    router.refresh();
                  }
                });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loader) {
    return <Loader />;
  }

  return (<>
  <div>
  <Link href={"/dashboard/cupon/createforuser"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
 Create Cupon For User
</Link>
  </div>
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Cupon Code</StyledTableCell>
            <StyledTableCell align='center'>DisCount Percent</StyledTableCell>
            <StyledTableCell align='center'>Is Active</StyledTableCell>
            <StyledTableCell align='center'>Product Code</StyledTableCell>
            <StyledTableCell align='center'>Category Name</StyledTableCell>
            <StyledTableCell align='center'>SubCategory Name</StyledTableCell>
            <StyledTableCell align='center'>User Email</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories?.response.data.map((row) => (
            <StyledTableRow key={row.cuponId}>
              <StyledTableCell align='center' component="th" scope="row">
                {row.cuponCode}
              </StyledTableCell>
              <StyledTableCell align="center">{row.disCountPercent}</StyledTableCell>
              <StyledTableCell align="center">{`${row.isActive}`}</StyledTableCell>
              <StyledTableCell align="center">{row.productCode}</StyledTableCell>
              <StyledTableCell align="center">{row.categoryName}</StyledTableCell>
              <StyledTableCell align="center">{row.subCategoryName}</StyledTableCell>
              <StyledTableCell align="center">{row.userEmail}</StyledTableCell>
              <StyledTableCell align="center">
                <button onClick={() => CuponDelete(row.cuponId)} className="mx-3 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                  Delete
                </button>
                <Link locale={lang} href={`/dashboard/category/edit/${row.cuponId}`} className="mx-3 bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
                  Edit
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  );
}
