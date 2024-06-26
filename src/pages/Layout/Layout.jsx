

import React, { useContext, useState } from 'react'
import { MenuLayout, NavbarLayout, MainLayout, GridLayout } from './LayoutStyled';
import { Navigate, Outlet } from 'react-router-dom';
import { MenuComponent } from '../../components/Menu/MenuComponent';
import { NavbarComponent } from '../../components/Navbar/NavbarComponent';
import { AuthContext } from '../../context/AuthContext';

export const Layout = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const { userState } = useContext(AuthContext);

  const handleClickMenu = () => setIsMenuVisible(!isMenuVisible)

  if (!userState)
    return <Navigate to={'/login'}/>
  else
    return (
      <>
        <GridLayout show={isMenuVisible.toString()}>
          <NavbarLayout>
            <NavbarComponent handleClickMenu={handleClickMenu} show={isMenuVisible.toString()} />
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
