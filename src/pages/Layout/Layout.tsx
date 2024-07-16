

import React, { useContext, useState } from 'react'
import { MenuLayout, NavbarLayout, MainLayout, GridLayout } from './LayoutStyled';
import { Navigate, Outlet } from 'react-router-dom';
import { MenuComponent } from '../../components/Menu/MenuComponent';
import { NavbarComponent } from '../../components/Navbar/NavbarComponent';
import { AuthContext, AuthContextInterface } from '../../context/AuthContext';

export const Layout = () => {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(true);

  const useAuth = (): AuthContextInterface => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  const { userState } = useAuth();

  const handleClickMenu = (): void => setIsMenuVisible(!isMenuVisible)

  return (
    !userState
    ? <Navigate to={'/login'}/>
    : <>
        <GridLayout show={isMenuVisible.toString()}>
          <NavbarLayout>
            <NavbarComponent handleClickMenu={handleClickMenu} show={isMenuVisible.toString() as ("true" | "false")} />
          </NavbarLayout>
          <MenuLayout>
            <MenuComponent/>
          </MenuLayout>
          <MainLayout>
            <Outlet/>
          </MainLayout>
        </GridLayout>
      </>
  )
}
