

import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { FormButton, RoomContainer, RoomFacilities, RoomForm, RoomFormField, RoomFormLabel, RoomGallery, RoomInput, RoomTextarea, ToggleButtonInput, ToogleButton, ToogleLabel } from './RoomPageStyled';
import rooms from '../../data/mock_rooms.json';

export const RoomPage = () => {
  const [room, setRoom] = useState({});
  const { roomId } = useParams();
  const [canEdit, setCanEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (roomId)
      setRoom([...rooms].find(room => room['id'] === roomId))

  }, [])

  return (
    <>
      <RoomContainer>
        <RoomForm>
          <RoomFormField width="50%">
            <RoomFormLabel htmlFor="room-type">Room type</RoomFormLabel>
            <RoomInput disabled={!canEdit} name='room-type' value={room.type}></RoomInput>
          </RoomFormField>
          <RoomFormField width="50%">
            <RoomFormLabel htmlFor="room-number">Room number</RoomFormLabel>
            <RoomInput disabled={!canEdit} value={room.number}></RoomInput>
          </RoomFormField>
          <RoomFormField>
            <RoomFormLabel htmlFor="room-description">Description</RoomFormLabel>
            <RoomTextarea disabled={!canEdit} rows={6} value={room.description}></RoomTextarea>
          </RoomFormField>
          <RoomFormField width="33%">
            <RoomFormLabel htmlFor="room-type">Price</RoomFormLabel>
            <RoomInput disabled={!canEdit} value={room.price_night}></RoomInput>
          </RoomFormField>
          <RoomFormField width="33%">
            <RoomFormLabel htmlFor="room-type">Discount</RoomFormLabel>
            <RoomInput disabled={!canEdit} value={room.discount}></RoomInput>
          </RoomFormField>
          <RoomFormField width="33%">
            <RoomFormLabel htmlFor="room-has-offer">Offer</RoomFormLabel>
            <ToogleButton>
              <ToggleButtonInput disabled={!canEdit} type="checkbox" id="toggle" value={room.has_offer}/>
              <ToogleLabel htmlFor="toggle"></ToogleLabel>
            </ToogleButton>
          </RoomFormField>
          <RoomFormField>
            <RoomFormLabel htmlFor="room-policy">Cancellation policy</RoomFormLabel>
            <RoomTextarea disabled={!canEdit} rows={3} text={room.cancellation_policy}></RoomTextarea>
          </RoomFormField>
          <RoomFacilities></RoomFacilities>
          <FormButton 
            onClick={() => setCanEdit(!canEdit)} 
            disabled={canEdit || !roomId } 
            styled="primary" 
            text="edit">
              Edit  
          </FormButton>
          <FormButton 
            onClick={() => {
              setCanEdit(!canEdit);
              if (!roomId)
                navigate("/rooms");
            }} 
            disabled={!canEdit && roomId} 
            styled="secondary" 
            text="dismiss">
              Dismiss
            </FormButton>
          <FormButton 
            onClick={() => {
              setCanEdit(!canEdit);
              if (!roomId)
                navigate("/rooms");
            }} 
            disabled={!canEdit && roomId} 
            styled="primary" 
            text="save">
              {roomId ? "Update" : "Create"}
            </FormButton>
        </RoomForm>
        <RoomGallery src={room.photos}>

        </RoomGallery>
      </RoomContainer>
    </>
  )
}
