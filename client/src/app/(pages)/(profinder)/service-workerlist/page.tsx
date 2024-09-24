"use client";
import React, { useState, useEffect} from 'react';
import MechImage from '../../../../../public/images/Admin/category/mechanic.jpg';
import { AiTwotoneEnvironment } from "react-icons/ai";
import { MdSearch } from "react-icons/md"; // Importing search icon
import Image from 'next/image';
import { Pagination } from "@mui/material";
import Footer from '@/components/Footer';
import {useGetCategoryNameQuery, useListWorkerDataAPIQuery} from '@/lib/features/api/customerApiSlice'
import {WorkerDatails} from '@/types/workerTypes'


const ServiceWorkerListPage = () => {
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [showCategory,setShowCategory] = useState<WorkerDatails[]>([])
    const [allCategory,setAllCategory]  = useState<WorkerDatails[]>([])
    const [categoryName,setCategoryName] = useState<string[]>([])
    // * API call fetch all verified worker
    const {data} = useListWorkerDataAPIQuery('')
    const {data:GetCategoryName} = useGetCategoryNameQuery('')

    useEffect(()=>{
        setCategoryName(GetCategoryName?.result)
    
    },[GetCategoryName])

    useEffect(()=>{
        setAllCategory(data?.result)
        setShowCategory(data?.result)
       
    },[data])
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value); // Update the page number with the selected page
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value); // Update the search term
    };

    return (
        <div className='mt-[52px]'>
          
            <div className='flex items-center w-[20em] border border-solid border-gray-400 rounded p-1 ml-8 mt-[4em]'>
                <MdSearch className='text-gray-600 mr-2' />
                <input
                    type="search"
                    placeholder='Search by state or city'
                    className='outline-none p-1'
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            
            {/* filter head category wise */}

            <ul className='flex justify-between space-x-4 bg-gray-100 p-3 rounded-lg shadow-md'>
            {categoryName && ["All",...categoryName].map((category) => (
                <li key={category} className='cursor-pointer py-2 px-4 bg-blue-50 rounded-full hover:bg-blue-100 text-gray-700 transition'>
                {category}
                </li>
            ))}
            </ul>

            {/* container for show all worker */}
           
            <div className='container px-0 m-7 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {
                   
                   showCategory && showCategory.map((val, i) => (
                                            <div className='card w-full flex flex-col border border-gray-200 shadow-lg hover:shadow-xl rounded-lg overflow-hidden' >
                                            <img src={val?.Profile} width={500} height={256} className=' object-fill' alt='Mechanic' />
                                            <div className='p-4'>
                                                <h2 className='text-xl font-semibold text-gray-900'>{val?.FirstName}</h2>
                                                <h2 className='text-sm text-gray-600'>Reviews</h2>
                                                <span className='flex items-center text-gray-500 mt-2'>
                                                <AiTwotoneEnvironment className='mr-1' />
                                                {/* Kakkanad, Kochi, Kerala */}
                                                {val?.StreetAddress}
                                                </span>
                                                <button className='mt-4 bg-orange-500 text-white p-2 rounded m-1 PX-3 hover:bg-orange-600'>
                                                {/* Mechanic */}
                                                {val?.Category}
                                                </button>
                                                <button className='mt-2 bg-gray-900 text-white p-2 rounded m-1 PX-3 hover:bg-gray-700'>
                                                Read More
                                                </button>
                                            </div>
                                            </div>

                    ))
                }
            </div>

             {/* Pagination for show all Worker */}
            <div className="flex justify-center mb-4">
                <Pagination
                    count={Math.ceil([1, 2, 3, 4, 5, 6, 7, 8].length / 8)} // Total number of pages
                    page={page} // Current page number
                    onChange={handleChangePage} // Handle page change
                    variant="outlined"
                    color="primary"
                />
            </div>
            
            {/* footer component */}
            <Footer />
        </div>
    );
};

export default ServiceWorkerListPage;