import React, { useContext, useEffect, useState } from 'react'
import { NavbarMenuButton, NavbarPageTitle, NavbarList, NavbarSearchBarInput, NavbarSearchBarContainer, NavbarSearchBarButton } from './NavbarStyled';
import { BiBell } from 'react-icons/bi';
import { FaRegEnvelope } from 'react-icons/fa';
import { LuChevronLeft } from 'react-icons/lu';
import { MdLogout } from 'react-icons/md';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useDispatch } from 'react-redux';
import { userListResetUser, userListSetUserSearchTerm } from '../../features/userList/userListSlice';
import { IoMdClose } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';
import { bookingListSetBookingSearchTerm } from '../../features/bookingList/bookingListSlice';

export const NavbarComponent = ({handleClickMenu, show}) => {
  const { userDispatch } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { roomId, bookingId, userId } = useParams();

  const modelListDispatch = useDispatch();

  const clearSearchTerm = () => {
    setSearchTerm('');
  }

  const handleSearchTermChange = ({target}) => {
    setSearchTerm(target.value.trim());
  }

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") 
      filterTable()
  }

  const filterTable = () => {
    if (pathname.includes("users"))
      modelListDispatch(userListSetUserSearchTerm(searchTerm));
    else if (pathname.includes("bookings"))
      modelListDispatch(bookingListSetBookingSearchTerm(searchTerm));
  }

  useEffect(() => {
    if (!searchTerm.length)
      filterTable();

  }, [searchTerm])

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

    setTitle(title);

    setSearchTerm('');

  }, [pathname])
  

  return (
    <>
      <NavbarMenuButton show={show}>
        <LuChevronLeft onClick={handleClickMenu}/>
      </NavbarMenuButton>
      <NavbarPageTitle>{title}</NavbarPageTitle>
      {
        pathname.includes("users") || pathname.includes("bookings") 
        ? <NavbarSearchBarContainer>
            <NavbarSearchBarButton onClick={filterTable} disabled={!searchTerm.length}>
              <IoSearchOutline className='search' />
            </NavbarSearchBarButton>
            <NavbarSearchBarInput type='text' value={searchTerm} onKeyDown={handleInputKeyDown} onChange={handleSearchTermChange}/>
            <IoMdClose onClick={clearSearchTerm} className={`clear${searchTerm.length ? ' show' : ''}`}/>
          </NavbarSearchBarContainer>
        : <></>
      }
      <NavbarList>
        <li><FaRegEnvelope/></li>
        <li><BiBell/></li>
        <li id='logout'>
          <MdLogout onClick={ () => {
            userListDispatch(userListResetUser());
            userDispatch({type: 'logout'});
            navigate('/login');
          }}/>
        </li>
      </NavbarList>
    </>
  )
}
