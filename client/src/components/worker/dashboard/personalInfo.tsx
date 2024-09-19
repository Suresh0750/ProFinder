"use client"


import {useSelector} from 'react-redux'

const DashboardPersonalInfo = ()=>{
    const workerData = useSelector((state:any)=>state?.WorkerSignupData?.getWorkerData)
    console.log(workerData)
    return(
        <div className="text-white w-full space-y-4">
                <div className="flex justify-between items-center border-b border-slate-400 pb-2">
                    <h2 className="text-lg font-semibold">work </h2>
                    <h2 className="text-lg">{workerData.Category || 'N/A'}</h2>
                </div>
                <div className="flex justify-between items-center border-b border-slate-400 pb-2">
                    <h2 className="text-lg font-semibold">Country</h2>
                    <h2 className="text-lg">{workerData.Country || 'N/A'}</h2>
                </div>
                <div className="flex justify-between items-center border-b border-slate-400 pb-2">
                    <h2 className="text-lg font-semibold">State / Province</h2>
                    <h2 className="text-lg">{workerData.State || 'N/A'}</h2>
                </div>
                <div className="flex justify-between items-center border-b border-slate-400 pb-2">
                    <h2 className="text-lg font-semibold">ZIP / Postal code</h2>
                    <h2 className="text-lg">{workerData.PostalCode || 'N/A'}</h2>
                </div>
                <div className="flex justify-between items-center border-b border-slate-400 pb-2">
                    <h2 className="text-lg font-semibold">City</h2>
                    <h2 className="text-lg">{workerData.City || 'N/A'}</h2>
                </div>
                <div className="flex justify-between items-center border-b border-slate-400 pb-2">
                    <h2 className="text-lg font-semibold">Street Address</h2>
                    <h2 className="text-lg">{workerData.StreetAddress || 'N/A'}</h2>
                </div>
                <div className="flex justify-between items-center border-b border-slate-400 pb-2">
                    <h2 className="text-lg font-semibold">Apt Suite</h2>
                    <h2 className="text-lg">{workerData.Apt || 'N/A'}</h2>
                </div>
                <div className="flex justify-between items-center border-b border-slate-400 pb-2">
                    <h2 className="text-lg font-semibold">Identity</h2>
                    <div className='w-[2em] h-[2em]'>
                        <img src={workerData.Identity} alt='Worker Identity' />
                    </div>
                </div>
             
            </div>
    )
}

export default DashboardPersonalInfo