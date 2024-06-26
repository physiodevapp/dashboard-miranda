

import React from 'react'
import logoImage from '../../assets/dashboard-logo.png';
import userImage from '../../assets/Imagen de perfil.png';
import { Logo, MenuList, User, Name, Email, Brand, Copyright, Author } from './MenuStyled';
import { LuCalendarCheck, LuLayoutDashboard } from 'react-icons/lu';
import { RiKey2Line } from 'react-icons/ri';
import { MdOutlineReviews } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa6';
import { ButtonStyled } from '../ButtonStyled';

export const MenuComponent = () => {
  return (
    <>
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
            <ButtonStyled styled="secondary">Edit</ButtonStyled>
          </User>
          <Brand>Travl Hotel Admin Dashboard</Brand>
          <Copyright>© 2020 All Rights Reserved</Copyright>
          <Author>Made with ♥ by Edu</Author>
    </>
  )
}
