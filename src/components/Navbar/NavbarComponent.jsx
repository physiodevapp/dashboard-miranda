import React, { useContext } from 'react'
import { NavbarMenuButton, NavbarPageTitle, NavbarList } from './NavbarStyled';
import { BiBell } from 'react-icons/bi';
import { FaRegEnvelope } from 'react-icons/fa';
import { LuChevronLeft } from 'react-icons/lu';
import { MdLogout } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

export const NavbarComponent = ({handleClickMenu, show}) => {
  const { logout } = useContext(AuthContext);
  const { pathname } = useLocation();

  return (
    <>
      <NavbarMenuButton show={show}>
        <LuChevronLeft onClick={handleClickMenu}/>
      </NavbarMenuButton>
      <NavbarPageTitle>{pathname.split("/")[1]}</NavbarPageTitle>
      <NavbarList>
        <li><FaRegEnvelope/></li>
        <li><BiBell/></li>
        <li><MdLogout onClick={logout}/></li>
      </NavbarList>
    </>
  )
}
