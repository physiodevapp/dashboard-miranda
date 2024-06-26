

import React, { useContext, useState } from 'react'
import { Menu, MenuList, Navbar, Main, Grid, User, Name, Email, Brand, Copyright, Logo, Author, PageTitle, NavbarList, MenuButton } from './Layout';
import { Outlet, useLocation } from 'react-router-dom';
import { Button } from '../../components/Button';
import { LuLayoutDashboard, LuCalendarCheck, LuChevronLeft } from "react-icons/lu";
import { RiKey2Line } from "react-icons/ri";
import { MdOutlineReviews, MdLogout } from "react-icons/md";
import { FaRegEnvelope } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { BiBell } from "react-icons/bi";
import userImage from '../../assets/Imagen de perfil.png';
import logoImage from '../../assets/dashboard-logo.png';
import { AuthContext } from '../../context/AuthProvider';

export const HomePage = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const { logout } = useContext(AuthContext);
  const { pathname } = useLocation();
  
  const handleClickMenu = () => setIsMenuVisible(!isMenuVisible)

  return (
    <>
      <Grid show={isMenuVisible.toString()}>
        <Navbar>
          <MenuButton show={isMenuVisible.toString()}>
            <LuChevronLeft onClick={handleClickMenu}/>
          </MenuButton>
          <PageTitle>{pathname.split("/")[1]}</PageTitle>
          <NavbarList>
            <li><FaRegEnvelope/></li>
            <li><BiBell/></li>
            <li><MdLogout onClick={logout}/></li>
          </NavbarList>
        </Navbar>
        <Menu>
          <Logo src={logoImage}/>
          <MenuList>
            <li>
              <span></span>
              <LuLayoutDashboard />
              Dashboard
            </li>
            <li>
              <span></span>
              <LuCalendarCheck/>
              Bookings
            </li>
            <li>
              <span></span>
              <RiKey2Line style={{transform: "rotateZ(130deg)"}}/>
              Rooms
            </li>
            <li>
              <span></span>
              <MdOutlineReviews/>
              Contact
            </li>
            <li>
              <span></span>
              <FaRegUser/>
              Users
            </li>
          </MenuList>
          <User>
            <img src={userImage} alt="" />
            <Name>Edu Gamboa</Name>
            <Email>edu.gamboa.rodriguez@gmail.com</Email>
            <Button type={'secondary'}>Edit</Button>
          </User>
          <Brand>Travl Hotel Admin Dashboard</Brand>
          <Copyright>© 2020 All Rights Reserved</Copyright>
          <Author>Made with ♥ by Edu</Author>
        </Menu>
        <Main>
          <Outlet/>
        </Main>
      </Grid>
    </>
  )
}
