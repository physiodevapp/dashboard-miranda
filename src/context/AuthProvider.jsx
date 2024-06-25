
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('current-user');
  if (user)
    return JSON.parse(user)
  else
    return null
}

const AuthProvider = ({children}) => {

  const [user, setUser] = useState(getUserFromLocalStorage());
  const [refreshUser, setRefreshUser] = useState(false);
  const navigate = useNavigate();

  const updateUserToLocalStorage = (user = null) => {
    if (user) 
      localStorage.setItem('current-user', JSON.stringify(user))
    else
      localStorage.removeItem('current-user')

    setUser(user);
  }

  const login = (user) => {
    updateUserToLocalStorage(user);
    navigate('/dashboard');
  }

  const logout = () => {
    updateUserToLocalStorage();
    navigate('/login');
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setRefreshUser(!refreshUser)
      setUser(getUserFromLocalStorage())
    }, 4000);
  
    return () => clearTimeout(timeoutId)
  }, [refreshUser])
  

  return (
    <>
      <AuthContext.Provider value={{user, login, logout}}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export { AuthProvider, AuthContext }
