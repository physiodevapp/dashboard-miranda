import React, { useContext, useEffect, useState } from 'react'
import { NavbarMenuButton, NavbarPageTitle, NavbarList } from './NavbarStyled';
import { BiBell } from 'react-icons/bi';
import { FaRegEnvelope } from 'react-icons/fa';
import { LuChevronLeft } from 'react-icons/lu';
import { MdLogout } from 'react-icons/md';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const NavbarComponent = ({handleClickMenu, show}) => {
  const { userDispatch } = useContext(AuthContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { roomId, bookingId, userId } = useParams();
  const [title, setTitle] = useState('')

  useEffect(() => {
    let title;
    
    if (pathname.indexOf('rooms') !== -1 && pathname.split("/")[2] === 'new')
      title = "New room"
    else if (roomId)
      title = "Room details"
    else if (bookingId)
      title = "Booking details"
    else if (pathname.indexOf('users') !== -1 && pathname.split("/")[2] === 'new')
      title = "New user"
    else if (userId)
      title = "User details"
    else
      title = pathname.split("/")[1];

    setTitle(title)
  }, [pathname])

  return (
    <>
      <NavbarMenuButton show={show}>
        <LuChevronLeft onClick={handleClickMenu}/>
      </NavbarMenuButton>
      <NavbarPageTitle>{title}</NavbarPageTitle>
      <NavbarList>
        <li><FaRegEnvelope/></li>
        <li><BiBell/></li>
        <li>
          <MdLogout onClick={ () => {
            userDispatch({type: 'logout'});
            navigate('/login');
          }}/>
        </li>
      </NavbarList>
    </>
  )
}
