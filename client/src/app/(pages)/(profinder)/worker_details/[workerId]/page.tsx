"use client"
import MaterialCarousel from '@/components/wokerDetailscarousel'
import Image from 'next/image'
import {useState,useEffect} from 'react'
import {useGetSingleWorkerDetailsQuery} from '@/lib/features/api/workerApiSlice'
import defaultImage from '../../../../../../public/images/worker/defaultImage.png'
import ServiceRequestModal from '@/components/serviceModal'
import PayUComponent from '@/components/PayU'


interface CarouselProps {
  workImages: string[];
}

// {params}:{params:any}

const page = ({params}:{params:string})=>{

    const [workerDetails,setWorkerDetails] = useState([])
    const [isModalOpen,setIsModalOpen] = useState(false)

    const {_id} = JSON.parse(localStorage.getItem("customerData") || '{"_id":null}');

    const customerData = JSON.parse(localStorage.getItem("customerData") || '{"_id":null}');

    const {data,refetch} = useGetSingleWorkerDetailsQuery(`${params?.workerId}/${_id}`)


    useEffect(()=>{
        setWorkerDetails(data?.result)
        console.log(data)
        console.log(JSON.stringify(workerDetails))

    },[data])

    return(

        <div className="mt-[75px]">
            <div className="bg-white p-6 mb-6 rounded-lg shadow-lg w-[80%] mx-auto">
            {/* Profile Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                    <img
                    src={workerDetails?.Profile || defaultImage}
                    alt={"worker"}
                    className="rounded-full w-32 h-32 object-cover"
                    />
                        <div>
                        <h1 className="text-3xl font-bold">{workerDetails?.FirstName}</h1>
                        <p className="text-gray-600">
                            <i className="fas fa-map-marker-alt"></i> {workerDetails?.City}
                        </p>
                        <p className="text-gray-500">Available: {"worker.availability"}</p>
                        <div className="flex items-center mt-2">
                            <span className="text-yellow-500 text-lg">★★★★★</span>
                        </div>
                        {
                           !data?.requestData ? (<button onClick={()=>setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 sm:mt-0">
                           Add Request 
                       </button>) : (data?.requestData?.isAccept=="Accepted") ? (<button  className="bg-blue-500 cursor-none text-white px-4 py-2 rounded-md mt-4 sm:mt-0">
                            Accept 
                        </button>) : (data?.requestData?.isAccept=="Pending") ? (<button  className="bg-blue-500 cursor-none text-white px-4 py-2 rounded-md mt-4 sm:mt-0">
                            Pending 
                        </button>) : ((<button  className="bg-blue-500 cursor-none text-white px-4 py-2 rounded-md mt-4 sm:mt-0">
                            Cancelled 
                        </button>))
                        }
                        
                        </div>
                        <br />

                </div>
                <div>
                            {
                                data?.requestData?.isAccept === "Accepted" && (
                                    <PayUComponent currUserData={customerData} requestId = {data?.requestData?._id} payment={(data?.requestData?.payment) || '500'}/>
                                    // <button className='p-2 bg-green-500 rounded'>Payment</button>
                                    
                                )
                            }
                            &nbsp;
                            {
                               (data?.requestData?.isAccept === "Accepted")&& (data?.requestData?.payment > 0) && (
                                    <span>{data?.requestData?.payment}</span>
                                )
                            }
                        </div>
                </div>
                {/* Overview Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-700">
                        <div className='flex flex-col gap-1'>
                            <div>
                                <p className="font-bold">Services:</p>
                                <p>{workerDetails?.Category}</p>
                            </div>
                            <div>
                                <p className="font-bold">Experience:</p>
                                {/* <p>{"worker.experience"}</p> */}
                                <p>5</p>
                            </div>
                            <div>
                                <p className="font-bold">Availability:</p>
                                {/* <p>{"worker.availability"}</p> */}
                                <p>update...</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Carousel Section */}
                <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-4 text-center">Our Work</h2>
                {
                    data?.result?.WorkerImage.length >0 &&  <MaterialCarousel images={data?.result?.WorkerImage}/> 
                }
                </div>

            </div>
            <button className='p-2 bg-green-600 rounded ml-40'>Post A Review</button>
            <div className="w-[80%] text-white p-4 rounded-lg mx-auto mb-3  shadow-lg mt-4">
            <h2 className="text-lg font-semibold">Reviews and Ratings</h2>
            <div className="flex items-center space-x-2">
                <div className="bg-green-500 text-white p-2 rounded-md">3.5</div>
                <div>
                {/* <!-- Star ratings component here --> */}
                <span>⭐⭐⭐⭐☆</span>
                </div>
            </div>
  
            <h3 className="mt-4">Start Your Reviews and Ratings</h3>
            <div className="flex items-center space-x-2">
            
                <span>☆☆☆☆☆</span>
            </div>

            <h4 className="mt-6">Customer Reviews</h4>
            <div className="space-y-4 mt-4">

            <div className=" p-4 rounded-lg">
            <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                <img src="path_to_avatar.png" alt="avatar" className="w-10 h-10 rounded-full" />
                <div>
                    <p className="font-semibold">Kaif Umar</p>
                    <div className="flex items-center space-x-1">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">4.0</span>
                    <span>⭐⭐⭐⭐</span>
                    </div>
                </div>
                </div>
                <p className="text-gray-400 text-sm">2024-05-04</p>
            </div>
            </div>  
        </div>
        </div>
         <ServiceRequestModal workerDetails={workerDetails} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} refetch={()=>refetch()} />
    
        
        </div>
  )
}

export default page;

