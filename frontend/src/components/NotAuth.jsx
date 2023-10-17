import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const NotAuth = ({ isAuth }) => {
  return (
    isAuth==='false' ? <Outlet /> : <Navigate to={'/'}/>
  )
}

export default NotAuth