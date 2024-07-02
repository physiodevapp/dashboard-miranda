

import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { FormButton, RoomContainer, RoomForm, RoomFormField, RoomFormLabel, RoomGallery, RoomInput, RoomSwiperPaginationNext, RoomSwiperPaginationPrev, RoomSwiperSlideRoomImage, RoomTextarea, ToggleButtonInput, ToogleButton, ToogleLabel } from './RoomPageStyled';
import dataRooms from '../../data/mock_rooms.json';
import { RoomFormFieldListContainer } from './RoomPageStyled';

import Select from 'react-select';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { roomListErrorSelect, roomListRoomListSelect, roomListRoomSelect, roomListStatusSelect } from '../../features/roomList/roomListSlice';
import { roomListUpdateOneThunk } from '../../features/roomList/roomListUpdateOneThunk';

export const RoomPage = () => {
  const [room, setRoom] = useState(null);
  const { roomId } = useParams();
  const [canEdit, setCanEdit] = useState(false);
  const navigate = useNavigate();

  const [roomPhotosSwiper, setRoomPhotosSwiper] = useState({});
  const prevRef = useRef();
  const nextRef = useRef();

  const { register, handleSubmit, control, reset } = useForm();

  const roomDispatch = useDispatch();
  const roomListStatus = useSelector(roomListStatusSelect);
  const roomListRoom = useSelector(roomListRoomSelect);
  const roomListError = useSelector(roomListErrorSelect);
  const [isUpdating, setIsUpdating] = useState(false);

  const facilityOptions = ["Air conditioner", "High speed WiFi", "Breakfast", "Kitchen", "Cleaning", "Shower", "Grocery", "Single bed", "Shop near", "Towels"].map((facility) => ({
    value: facility,
    label: facility
  }))

  const onSubmit = (formData) => {
    setCanEdit(!canEdit);

    const updateRoom = {
      ...room, 
      number: formData.roomNumber,
      type: formData.roomType,
      description: formData.roomDescription,
      price_night: formData.roomPrice,
      discount: formData.roomDiscount,
      has_offer: formData.roomHasOffer,
      facilities: formData.roomFacilities.map((facility) => facility.value),
      cancellation_policy: formData.roomPolicy,
    }
    
    roomDispatch(roomListUpdateOneThunk({room: updateRoom}))

    if (!roomId)
      navigate("/rooms");
  }

  useEffect(() => {
    switch (roomListStatus) {
      case "idle":
        setIsUpdating(false);
        break;
      case "pending":
        setIsUpdating(true);
        break;
      case "fulfilled":
        setIsUpdating(false);
        console.log('room updated ', {roomListRoom});
        break;
      case "rejected":
        setIsUpdating(true);
        console.log({roomListError});
        break;
      default:
        break;
    }
  }, [roomListStatus])

  useEffect(() => {
    if (roomId) {
      const roomDetails = JSON.parse(JSON.stringify(dataRooms)).find(room => room['id'] === roomId);
      setRoom(roomDetails);

      reset({
        roomFacilities: roomDetails.facilities.map((facility) => ({
          value: facility, 
          label: facility
        }))
      })
    }
  }, [roomId])

  if (room)
    return (
      <>
        <RoomContainer>
          <RoomForm onSubmit={handleSubmit(onSubmit)}>
            <RoomFormFieldListContainer>
              <RoomFormField width="50%">
                <RoomFormLabel htmlFor="roomType">Room type</RoomFormLabel>
                <RoomInput disabled={!canEdit} {...register("roomType", { value: room.type })}/>
              </RoomFormField>
              <RoomFormField width="50%">
                <RoomFormLabel htmlFor="roomNumber">Room number</RoomFormLabel>
                <RoomInput disabled={!canEdit} {...register("roomNumber", { value: room.number })}/>
              </RoomFormField>
              <RoomFormField>
                <RoomFormLabel htmlFor="roomDescription">Description</RoomFormLabel>
                <RoomTextarea disabled={!canEdit} {...register("roomDescription", { value: room.description })} rows={10}></RoomTextarea>
              </RoomFormField>
              <RoomFormField width="33%">
                <RoomFormLabel htmlFor="roomPrice">Price</RoomFormLabel>
                <RoomInput disabled={!canEdit} {...register("roomPrice", { value: room.price_night })}/>
              </RoomFormField>
              <RoomFormField width="33%">
                <RoomFormLabel htmlFor="roomDiscount">Discount</RoomFormLabel>
                <RoomInput disabled={!canEdit} {...register("roomDiscount", { value: room.discount })}/>
              </RoomFormField>
              <RoomFormField width="33%">
                <RoomFormLabel htmlFor="roomHasOffer">Offer</RoomFormLabel>
                <ToogleButton>
                  <ToggleButtonInput id="roomHasOffer" {...register("roomHasOffer", { value: room.has_offer === "true" ? true : false })} disabled={!canEdit} type="checkbox"/>
                  <ToogleLabel htmlFor="roomHasOffer"></ToogleLabel>
                </ToogleButton>
              </RoomFormField>
              <RoomFormField width="100%">
                <RoomFormLabel htmlFor='roomFacilities'>Facilities</RoomFormLabel>
                <Controller
                  name='roomFacilities'
                  control={control}                  
                  render={({ field }) => (
                    <Select
                      { ...field }
                      closeMenuOnSelect={false}
                      isMulti
                      options={facilityOptions}
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
                  )}
                />
              </RoomFormField>
              <RoomFormField>
                <RoomFormLabel htmlFor="roomPolicy">Cancellation policy</RoomFormLabel>
                <RoomTextarea name='roomPolicy' disabled={!canEdit} rows={10} { ...register("roomPolicy", {value: room.cancellation_policy}) }></RoomTextarea>
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
              disabled={!canEdit && roomId} 
              styled="primary" 
              type='submit'
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
      </>
    )
  else
    return <></>
}
