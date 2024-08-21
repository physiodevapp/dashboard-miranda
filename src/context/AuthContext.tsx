
import React, { createContext, Reducer, Dispatch, ReactNode, useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export interface AuthContextInterface {
  userState: StateType,
  userDispatch: Dispatch<ActionInterface>
}

interface ActionInterface {
  type: "login" | "logout",
  payload?: {}
};

export type StateType = { email: string, first_name: string, last_name: string, photo: string, id: string } | null;

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextInterface | null>(null);

const getUserFromLocalStorage = (): StateType => {
  const user = localStorage.getItem('currentUser');
  if (user)
    return JSON.parse(user)
  else
    return null
}

const userReducer = (state: StateType, {type, payload}: ActionInterface) => {
  switch (type) {
    case 'login':
      localStorage.setItem('currentUser', JSON.stringify(payload));
  
      state = JSON.parse(JSON.stringify(payload));

      return state;
    case 'logout':
      localStorage.removeItem('currentUser');
      localStorage.removeItem('authToken');

      state = null;

      return state;
    default:
      return state;
  }
}

const AuthProvider = ({children}: AuthProviderProps) => {
  const [userState, userDispatch] = useReducer<Reducer<StateType, ActionInterface>>(userReducer, getUserFromLocalStorage());
  const [refreshUser, setRefreshUser] = useState<boolean>(false);

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
