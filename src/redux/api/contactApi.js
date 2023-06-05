import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const contactApi = createApi({
    reducerPath : 'contactApi',
    baseQuery : fetchBaseQuery({baseUrl : 'https://contact-app.mmsdev.site/api/v1'}),
    tagTypes : ['contact'],
    endpoints : (builder) => ({
        getContacts : builder.query ({
            query : (token) => ({
                url : '/contact',
                method : 'GET',
                headers : {authorization : `Bearer ${token}`},
            }),
            providesTags : ['contact']
        }),
        deleteContacts : builder.mutation({
            query : ({token,id}) => ({
                url : `/contact/${id}`,
                method : 'DELETE',
                headers : {authorization : `Bearer ${token}`},
            }),
            invalidatesTags : ['contact']
        }),
        createContact : builder.mutation ({
            query : ({token,user}) => ({
                url : '/contact',
                method : 'POST',
                headers : {authorization :  `Bearer ${token}`},
                body : user
            }),
            invalidatesTags : ['contact']
        })
    })
})

export const {useGetContactsQuery,useDeleteContactsMutation,useCreateContactMutation} = contactApi