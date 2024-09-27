

import Login from "@/app/(pages)/admin/login/page"
import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
// * import { register } from "module"

console.log('back url',process.env.NEXT_NODE_SERVER_URL)
const baseQuery = fetchBaseQuery({
    baseUrl : `http://localhost:3001`,
    credentials: 'include',  // * for include cookies
})

// * Function to get headers and pass the role via header in request
const getHeaders = (role :string) => ({
    'Role': role, 
});


export const userApi = createApi({
    reducerPath : "userApi",
    baseQuery,
    endpoints :(builder)=>({
        SignUp : builder.mutation({
            query : (data)=>({
                url:`/user/userSignup`,
                method:"POST",
                body : data
            })
        }),
        Login : builder.mutation({
            query : (data)=>({
                url:`/user/loginverify`,
                method:"POST",
                body : data
            })
        }),
        checkEmailForgetPass : builder.mutation({
            query : (data)=>({
                url:`user/checkEmailForgetPass`,
                method : 'POST',
                body : data
            })
        })
    })
})


export const {useSignUpMutation,useLoginMutation,useCheckEmailForgetPassMutation} = userApi