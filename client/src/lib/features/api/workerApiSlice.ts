

import Login from "@/app/(pages)/admin/login/page"
import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
// import { register } from "module"
import {FormValues} from "@/types/workerTypes"
import ProfessionalInfo from "@/components/worker/professionalInfo"

const baseQuery = fetchBaseQuery({
    baseUrl : `http://localhost:3001`,
    credentials: 'include',  // for include cookies
})

// * Function to get headers and pass the role via header in request
const getHeaders = (role :string) => ({
    'Role': role, 
});


export const workerApi = createApi({
    reducerPath : "workerApi",
    baseQuery,
    endpoints :(builder)=>({
        WorkerSignUp : builder.mutation({
            query : (data:FormValues)=>({
                url:`/worker/personalinfo`,
                method:"POST",
                body : data
            })
        }),
        ProfessionalInfo : builder.mutation({
            query : (data)=>({
                url:`/worker/ProfessionalInfo`,
                method:"POST",
                body : data
            })
        }),
        checkWorkerEmailForgetPass : builder.mutation({
            query : (data)=>({
                url:`/worker/checkEmailForgetPass`,
                method : 'POST',
                body : data
            })
        }),
        getWorkerDetails : builder.query({
            // query:()=> '/worker/getWorkerData'
            query : (data)=>({
                url:`/worker/getWorkerData`,
                method : 'POST',
                body : data,
                headers : getHeaders('worker')
            })
        }),
        Login : builder.mutation({
            query : (data)=>({
                url:`/worker/loginverify`,
                method:"POST",
                body : data
            })
        })
    })
})


export const {useWorkerSignUpMutation,useProfessionalInfoMutation,useCheckWorkerEmailForgetPassMutation,useLoginMutation,useGetWorkerDetailsQuery} = workerApi