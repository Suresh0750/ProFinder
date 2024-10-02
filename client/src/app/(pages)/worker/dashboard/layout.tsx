
"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGetWorkerDetailsQuery } from '@/lib/features/api/workerApiSlice';
import Link from 'next/link';
import { useDispatch } from 'react-redux'
import {getWorkerData} from '@/lib/features/slices/workerSlice'



export default function Layout({ children }: { children: React.ReactNode }) {
  const [customerData, setCustomerData] = useState<any>({});

  const { data, error, isLoading } = useGetWorkerDetailsQuery('');
  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {

      console.log(data)
      setCustomerData(data?.workerData || {});
      dispatch(getWorkerData(data?.workerData))
    }
  }, [data]);

  return (
   
      <div className="flex h-full">
        <aside className="mt-2 h-[92.65vh] flex flex-col justify-start w-[20%] bg-gray-700 text-white shadow-lg">
          <ul className="flex flex-col items-start gap-6 w-full pt-6 text-lg font-bold pl-8">
            <li className="hover:bg-gray-600 w-full py-2 rounded-md cursor-pointer">
              <Link href={'/worker/dashboard/workerdashboard'}>Dashboard</Link>
            </li>
            <li className="hover:bg-gray-600 w-full py-2 rounded-md cursor-pointer">
              <Link href={'/worker/dashboard/personalInfo'}>Personal Info</Link>
            </li>
            <li className="hover:bg-gray-600 w-full py-2 rounded-md cursor-pointer">
              <Link href={'/worker/dashboard/professionalInfo'}>Professional Info</Link>
            </li>
            <li className="hover:bg-gray-600 w-full py-2 rounded-md cursor-pointer">
              <Link href={'/worker/dashboard/workerprojectDetails'}>Works</Link>
            </li>
            <li className="hover:bg-gray-600 w-full py-2 rounded-md cursor-pointer">
              <Link href={''}>Message</Link>
            </li>
          </ul>
        </aside>

        <main className="w-[80%]">{isLoading ? <p>Loading...</p> : children}</main>
      </div>
    
  );
}
