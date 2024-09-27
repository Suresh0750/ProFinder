import * as React from 'react';
import Table from '@mui/material/Table';

import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchBar from '@/components/admin/SearchBar';
import TBody from '@/components/admin/workerside/Table'

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}


function createData1(
    No:number,
    RegisterImage : File,
    Name : string,
    Phone : number,
    categories : string,
    Actions :   {isVerified:boolean,isBlock:boolean}
){
    return {No,RegisterImage,Name,categories,Actions}
}



const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {

  return (
    <div className='w-[100%]'>
        <h2 className='text-2xl font-bold text-white opacity-60 ml-3'>Worker List</h2>
        <div className='w-[16em] border-solid border-[2px] m-3 rounded border-white ml-3'>
            <SearchBar />
        </div>
        <TableContainer component={Paper} className='ml-3 w-[90%]'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead className='bg-black'>
            <TableRow >
                <TableCell className='text-1xl font-bold text-white '>No</TableCell>
                <TableCell className='text-1xl font-bold text-white ' align="right">RegisterImage</TableCell>
                <TableCell className='text-1xl font-bold text-white ' align="right">Name</TableCell>
                <TableCell className='text-1xl font-bold text-white ' align="right">Phone</TableCell>
                <TableCell className='text-1xl font-bold text-white ' align="right">categories</TableCell>
                <TableCell className='text-1xl font-bold text-white ' align="right">Actions</TableCell>
            </TableRow>
            </TableHead>
            <TBody />
        </Table>
        </TableContainer>
    </div>
  );
}