'use client';

import SearchBar from '../../../../../components/admin/SearchBar';
import Table from '../../../../../components/admin/Table'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddCategoryForm from '../../../../../components/admin/AddCategoryForm'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function Category({form}:{form:React.ReactNode}) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const scrollBarside = {
        display: "none"
    }
    return (
        <>
            <section className='mt-[3.5em]'>
                <h2 className="text-white text-4xl font-bold bg-opacity-85 text-center">Category Management</h2>
                <div className='flex flex-col w-[90%] ml-[113px] mt-[31px] h-[40%] bg-[#2a2b36]'>
                    <div className='flex text-white justify-between m-2'> 
                        <SearchBar />
                        <button className='bg-[#519668] rounded p-2 mr-10' onClick={handleOpen}>Add Category</button>      
                    </div>
                    <div>
                        <Table/>  
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                           
                        >
                            <Box sx={style}  className='rounded'>
                                <Typography id="modal-modal-title" className='text-center' variant="h6" component="h2">
                                    Add Category
                                </Typography>
                            <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                            </Box>
                                <AddCategoryForm/>
                            </Box>
                        </Modal>
                    </div>
                </div>
            </section>
        </>
    );
}
