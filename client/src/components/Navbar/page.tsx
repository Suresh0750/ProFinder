'use client'
import Link from 'next/link'
import dashboard from './nav.module.css'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useCustomerLogoutMutation } from '@/lib/features/api/customerApiSlice'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { updateCustomerLogin, updateRole } from '@/lib/features/slices/customerSlice'



export const DropDownDashboard = ()=>{
  const [useDropdown,setUserDropDown] = useState(false)
  const [workerDropdown,setWorkerDropDown] = useState(false)

  return(
    <div className={`flex flex-col ${dashboard.dropDowndashboard}`}>
        <ul className='flex flex-col gap-4 text-gray-800'>
          <li onClick={()=>setUserDropDown((prev)=>!prev)} className='cursor-pointer'>User</li>
          <li onClick={()=>setWorkerDropDown((prev)=>!prev)} className='cursor-pointer'>Worker</li>
          {
            useDropdown && <ul className={`${dashboard.inelementDowndashboard}`}>
                              <li  className='p-2 m-2 cursor-pointer'>
                                <Link href={'/user/login'}>
                                SignIn
                                </Link>
                                </li>
                              <li   className='p-2 m-2 cursor-pointer'>
                                <Link href={'/user/signup'}>
                                SignUp
                                </Link>
                                </li>
                            </ul>
          }
           {
            workerDropdown && <ul className={`${dashboard.inelementDowndashboard}`}>
                                <li className='p-2 m-2 cursor-pointer'>
                                  <Link href={'/worker/login'}>
                                  SignIn
                                  </Link>
                                  </li>
                                <li className='p-2 m-2 cursor-pointer'>
                                  <Link href={'/worker/signup'}>
                                  SignUp
                                  </Link>
                                  </li>
                              </ul>
          } 
        </ul>
    </div>
  )
}

const Page = () => {



  const [role,setRole] = useState('')
  
  const Router = useRouter()
  const dispatch = useDispatch()


  useEffect(()=>{
    let customerRole = JSON.parse(localStorage.getItem("customerData") || "{}")
    setRole(customerRole?.role)
  },[role])

  const [openProfile,setOpenProfile] = useState(false)
  console.log(role)

  const [CustomerLogout,{isSuccess}] = useCustomerLogoutMutation()

  const handleLogout = async ()=>{
    try {

      console.log(role,"customer otp")
      const result = await CustomerLogout(role)
      console.log(result)
      if(result.data.success){
        console.log(`is logout`)
        // dispatch(updateCustomerLogin(false))   // * customer after login
        
        localStorage.setItem("customerData",'')
        window.location.reload()
        setTimeout(()=>{
          Router.push('/homePage')
        },2000)
      }
      
    } catch (error) {
      console.log(error)
    }
  }

    return (
      <>
        <nav className="bg-[#263238] z-[1] fixed top-0 left-0 w-full text-white flex justify-between items-center px-16 py-3">
          <div className="font-bold text-xl">
            ProFinder
          </div>
          
          <ul className="flex justify-between gap-10 items-center w-[30%]">
            <li className="hover:text-gray-300 cursor-pointer">
              <Link href={'/homePage'}>
               Home
              </Link>
            </li>
            <li className="hover:text-gray-300 cursor-pointer">Service</li>
            <li className="hover:text-gray-300 cursor-pointer">Contact</li>
          </ul>
          {
            
              <>
              {
                 !role ? ( <button onClick={()=>setOpenProfile((prev)=>!prev)} className="bg-yellow-500 text-black px-4 py-2 rounded">
                  
                 {/* <Link href={'/worker/dashboard/personalInfo'}> */}
                   Get Started
                 {/* </Link> */}
               </button>) : role=='user' ? <><button>Emergency</button> Dashboard <button onClick={handleLogout}>Logout</button></> :(<>
                <Link href={"/worker/dashboard/personalInfo"}>Dashboard</Link> <button onClick={handleLogout}>Logout</button>
                </>
                )
               
              }
               
              {
                openProfile &&  <DropDownDashboard /> 
              }
              
            </>
            
            
           
          }

         
        </nav>
      </>
    );
  }
  
  export default Page;
  