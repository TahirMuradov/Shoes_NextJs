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

function createData(
  id:string,
  name: string,
  isFeatured: boolean,
  subCategoryName: string[]|null|undefined,
  
) {
  return { id, name, isFeatured, subCategoryName };
}

const rows = [
  createData('123', "Yay", true, ["cekeley"]),
  createData('123', "Qis", false, ["Saposka"]),
  createData('123', "Payiz", true,null),

];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Category Name</StyledTableCell>
            <StyledTableCell align="right">Category Id</StyledTableCell>
            <StyledTableCell align="right">IsFeatured</StyledTableCell>
       
            <StyledTableCell align="right">SubCategories</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.id}</StyledTableCell>
           
              <StyledTableCell align="right"><span>
                {row.isFeatured?"true":"false"}
                </span> </StyledTableCell>
              
              <StyledTableCell align="right">{row.subCategoryName?.map((subCategory)=>(
                <span key={subCategory}>{subCategory},</span>
              ))}</StyledTableCell>
                    <StyledTableCell align="right">
                    <Button variant='contained' color="warning">Secondary</Button>
<Button variant="contained" color="success" className='mx-2'>
  Success
</Button>
<Button variant="contained" color="error">
  Error
</Button>
                    </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}