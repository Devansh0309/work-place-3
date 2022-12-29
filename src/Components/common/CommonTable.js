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


export default function CommonTable({data //array of objects
,columnsName //array of objects with title and key
,type
,handleClick
}) {
  return (
    <TableContainer component={Paper}>
      <Table 
      sx={{ minWidth: 700 }} 
      aria-label="customized table">
        <TableHead>
          <TableRow sx={{width:'100%'}}>
            {columnsName.map((item)=>{
                return <StyledTableCell>{item.title}</StyledTableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,i) => (
            <StyledTableRow key={i} sx={{opacity:(type==='candidate'?'1':row.status==='Approved'?'0.4':'1'),pointerEvents:(row.status==='Approved'?'none':'unset')}}>
              {columnsName.map((item)=>{
                if(item.key==='buttons'){
                  return <StyledTableCell>
                  <Button onClick={(e)=>{handleClick('accept',row)}}>Accept</Button>
                  <Button onClick={()=>{handleClick('reject',row)}}>Decline</Button>
                  </StyledTableCell>
                }
                else if(item.key==='resume'){
                  return <StyledTableCell><Button onClick={()=>{
                    window.open(row[item.key],'_blank')
                  }}>View Resume</Button></StyledTableCell>
                }
                else{
                  return <StyledTableCell>{row[item.key]}</StyledTableCell>
                }
              })
              }
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
