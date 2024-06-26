

import React from 'react'
import logoImage from '../../assets/dashboard-logo.png';
import userImage from '../../assets/Imagen de perfil.png';
import { Logo, MenuList, User, Name, Email, Brand, Copyright, Author, MenuListItem } from './MenuStyled';
import { LuCalendarCheck, LuLayoutDashboard } from 'react-icons/lu';
import { RiKey2Line } from 'react-icons/ri';
import { MdOutlineReviews } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa6';
import { ButtonStyled } from '../ButtonStyled';
import { useLocation, useNavigate } from 'react-router-dom';

export const MenuComponent = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation()

  return (
    <>
      <Logo src={logoImage}/>
      <MenuList>
        <MenuListItem onClick={() => navigate('/dashboard')} className={pathname === '/dashboard' && 'active'}>
          <span></span>
          <LuLayoutDashboard />
          Dashboard
        </MenuListItem>
        <MenuListItem onClick={() => navigate('/bookings')} className={pathname === '/bookings' && 'active'}>
          <span></span>
          <LuCalendarCheck/>
          Bookings
        </MenuListItem>
        <MenuListItem onClick={() => navigate('/rooms')} className={pathname === '/rooms' && 'active'}>
          <span></span>
          <RiKey2Line style={{transform: "rotateZ(130deg)"}}/>
          Rooms
        </MenuListItem>
        <MenuListItem onClick={() => navigate('/contacts')} className={pathname === '/contacts' && 'active'}>
          <span></span>
          <MdOutlineReviews/>
          Contacts
        </MenuListItem>
        <MenuListItem>
          <span></span>
          <FaRegUser/>
          Users
        </MenuListItem>
      </MenuList>
      <User>
        <img src={userImage} alt="" />
        <Name>Edu Gamboa</Name>
        <Email>edu.gamboa.rodriguez@gmail.com</Email>
        <ButtonStyled styled="tertiary">Edit</ButtonStyled>
      </User>
      <Brand>Travl Hotel Admin Dashboard</Brand>
      <Copyright>© 2020 All Rights Reserved</Copyright>
      <Author>Made with ♥ by Edu</Author>
    </>
  )
}
