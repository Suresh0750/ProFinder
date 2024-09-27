import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addCategoryType, AdminCredentials, EditCategoryType } from '../../../types/AdminTypes';

// * baseQuery
const baseQuery = fetchBaseQuery({
    baseUrl: `http://localhost:3001`,
    credentials: 'include',  
});

// * Function to get headers
const getHeaders = (role:string) => ({
    'Role': 'admin', 
});

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery,
    endpoints: (builder) => ({
        AddCategoryForm: builder.mutation({
            query: (data: FormData) => ({
                url: `/admin/addCategory`,
                method: "POST",
                body: data,
                headers: getHeaders('admin'), 
            }),
        }),
        AdminVeriyAPI: builder.mutation({
            query: (data: AdminCredentials) => ({
                url: `/admin/adminVerify`,
                method: 'POST',
                body: data,
                headers: getHeaders('admin'), 
            }),
        }),
        FetchCategoryData: builder.query({
            query: () => ({
                url: '/admin/fetchCategoryData',
                method: 'GET',
                headers: getHeaders('admin'), 
            }),
        }),
        EditCategoryAPI: builder.mutation({
            query: (data: EditCategoryType) => ({
                url: `/admin/editCategory`,
                method: 'POST',
                body: data,
                headers: getHeaders('admin'), 
            }),
        }),
        ListUnlistAPI: builder.mutation({
            query: (data: { _id: string; isListed: boolean }) => ({
                url: `/admin/isListVerify`,
                method: 'POST',
                body: data,
                headers: getHeaders('admin'), 
            }),
        }),
        deleteProductAPI: builder.mutation({
            query: (data: string) => ({
                url: `/admin/deleteProduct/${data}`,
                method: 'DELETE',
                body: data,
                headers: getHeaders('admin'), 
            }),
        }),
        AdminLogoutAPI: builder.mutation({
            query: () => ({
                url: `/admin/adminLogout`,
                method: 'POST',
                headers: getHeaders('admin'), 
            }),
        }),
        getWorkerList : builder.query({
            query : ()=>({
                url: `/admin/getWorkerList`,
                method: "GET",
                headers: getHeaders('admin'), 
            })
        }),
        getUserList : builder.query({
            query:()=>({
                url:'/admin/getAllUserList',
                method:'GET',
                headers:getHeaders('admin')
            })
        })
    })
});

// * Export hooks for usage in functional components
export const {
    useAddCategoryFormMutation,
    useAdminVeriyAPIMutation,
    useFetchCategoryDataQuery,
    useEditCategoryAPIMutation,
    useListUnlistAPIMutation,
    useDeleteProductAPIMutation,
    useAdminLogoutAPIMutation,
    useGetWorkerListQuery,
    useGetUserListQuery
} = adminApi;