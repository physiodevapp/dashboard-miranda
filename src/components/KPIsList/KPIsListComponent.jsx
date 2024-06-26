import React from 'react'
import { KPIsIcon, KPIsItem, KPIsList, Subtitle, Title } from './KPIsListStyled';
import { MdOutlineKingBed, MdLogout } from "react-icons/md";
import { LuCalendarCheck} from "react-icons/lu";

export const KPIsListComponent = () => {
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
          <Title>963</Title>
          <Subtitle>Scheduled Room</Subtitle>
        </KPIsItem>
        <KPIsItem>
          <KPIsIcon><MdLogout/></KPIsIcon>
          <Title>753</Title>
          <Subtitle>Check In</Subtitle>
        </KPIsItem>
        <KPIsItem>
          <KPIsIcon><MdLogout style={{transform: "rotateZ(180deg)"}}/></KPIsIcon>
          <Title>516</Title>
          <Subtitle>Check Out</Subtitle>
        </KPIsItem>
      </KPIsList>
    </>
  )
}
