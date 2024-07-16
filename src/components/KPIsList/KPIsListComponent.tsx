import React from 'react'
import { KPIsIcon, KPIsItem, KPIsList, Subtitle, Title } from './KPIsListStyled';
import { MdOutlineKingBed, MdLogout } from "react-icons/md";
import { LuCalendarCheck} from "react-icons/lu";
import { useSelector } from 'react-redux';
import { useAppSelector } from "../../app/hooks";
import { bookingListBookingListSelect } from '../../features/bookingList/bookingListSlice';
import { roomListRoomListSelect } from '../../features/roomList/roomListSlice';

export const KPIsListComponent = () => {

  const bookingListBookingList = useAppSelector(bookingListBookingListSelect);
  const roomListRoomList = useAppSelector(roomListRoomListSelect);

  return (
    <>
      <KPIsList>
        <KPIsItem>
          <KPIsIcon><MdOutlineKingBed/></KPIsIcon>
          <Title>8,461</Title>
          <Subtitle>New Booking</Subtitle>
        </KPIsItem>
        <KPIsItem>
          <KPIsIcon><LuCalendarCheck/></KPIsIcon>
          <Title>{ roomListRoomList.filter((room) => room.status === "booked").length }</Title>
          <Subtitle>Scheduled Room</Subtitle>
        </KPIsItem>
        <KPIsItem>
          <KPIsIcon><MdLogout/></KPIsIcon>
          <Title>{ bookingListBookingList.filter((booking) => booking.status === "check_in").length }</Title>
          <Subtitle>Check In</Subtitle>
        </KPIsItem>
        <KPIsItem>
          <KPIsIcon><MdLogout style={{transform: "rotateZ(180deg)"}}/></KPIsIcon>
          <Title>{ bookingListBookingList.filter((booking) => booking.status === "check_out").length }</Title>
          <Subtitle>Check Out</Subtitle>
        </KPIsItem>
      </KPIsList>
    </>
  )
}
