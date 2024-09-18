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
import { signOut, useSession } from 'next-auth/react';


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

export default function CategoryTable({lang,page,apiDomen}:{lang:Locale,page:number,apiDomen:string|undefined}) {
  const router=useRouter();
  const sessions=useSession();
  
  const [categories, SetCategories] = React.useState<Result<PaginatedList<GetCategoryAllDashboard>>>()
  const [loader, SetLoader] = React.useState<boolean>(false);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${apiDomen}api/Category/GetAllCategoryForTable?page=${page}`, {
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
        const data = await res.json();  // Await the JSON data
        SetCategories(data);  // Now set the correct data to state
      } else if (res.status === 401) {
        Swal.fire({
          title: 'Info!',
          text: 'Please log in again!',
          icon: 'info',
          confirmButtonText: 'Cool'
        }).then((res) => {
          if (res.isConfirmed) {
            signOut();
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {    
    fetchCategories();  // Call the async function inside useEffect
  }, [apiDomen, lang, page, sessions.data?.user.token]);

  const CategoryDelete = async (id: string) => {
    SetLoader(true);
    try {
      const res = await fetch(`${apiDomen}api/Category/DeleteCategory?Id=${id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'langCode': `${lang}`,
          'Accept-Language': `${lang}`,
          'Authorization': `Bearer ${sessions.data?.user.token}`,
        },
        method: "DELETE",
      });

      const responsData = await res.json();
      if (responsData.isSuccess) {
        Swal.fire({
          title: 'Success!',
          text: 'Category deleted successfully!',
          icon: 'success',
          confirmButtonText: 'Cool'
        }).then((res) => {
          if (res.isConfirmed) {
            SetLoader(false);
            fetchCategories();  // Refetch categories after deletion
          }
        });
      } else {
        if (res.status === 401) {
          Swal.fire({
            title: 'Info!',
            text: 'Please log in again!',
            icon: 'info',
            confirmButtonText: 'Cool'
          }).then((res) => {
            if (res.isConfirmed) {
              signOut();
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

  return (
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Category Id</StyledTableCell>
            <StyledTableCell align='center'>Category Name</StyledTableCell>
            <StyledTableCell align='center'>Category IsFeatured</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories?.response.data.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align='center' component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="center">{row.content}</StyledTableCell>
              <StyledTableCell align="center">{`${row.isFeatured}`}</StyledTableCell>
              <StyledTableCell align="center">
                <button onClick={() => CategoryDelete(row.id)} className="mx-3 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                  Delete
                </button>
                <Link locale={lang} href={`/dashboard/category/edit/${row.id}`} className="mx-3 bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold hover:text-white py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
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
