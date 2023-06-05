import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath : 'authApi',
    baseQuery : fetchBaseQuery({baseUrl : 'https://contact-app.mmsdev.site/api/v1'}),
    endpoints : (builder) => ({
        registerAcc : builder.mutation ({
            query : (user) => ({
                url : '/register',
                method : 'POST',
                body : user
            })
        }),
        loginAcc : builder.mutation ({
            query : (user) => ({
                url : '/login',
                method : 'POST',
                body : user
            })
        }),
        logoutAcc : builder.mutation ({
            query : (token) => ({
                url : '/user-logout',
                method : 'POST',
                headers : {authorization : `Bearer ${token}`}
            })
        })
    })
})

export const {useRegisterAccMutation,useLoginAccMutation,useLogoutAccMutation} = authApi