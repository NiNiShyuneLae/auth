import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './page/Dashboard'
import Register from './page/Register'
import Login from './page/Login'
import Logout from './page/Logout'
import RouteGuard from './components/RouteGuard'
import Create from './page/Create'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<RouteGuard><Dashboard/></RouteGuard>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/logout' element={<Logout/>}/>
      </Routes>
    </div>
  )
}

export default App