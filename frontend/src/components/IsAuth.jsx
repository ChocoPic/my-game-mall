import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const IsAuth = ({ isAuth }) => {
  return (
    isAuth==='true' ? <Outlet /> : <Navigate to={'/'}/>
  )
}

export default IsAuth