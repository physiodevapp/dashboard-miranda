

import React, { useState } from 'react'
import { Menu, Navbar, Main, Grid, List, User, Name, Email, Brand, Copyright, Logo, Author } from './HomeStyled';
import { Outlet } from 'react-router-dom';
import { Button } from '../../components/Button';
import { LuLayoutDashboard, LuCalendarCheck } from "react-icons/lu";
import { RiKey2Line } from "react-icons/ri";
import { MdOutlineReviews } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import userImage from '../../assets/Imagen de perfil.png';
import logoImage from '../../assets/dashboard-logo.png';

export const HomePage = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const handleClickMenu = () => {
    setIsMenuVisible(!isMenuVisible)
  }

  return (
    <>
      <Grid show={isMenuVisible.toString()}>
        <Navbar>
          <button onClick={handleClickMenu}>Menu</button>
        </Navbar>
        <Menu>
          <Logo src={logoImage}/>
          <List>
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
          </List>
          <User>
            <img src={userImage} alt="" />
            <Name>Edu Gamboa</Name>
            <Email>edu.gamboa.rodriguez@gmail.com</Email>
            <Button type={'secondary'}>Edit</Button>
          </User>
          <Brand>Travl Hotel Admin Dashboard</Brand>
          <Copyright>© 2020 All Rights Reserved</Copyright>
          <Author>Made with ♥ by Peterdraw</Author>
        </Menu>
        <Main>
          <Outlet/>
        </Main>
      </Grid>
    </>
  )
}
