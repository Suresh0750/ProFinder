

// * common API for User and Worker

import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {OTPData} from '../../../types/otpTypes/otpTypes'

console.log('back url',process.env.NEXT_NODE_SERVER_URL)
const baseQuery = fetchBaseQuery({
    baseUrl : `http://localhost:3001`,
    credentials: 'include',  // for include cookies
})

// Function to get headers
const getHeaders = (role :string) => ({
    'Role': role, 
});

export const customerApi = createApi({
    reducerPath : "CustomerOtp",
    baseQuery,
    endpoints :(builder)=>({
        CustomerOtp : builder.mutation({
            query : (data:OTPData)=>({
                url:`/customer/verifyOTP`,
                method:"POST",
                body : data,
                headers : getHeaders('customer')
            })
        }),
        CustomerResend : builder.mutation({
            query : (data:OTPData)=>({
                url : `/customer/resentOTP`,
                method:"POST",
                body:data,
                headers : getHeaders('customer')
            })
        }), 
        ForgetPassword : builder.mutation({          // * Forget password page API
            query : (data )=>({
                url : `/customer/setForgotPassword`,
                method : "POST",
                body :data,
                headers : getHeaders('customer')
            })
        }),
        CustomerGoogleLogin : builder.mutation({
            query : (data )=>({
                url : `/customer/CustomerGoogleLogin`,
                method : "POST",
                body :data,
                headers : getHeaders('customer')
            })
        }),
        CustomerLogout : builder.mutation({
            query : (data )=>({
                url : `/customer/cutomerLogout`,
                method : "POST",
                body :data,
                headers : getHeaders('customer')
            })
        }),
        customerLogIn : builder.mutation({
            query : (data )=>({
                url : `/customer/customerLogIn`,
                method : "POST",
                body :data,
                headers : getHeaders('customer')
            })
        }),
        customerGoogleVerification : builder.mutation({
            query : (data)=>({
                url : `/customer/customerGoogleVerification${data}`,
                method : "POST",
                body :data,
                headers : getHeaders('customer')
            })
        }),
        listWorkerDataAPI : builder.query({
            query : ()=>({
                url : `/customer/getALLVerifiedWorker`,
                method : "GET",
                headers : getHeaders('customer')
            })
        }),
        getCategoryName : builder.query({
            query : ()=> ({
                url : `/customer/getCategoryName`,
                method : "GET",
                headers : getHeaders('customer')
            })
        }),
        getNearByworkerList : builder.mutation({
            query : (data)=> ({
                url : `/customer/getNearByWorkerDetails${data}`,
                method : "POST",
                headers : getHeaders('customer')
            })
        })
    })
})

// GoogleLogin


export const {useCustomerOtpMutation,useCustomerResendMutation,useForgetPasswordMutation,useCustomerGoogleLoginMutation,useCustomerLogoutMutation,useCustomerGoogleVerificationMutation,useGetCategoryNameQuery,useListWorkerDataAPIQuery,useGetNearByworkerListMutation} = customerApi