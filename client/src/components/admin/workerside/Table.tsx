"use client"
import * as React from 'react';
import Table from '@mui/material/Table';
import { useState, useEffect } from 'react';
import { useGetWorkerListQuery } from '@/lib/features/api/adminApiSlice';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';

// Sample data creation function
function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const WorkerTableBody = () => {
  const [showWorkerList, setShowWorkerList] = useState([]);
  const [allWorkerList,setAllWorkerList] = useState([])
  const { data } = useGetWorkerListQuery('');

  useEffect(() => {
    if (data) {
      setAllWorkerList(data?.result)
      setShowWorkerList(data?.result);
    }
  }, [data]);

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat (g)</TableCell>
            <TableCell align="right">Carbs (g)</TableCell>
            <TableCell align="right">Protein (g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showWorkerList.length > 0
            ? showWorkerList.map((worker: any, index: number) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {worker.name}
                  </TableCell>
                  <TableCell align="right">{worker.calories}</TableCell>
                  <TableCell align="right">{worker.fat}</TableCell>
                  <TableCell align="right">{worker.carbs}</TableCell>
                  <TableCell align="right">{worker.protein}</TableCell>
                </TableRow>
              ))
            : rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </>
  );
};

export default WorkerTableBody;
