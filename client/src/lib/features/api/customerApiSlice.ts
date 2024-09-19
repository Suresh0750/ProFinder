

// * common API for User and Worker

import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {OTPData} from '../../../types/otpTypes/otpTypes'

console.log('back url',process.env.NEXT_NODE_SERVER_URL)
const baseQuery = fetchBaseQuery({
    baseUrl : `http://localhost:3001`,
    credentials: 'include',  // for include cookies
})


export const customerApi = createApi({
    reducerPath : "CustomerOtp",
    baseQuery,
    endpoints :(builder)=>({
        CustomerOtp : builder.mutation({
            query : (data:OTPData)=>({
                url:`/customer/verifyOTP`,
                method:"POST",
                body : data
            })
        }),
        CustomerResend : builder.mutation({
            query : (data:OTPData)=>({
                url : `/customer/resentOTP`,
                method:"POST",
                body:data
            })
        }), 
        ForgetPassword : builder.mutation({          // * Forget password page API
            query : (data )=>({
                url : `/customer/setForgotPassword`,
                method : "POST",
                body :data
            })
        }),
        CustomerGoogleLogin : builder.mutation({
            query : (data )=>({
                url : `/customer/CustomerGoogleLogin`,
                method : "POST",
                body :data
            })
        }),
        CustomerLogout : builder.mutation({
            query : (data )=>({
                url : `/customer/cutomerLogout`,
                method : "POST",
                body :data
            })
        }),
        customerLogIn : builder.mutation({
            query : (data )=>({
                url : `/customer/customerLogIn`,
                method : "POST",
                body :data
            })
        })
    })
})


export const {useCustomerOtpMutation,useCustomerResendMutation,useForgetPasswordMutation,useCustomerGoogleLoginMutation,useCustomerLogoutMutation} = customerApi