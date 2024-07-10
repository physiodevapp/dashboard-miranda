
import React, { createContext, useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

const AuthContext = createContext();

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('current-user');
  if (user)
    return JSON.parse(user)
  else
    return null
}

const userReducer = (state, {type, payload}) => {
  switch (type) {
    case 'login':
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(payload.password, salt);

      localStorage.setItem('current-user', JSON.stringify({...payload, password: hash}));

      state = JSON.parse(JSON.stringify({...payload, password: hash}));

      return state;
    case 'logout':
      localStorage.removeItem('current-user');

      state = null;

      return state;
    default:
      return state;
  }
}

const AuthProvider = ({children}) => {
  const [userState, userDispatch] = useReducer(userReducer, getUserFromLocalStorage());
  const [refreshUser, setRefreshUser] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (userState && pathname === '/login')
      navigate('/dashboard')
  }, [pathname])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRefreshUser(!refreshUser);

      if (!getUserFromLocalStorage())
        navigate('/login');
    }, 4000);
  
    return () => clearTimeout(timeoutId)
  }, [refreshUser])
  

  return (
    <>
      <AuthContext.Provider value={{userState, userDispatch}}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export { AuthProvider, AuthContext }
