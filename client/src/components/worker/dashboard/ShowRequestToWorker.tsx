"use client";

import { useGetAllRequestDataQuery ,useAcceptWorkAPIMutation} from '@/lib/features/api/workerApiSlice';
import React, { useState,useEffect } from 'react';
import {toast,Toaster} from 'sonner'

const FormComponent = ({ onClose }: { onClose: () => void; }) => {
    const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
    const [RequestData,setRequestData] = useState([])
    const [isPayment,setIsPayment] = useState(0)
    const [openPayment,setOpenPayment] = useState(false)

    const customerData = JSON.parse(localStorage.getItem('customerData')|| '{}')

    // * API call 
    const {data,refetch} = useGetAllRequestDataQuery(customerData?._id)
    const [AcceptWorkAPI] = useAcceptWorkAPIMutation()

    useEffect(()=>{
        setRequestData(data?.result)
        console.log(JSON.stringify(data))
    },[])

    const handleDropdownClick = (index: number) => {
        if (openDropdownIndex === index) {
            setOpenDropdownIndex(null); // Close if it's already open
        } else {
            setOpenDropdownIndex(index); // Open a specific dropdown
        }
    };


    // * handle Accept
    const handleAccept = async (_id:string)=>{
        try{

            setOpenPayment(true)
            if(isPayment<500) return toast.error('check the payment')
            const res = await AcceptWorkAPI({_id,isPayment}).unwrap()
            refetch()
            if(res?.success){
                toast.success(res.message)
            }
        }catch(error){

        }
    }

    return (
        <div className="min-h-[55%] flex w-full justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[60%] absolute right-8 top-[10%]">
                <h1 className="text-2xl font-bold text-white mb-6">Your Work Request Details:</h1>

                {/* Scrollable Container for Dynamic Content */}
                <div className="mt-4 h-[21em] overflow-y-auto p-2 bg-gray-800 rounded-lg space-y-2">
                    {(data?.result)?.length>0 && (data?.result)?.map((data:any, index:number) => (
                        // <div className="w-full max-w-sm mx-auto mt-10" key={index}>
                        <div key={index}>
                            <details  className="w-full p-3  rounded-lg text-white">
                                <summary className="cursor-pointer flex justify-between items-center">
                                    <span>{data?.user}</span>
                                    <svg
                                        className="w-4 h-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </summary>

                                <div className="mt-2 bg-gray-300 rounded-lg shadow-lg p-6 text-sm">
                                    <h2 className="text-2xl font-bold text-black mb-4">Customer Details</h2>
                                    <ul className="list-disc pl-5 text-gray-700 space-y-4">
                                        <li className="list-none flex justify-between items-center">
                                            <span className="font-semibold text-gray-800">Customer Name</span> 
                                            <span className="text-gray-900">{data?.user}</span>
                                        </li>
                                        <li className="list-none flex justify-between items-center">
                                            <span className="font-semibold text-gray-800">Service Location</span> 
                                            <span className="text-gray-900">{data?.servicelocation}</span>
                                        </li>
                                        <li className="list-none flex justify-between items-center">
                                            <span className="font-semibold text-gray-800">Service Date</span> 
                                            <span className="text-gray-900">{(data?.preferredDate).split('T')[0]}</span>
                                        </li>
                                        <li className="list-none flex justify-between items-center">
                                            <span className="font-semibold text-gray-800">Service Time</span> 
                                            <span className="text-gray-900">{data?.preferredTime}</span>
                                        </li>
                                        <li className="list-none flex justify-between items-start">
                                            <span className="font-semibold text-gray-800">About Work</span>
                                            <textarea
                                                className="w-1/2 p-2 border border-gray-400 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gray-500"
                                                rows={3}
                                                disabled
                                                defaultValue = {data?.AdditionalNotes}
                                            >
                                               
                                            </textarea>
                                        </li>
                                        {
                                            openPayment && (<li className="list-none flex justify-between items-start">
                                                <span className="font-semibold text-gray-800">Enter Payment</span>
                                                   <input type='number' placeholder='Minimum amout 500' min={500} onChange={(e)=>setIsPayment(e.target.value)} value={isPayment} />
                                                </li>)
                                        }
                                        
                                        <div className="flex justify-end space-x-4 mt-4 mx-2">
                                            <button
                                                className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                                onClick={()=>handleAccept(data?._id)}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </ul>
                                </div>

                            </details>
                            <hr className='border-gray-600'/>
                        </div>
                            
                        // </div>
                    ))}
                </div>
                <Toaster richColors position='top-center' />

                {/* Buttons */}
                <div className="flex justify-between">
                    <button
                        onClick={() => onClose()}
                        type="button"
                        className="px-6 py-2 mt-4 border border-white text-white rounded-lg hover:bg-gray-700 focus:outline-none"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormComponent;
