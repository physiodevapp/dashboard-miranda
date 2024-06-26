import React from 'react'
import { Icon, Item, List, Subtitle, Title } from './KPIsStyled';
import { MdOutlineKingBed, MdLogout } from "react-icons/md";
import { LuCalendarCheck} from "react-icons/lu";

export const KPIsComponent = () => {
  return (
    <>
      <List>
        <Item>
          <Icon><MdOutlineKingBed/></Icon>
          <Title>8,461</Title>
          <Subtitle>New Booking</Subtitle>
        </Item>
        <Item>
          <Icon><LuCalendarCheck/></Icon>
          <Title>963</Title>
          <Subtitle>Scheduled Room</Subtitle>
        </Item>
        <Item>
          <Icon><MdLogout/></Icon>
          <Title>753</Title>
          <Subtitle>Check In</Subtitle>
        </Item>
        <Item>
          <Icon><MdLogout style={{transform: "rotateZ(180deg)"}}/></Icon>
          <Title>516</Title>
          <Subtitle>Check Out</Subtitle>
        </Item>
      </List>
    </>
  )
}
