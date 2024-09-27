"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { useGetUserListQuery } from "@/lib/features/api/adminApiSlice";
import Table from '@mui/material/Table';
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import SearchBar from '@/components/admin/SearchBar';
import { Pagination } from "@mui/material";

function createData(
  No: number,
  Name: string,
  Phone: number,
  EmailId: string,
  Actions: string
) {
  return { No, Name, Phone,EmailId, Actions };
}

const UserTable = () => {

  const [page,setPage] = useState(1)
  const [showUserList, setShowUserList] = useState<any[]>([]);
  const [allWorkerList, setAllUserList] = useState<any[]>([]);
  const { data } = useGetUserListQuery("");


  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage)
  };


  useEffect(() => {
    if (data) {
      setAllUserList(data?.result);
      setShowUserList(
        (data?.result).map((user: any, i: number) =>
            
          createData(
            i + 1,
            user.username, // Assuming this is a URL for the image
            user.PhoneNumber,
            user.EmailAddress,
            "Action",
          )
          
        )
      );
    }
  }, [data]);

  return (

    <>

    <div className='w-64 border-2 m-3 rounded border-white ml-3'>
        <SearchBar />
    </div>
    <TableContainer component={Paper} className='ml-3 w-[90%]'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className='bg-black'>
            <TableRow>
            <TableCell className='text-xl font-bold text-white'>No</TableCell>
            <TableCell className='text-xl font-bold text-white' align="right">Name</TableCell>
            <TableCell className='text-xl font-bold text-white' align="right">Phone</TableCell>
            <TableCell className='text-xl font-bold text-white' align="right">Email Id</TableCell>
            <TableCell className='text-xl font-bold text-white' align="right">Actions</TableCell>
            </TableRow>
        </TableHead>
        {/* Passing currentPage and rowsPerPage as props to the TBody component */}
        <TableBody>
        {showUserList.length > 0 &&
        showUserList.slice((page-1), 5).map((worker: any, index: number) => (
            <TableRow key={index}>
            <TableCell component="th" scope="row">
                {((page-1)*5)+index+1}
            </TableCell>
            <TableCell align="right">{worker.Name}</TableCell>
            <TableCell align="right">{worker.Phone}</TableCell>
            <TableCell align="right">{worker.EmailId}</TableCell>
            <TableCell align="right">
                <button className="p-2 bg-green-600 rounded">Action</button>
            </TableCell>
            </TableRow>
        ))}
    </TableBody>
        </Table>
    </TableContainer>
    <div className='flex justify-center mt-4'>
    <Pagination
          count={Math.ceil(showUserList.length / 5)} // Total number of pages
          page={page} // Current page number
          onChange={handleChangePage} // Handle page change
          variant="outlined"
          color="primary"
        />
    </div>
    </>
  );
};

export default UserTable;
