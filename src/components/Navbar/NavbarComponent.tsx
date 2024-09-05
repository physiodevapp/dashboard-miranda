import React, { useContext, useEffect, useState, KeyboardEvent, ChangeEvent } from 'react'
import { NavbarMenuButton, NavbarPageTitle, NavbarList, NavbarSearchBarInput, NavbarSearchBarContainer, NavbarSearchBarButton } from './NavbarStyled';
import { BiBell } from 'react-icons/bi';
import { FaRegEnvelope } from 'react-icons/fa';
import { LuChevronLeft } from 'react-icons/lu';
import { MdLogout } from 'react-icons/md';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthContext, AuthContextInterface } from '../../context/AuthContext';
import { useDispatch } from 'react-redux';
import { userListResetUser, userListSetUserSearchTerm } from '../../features/userList/userListSlice';
import { IoMdClose } from 'react-icons/io';
import { IoSearchOutline } from 'react-icons/io5';
import { bookingListSetBookingSearchTerm } from '../../features/bookingList/bookingListSlice';
import { FormModeContext, FormModeContextInterface } from '../../context/FormModeContext';
import { BlockLayer } from '../BlockLayer';
import { useAppDispatch } from '../../app/hooks';

interface NavbarComponentProps {
  handleClickMenu: () => void,
  show: 'true' | 'false'
}

export const NavbarComponent = ({handleClickMenu, show}: NavbarComponentProps) => {
  const useAuth = (): AuthContextInterface => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  const { userDispatch } = useAuth();

  const useFormMode = (): FormModeContextInterface => {
    const context = useContext(FormModeContext);
    if (!context) {
      throw new Error('useFormMode must be used within an FormModeProvider');
    }
    return context;
  };
  const { isEditingForm } = useFormMode();

  const [title, setTitle] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { roomId, bookingId, userId } = useParams();

  const modelListDispatch = useAppDispatch();

  const clearSearchTerm = (): void => {
    setSearchTerm('');
  }

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const target = event.target
    setSearchTerm(target.value);
  }

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
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
      <BlockLayer className={isEditingForm ? 'show' : ''}/>
      <NavbarMenuButton show={show}>
        <LuChevronLeft onClick={handleClickMenu}/>
      </NavbarMenuButton>
      <NavbarPageTitle>{title}</NavbarPageTitle>
      {
        (pathname.includes("users") || pathname.includes("bookings")) && (!userId && !bookingId) && !pathname.includes("new")
        ? <NavbarSearchBarContainer>
            <NavbarSearchBarButton onClick={filterTable} disabled={!searchTerm.length}>
              <IoSearchOutline className='search' />
            </NavbarSearchBarButton>
            <NavbarSearchBarInput type='text' placeholder='Search by name in the active tab...' value={searchTerm} onKeyDown={handleInputKeyDown} onChange={handleSearchTermChange}/>
            <IoMdClose onClick={clearSearchTerm} className={`clear${searchTerm.length ? ' show' : ''}`}/>
          </NavbarSearchBarContainer>
        : <></>
      }
      <NavbarList>
        <li><FaRegEnvelope/></li>
        <li><BiBell/></li>
        <li id='logout'>
          <MdLogout onClick={ () => {
            modelListDispatch(userListResetUser());
            userDispatch({type: 'logout'});
            navigate('/login');
          }}/>
        </li>
      </NavbarList>
    </>
  )
}
