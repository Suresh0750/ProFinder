

import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {addCategoryType,AdminCredentials,EditCategoryType} from '../../../types/AdminTypes'

// * baseQuery
const baseQuery = fetchBaseQuery({
    baseUrl : `http://localhost:3001`,
    credentials: 'include',  // for include cookies
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
        }),
        FetchCategoryData : builder.query({
            query : ()=>'/admin/fetchCategoryData',
        }),
        EditCategoryAPI : builder.mutation({
            query:(data:EditCategoryType)=>({
                url :`/admin/editCategory`,
                method : 'POST',
                body : data
            })
        }),
        ListUnlistAPI : builder.mutation({
            query : (data:{_id:string,isListed:boolean})=>({
                url :`/admin/isListVerify`,
                method : 'POST',
                body : data
            })
        }),
        deleteProductAPI : builder.mutation({
            query : (data:string)=>({
                url :`/admin/deleteProduct/${data}`,
                method : 'POST',
                body : data
            })
        })
    })
})

// 



export const {useAddCategoryFormMutation,useAdminVeriyAPIMutation,useFetchCategoryDataQuery,useEditCategoryAPIMutation,useListUnlistAPIMutation,useDeleteProductAPIMutation} = adminApi