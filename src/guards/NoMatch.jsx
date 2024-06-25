

import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';

export const NoMatch = () => {

  const { user } = useContext(AuthContext);

  if (user)
    return <Navigate to={'/dashboard'} replace={true}/>
  else 
    return <Navigate to={'/login'} replace={true}/>
  
}