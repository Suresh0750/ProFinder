// 



import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {addCategoryType,AdminCredentials} from '../../../types/AdminTypes'
import AddCategoryForm from "@/components/admin/AddCategoryForm"
// import { register } from "module"

console.log('back url',process.env.NEXT_NODE_SERVER_URL)
const baseQuery = fetchBaseQuery({
    baseUrl : `http://localhost:3001`
})


export const adminApi = createApi({
    reducerPath : "adminApi",
    baseQuery,
    endpoints :(builder)=>({
        AddCategoryForm : builder.mutation({
            query : (data:FormData)=>({
                url:`/admin/addCategory`,
                method:"POST",
                body : data
            }),
        }),
        AdminVeriyAPI : builder.mutation({
            query : (data:AdminCredentials)=>({
                url :`/admin/adminVerify`,
                method : 'POST',
                body : data
            })
        })
    })
})


export const {useAddCategoryFormMutation,useAdminVeriyAPIMutation} = adminApi