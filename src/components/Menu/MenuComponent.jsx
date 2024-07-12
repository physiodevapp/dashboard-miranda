

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
import { useDispatch, useSelector } from 'react-redux';
import { userListErrorSelect, userListStatusSelect, userListUserListSelect, userListUserSelect } from '../../features/userList/userListSlice';
import { userListReadOneThunk } from '../../features/userList/userListReadOneThunk';
import { AuthContext } from '../../context/AuthContext';
import { FormModeContext } from '../../context/FormModeContext';
import { BlockLayer } from '../BlockLayer';

export const MenuComponent = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { userState } = useContext(AuthContext);
  const { isEditingForm } = useContext(FormModeContext);

  const userListDispatch = useDispatch();
  const userListError = useSelector(userListErrorSelect);
  const userListStatus = useSelector(userListStatusSelect);
  const userListUserList = useSelector(userListUserListSelect);
  const userListUser = useSelector(userListUserSelect);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({});

  useEffect(() => {
    userListDispatch(userListReadOneThunk({key: "email", value: userState.email, list: userListUserList}))
  }, []);

  useEffect(() => {
    switch (userListStatus) {
      case "idle":
        setIsLoading(false);
        break;
      case "pending":
        setIsLoading(true);
        break;
      case "fulfilled":
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        
        if (userListUser.email === userState.email)
          setUser(userListUser);

        break;
      case "rejected":
        setIsLoading(false);
        console.log({userListError});
        break;
      default:
        break;
    }
  }, [userListStatus])

  return (
    <>

      <Logo src={logoImage}/>
      <BlockLayer className={isEditingForm ? 'show' : ''} style={{height: "87%"}}/>
      <MenuList>
        <MenuListItem onClick={() => navigate('/dashboard')} className={pathname === '/dashboard' && 'active'}>
          <span></span>
          <LuLayoutDashboard />
          Dashboard
        </MenuListItem>
        <MenuListItem onClick={() => navigate('/bookings')} className={pathname.indexOf('/bookings') !== -1 && 'active'}>
          <span></span>
          <LuCalendarCheck/>
          Bookings
        </MenuListItem>
        <MenuListItem onClick={() => navigate('/rooms')} className={pathname.indexOf('/rooms') !== -1 && 'active'}>
          <span></span>
          <RiKey2Line style={{transform: "rotateZ(130deg)"}}/>
          Rooms
        </MenuListItem>
        <MenuListItem onClick={() => navigate('/contacts')} className={pathname === '/contacts' && 'active'}>
          <span></span>
          <MdOutlineReviews/>
          Contacts
        </MenuListItem>
        <MenuListItem onClick={() => navigate('/users')} className={pathname.indexOf('/users') !== -1 && 'active'}>
          <span></span>
          <FaRegUser/>
          Users
        </MenuListItem>
      </MenuList>
      <User>
        <img src={userImage} alt="" />
        <Name>{ `${user.first_name} ${user.last_name}` }</Name>
        <Email>{ user.email}</Email>
        <ButtonStyled styled="tertiary" onClick={() => navigate(`/users/${user.id}`)}>View</ButtonStyled>
      </User>
      <Brand>Travl Hotel Admin Dashboard</Brand>
      <Copyright>© 2020 All Rights Reserved</Copyright>
      <Author>Made with ♥ by Edu</Author>
    </>
  )
}
