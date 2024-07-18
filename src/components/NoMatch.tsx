

import React, { useContext } from 'react'
import { AuthContext, AuthContextInterface } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const NoMatch = () => {
  const useAuth = (): AuthContextInterface => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  const { userState } = useAuth();

  return (
    userState
    ? <Navigate to={'/dashboard'} replace={true}/>
    : <Navigate to={'/login'} replace={true}/>
  )
  
}