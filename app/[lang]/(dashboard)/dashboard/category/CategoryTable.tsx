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
import { Button } from '@mui/material';
import Result from '@/types/ApiResultType';
import PaginatedList from '@/types/Paginated.type';
import GetCategoryAllDashboard from '@/types/CategoryTypes/GetALLCategory';
import Link from 'next/link';
import { Locale } from '@/i18n-config';

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
  return (
    <TableContainer component={Paper}>
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
                    <Button variant='contained' color="warning">Secondary</Button>
<Button variant="contained" color="success" className='mx-2'>
  Success
</Button>
<Link href={`${lang}/dashboard/category/edit/${row.id}`} className='p-2 btn-info'>
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