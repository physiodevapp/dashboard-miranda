

import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({children}) => {

  const { user } = useContext(AuthContext)

  if (!user)
    return <Navigate to={'/login'}/>
  else 
    return <>{children}</>
}