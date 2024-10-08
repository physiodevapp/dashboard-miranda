

import React, { useContext, useEffect, useState } from 'react'
import logoImage from '../../assets/dashboard-logo.png';
import userImage from '../../assets/Imagen de perfil.png';
import { Logo, MenuList, User, Name, Email, Brand, Copyright, Author, MenuListItem } from './MenuStyled';
import { LuCalendarCheck, LuLayoutDashboard } from 'react-icons/lu';
import { RiKey2Line } from 'react-icons/ri';
import { MdOutlineReviews } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa6';
import { ButtonStyled } from '../ButtonStyled';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext, AuthContextInterface, StateType } from '../../context/AuthContext';
import { FormModeContext, FormModeContextInterface } from '../../context/FormModeContext';
import { BlockLayer } from '../BlockLayer';
import { UserInterface } from '../../modelInterface';

export const MenuComponent = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const useAuth = (): AuthContextInterface => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  const { userState } = useAuth();

  const useFormMode = (): FormModeContextInterface => {
    const context = useContext(FormModeContext);
    if (!context) {
      throw new Error('useFormMode must be used within an FormModeProvider');
    }
    return context;
  };
  const { isEditingForm } = useFormMode();

  const [user, setUser] = useState<StateType>(null);

  useEffect(() => {
    setUser(userState)

  }, []);

  return (
    <>
      <Logo src={logoImage}/>
      <BlockLayer className={isEditingForm ? 'show' : ''} style={{height: "87%"}}/>
      <MenuList>
        <MenuListItem onClick={() => navigate('/dashboard')} className={pathname === '/dashboard' ? 'active' : ''}>
          <span></span>
          <LuLayoutDashboard />
          Dashboard
        </MenuListItem>
        <MenuListItem onClick={() => navigate('/bookings')} className={pathname.indexOf('/bookings') !== -1 ? 'active' : ''}>
          <span></span>
          <LuCalendarCheck/>
          Bookings
        </MenuListItem>
        <MenuListItem onClick={() => navigate('/rooms')} className={pathname.indexOf('/rooms') !== -1 ? 'active' : ''}>
          <span></span>
          <RiKey2Line style={{transform: "rotateZ(130deg)"}}/>
          Rooms
        </MenuListItem>
        <MenuListItem onClick={() => navigate('/contacts')} className={pathname === '/contacts' ? 'active' : ''}>
          <span></span>
          <MdOutlineReviews/>
          Contacts
        </MenuListItem>
        <MenuListItem onClick={() => navigate('/users')} className={pathname.indexOf('/users') !== -1 ? 'active' : ''}>
          <span></span>
          <FaRegUser/>
          Users
        </MenuListItem>
      </MenuList>
      <User>
        <img src={userImage} alt="" />
        <Name>{ `${user?.first_name} ${user?.last_name}` }</Name>
        <Email>{ user?.email}</Email>
        <ButtonStyled styled="tertiary" onClick={() => navigate(`/users/${user?.id}`)}>View</ButtonStyled>
      </User>
      <Brand>Travl Hotel Admin Dashboard</Brand>
      <Copyright>© 2024 All Rights Reserved</Copyright>
      <Author>Made with ♥ by Edu</Author>
    </>
  )
}
