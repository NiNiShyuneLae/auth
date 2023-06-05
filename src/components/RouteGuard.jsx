import Cookies from 'js-cookie'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


const RouteGuard = ({children}) => {
    const token = Cookies.get('token')
    const nav = useNavigate()
    if(token){
        return children
    }else{
       return <Navigate to={'/login'}/>
    }
}

export default RouteGuard