

import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { FormButton, RoomContainer, RoomFacilities, RoomForm, RoomFormField, RoomFormLabel, RoomGallery, RoomInput, RoomSwiperPaginationNext, RoomSwiperPaginationPrev, RoomSwiperSlideRoomImage, RoomTextarea, ToggleButtonInput, ToogleButton, ToogleLabel } from './RoomPageStyled';
import dataRooms from '../../data/mock_rooms.json';
import { RoomFormFieldListContainer } from './RoomPageStyled';
import Select from 'react-select';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export const RoomPage = () => {
  const [room, setRoom] = useState(undefined);
  const { roomId } = useParams();
  const [canEdit, setCanEdit] = useState(false);
  const navigate = useNavigate();

  const [roomPhotosSwiper, setRoomPhotosSwiper] = useState({});
  const prevRef = useRef();
  const nextRef = useRef();

  const facilityOptions = ["Air conditioner", "High speed WiFi", "Breakfast", "Kitchen", "Cleaning", "Shower", "Grocery", "Single bed", "Shop near", "Towels"].map((facility) => ({
    value: facility,
    label: facility
  }))

  useEffect(() => {
    if (roomId) {
      const room = JSON.parse(JSON.stringify(dataRooms)).find(room => room['id'] === roomId);
      setRoom(room);
    }
  }, [])

  return (
    <>
      {
        room ?
        <RoomContainer>
          <RoomForm>
            <RoomFormFieldListContainer>
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
                <RoomTextarea disabled={!canEdit} rows={10} value={room.description}></RoomTextarea>
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
              <RoomFormField width="100%">
                <RoomFormLabel>Facilities</RoomFormLabel>
                <Select
                  closeMenuOnSelect={false}
                  isMulti
                  defaultValue={
                    room?.facilities?.map((facility) => {
                      return {
                        value: facility,
                        label: facility
                      }
                    })
                  }
                  options={ facilityOptions }
                  placeholder={"Select the facilities of the room"}
                  isDisabled={!canEdit}
                  styles={{
                    container: (baseStyles, state) => ({
                      ...baseStyles,
                      width: "100%",
                    }),
                    valueContainer: (baseStyles, state) => ({
                      ...baseStyles,
                      gap: "0.2em",
                      paddingTop: "0.4em",
                      paddingBottom: "0.4em"
                    }),
                    indicatorsContainer: (baseStyles, state) => ({
                      ...baseStyles,
                      cursor: "pointer",
                      display: state.isDisabled
                        ? "none"
                        : baseStyles.display
                    }),
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: "white",
                      borderColor: state.isDisabled
                        ? "white"
                        : baseStyles.borderColor
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      fontFamily: "Poppins",
                      fontSize: "0.9rem",  
                      backgroundColor: state.isFocused
                        ? "#EEF9F2"
                        : baseStyles.backgroundColor
                      ,                  
                      ':hover': {
                        ...baseStyles,
                        fontSize: "0.9rem", 
                        color: "#135846",
                        backgroundColor: "#EEF9F2",
                      }
                    }),
                    multiValueLabel: (baseStyles, state) => ({
                      ...baseStyles,
                      color: "#135846",
                      backgroundColor: "#EEF9F2",
                      lineHeight: "4em",
                      padding: state.isDisabled 
                        ? "0em 1em !important"
                        : baseStyles.padding
                      ,
                      textAlign: "center",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      fontFamily: "Poppins"
                    }), 
                    multiValueRemove: (baseStyles, state) => ({
                      ...baseStyles,
                      color: "#135846",
                      backgroundColor: "#EEF9F2",
                      display: state.isDisabled
                        ? "none"
                        : baseStyles.display
                      ,
                      ':hover': {
                        backgroundColor: "#135846",
                        color: 'white',
                        cursor: "pointer"
                      },
                    }),                  
                  }}
                />
              </RoomFormField>
              <RoomFormField>
                <RoomFormLabel htmlFor="room-policy">Cancellation policy</RoomFormLabel>
                <RoomTextarea disabled={!canEdit} rows={10} value={room.cancellation_policy}></RoomTextarea>
              </RoomFormField>              
            </RoomFormFieldListContainer>
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
          <RoomGallery>
            <Swiper
              modules={[Navigation]}
              onInit={(event) => setRoomPhotosSwiper(event)}
              onSlideChange={(swiper) => {
                if (swiper.isEnd) {
                  nextRef.current?.classList.add("disabled")
                } else if (swiper.isBeginning) {
                  prevRef.current?.classList.add("disabled")
                } else {
                  nextRef.current?.classList.remove("disabled")
                  prevRef.current?.classList.remove("disabled")
                }
              }}
              navigation={{
                prevEl: "swiper-button-prev",
                nextEl: "swiper-button-next",
              }}
              slidesPerView={1}
              spaceBetween={0}
            >
              { 
                room?.photos
                ? room.photos.map((photo, index) => (
                  <SwiperSlide key={`${room.id}_${index}`} style={{backgroundImage:`url(${photo})`}}>
                    <RoomSwiperSlideRoomImage src={photo}/>
                  </SwiperSlide>
                ))
                : <></>
              }
            </Swiper>
            <RoomSwiperPaginationPrev
            ref={prevRef}
            className="swiper-button-prev disabled"
            onClick={() =>
              roomPhotosSwiper.slideTo(roomPhotosSwiper.activeIndex - 1)
            }
          >
            <FaArrowLeft />
          </RoomSwiperPaginationPrev>
          <RoomSwiperPaginationNext
            ref={nextRef}
            className="swiper-button-next"
            onClick={() =>
              roomPhotosSwiper.slideTo(roomPhotosSwiper.activeIndex + 1)
            }
          >
            <FaArrowRight />
          </RoomSwiperPaginationNext>
          </RoomGallery>
        </RoomContainer>
        : <></>
      }
      
    </>
  )
}
