

import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const NoMatch = () => {
  const { userState } = useContext(AuthContext);

  if (userState)
    return <Navigate to={'/dashboard'} replace={true}/>
  else 
    return <Navigate to={'/login'} replace={true}/>
  
}