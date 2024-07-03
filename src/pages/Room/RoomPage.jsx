

import React, { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { RoomFormFieldListContainer, FormButton, RoomContainer, RoomForm, RoomFormField, RoomFormLabel, RoomGallery, RoomInput, RoomSwiperPaginationNext, RoomSwiperPaginationPrev, RoomSwiperSlideRoomImage, RoomTextarea, ToggleButtonInput, ToogleButton, ToogleLabel, SweetAlertContainer } from './RoomStyled';

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
import { roomListReadOneThunk } from '../../features/roomList/roomListReadOneThunk';
import { roomListDeleteOneThunk } from '../../features/roomList/roomListDeleteOneThunk';

import Swal from 'sweetalert2';

import { roomListCreateOneThunk } from '../../features/roomList/roomListCreateOneThunk';

export const RoomPage = () => {
  const [room, setRoom] = useState(null);
  const { roomId } = useParams();

  const [canEdit, setCanEdit] = useState(false);

  const navigate = useNavigate();

  const [roomPhotosSwiper, setRoomPhotosSwiper] = useState({});
  const prevRef = useRef();
  const nextRef = useRef();

  const { register, handleSubmit, control, reset } = useForm();

  const roomListDispatch = useDispatch();
  const roomListStatus = useSelector(roomListStatusSelect);
  const roomListRoom = useSelector(roomListRoomSelect);
  const roomListRoomList = useSelector(roomListRoomListSelect)
  const roomListError = useSelector(roomListErrorSelect);
  const [isLoading, setIsLoading] = useState(false);

  const facilityOptions = ["Air conditioner", "High speed WiFi", "Breakfast", "Kitchen", "Cleaning", "Shower", "Grocery", "Single bed", "Shop near", "Towels"].map((facility) => ({
    value: facility,
    label: facility
  }))

  const onSubmit = (formData) => {
    Swal.fire({
      title: `Do you want to ${roomId ? "update" : "create"} the room?`,
      icon: "question",
      showDenyButton: true,
      confirmButtonText: `${roomId ? "Update" : "Create"}`,
      denyButtonText: ` ${roomId ? "Don't update" : "Don't create"}`,
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Room updated successfully",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Accept", 
          didOpen: () => {
            setCanEdit(!canEdit && room);
        
            if (roomId) {
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
              
              roomListDispatch(roomListUpdateOneThunk({room: updateRoom, list: roomListRoomList}));
            } else {
              const newRoom = {
                id: self.crypto.randomUUID(),
                name: formData.name,
                photos: ["http://dummyimage.com/346x307.png/ff4444/ffffff","http://dummyimage.com/346x307.png/ff4444/ffffff","http://dummyimage.com/346x307.png/ff4444/ffffff"], 
                status: "available",
                number: formData.roomNumber,
                type: formData.roomType,
                description: formData.roomDescription,
                price_night: formData.roomPrice,
                discount: formData.roomDiscount,
                has_offer: formData.roomHasOffer,
                facilities: formData.roomFacilities.map((facility) => facility.value),
                cancellation_policy: formData.roomPolicy
              }
              
              roomListDispatch(roomListCreateOneThunk({room: newRoom, list: roomListRoomList}))
            }
          }
        });
      } else if (result.isDenied) {
        Swal.fire({
          title: "Room wasn't updated",
          icon: "info",
          showConfirmButton: true,
          confirmButtonText: "Accept", 
          willOpen: () => {
            reset();
            setCanEdit(false)
          }
        });
      }
    })
  }

  const deleteRoom = () => {
    Swal.fire({
      title: "Do you want to delete the room?",
      showDenyButton: true,
      icon: "warning",
      denyButtonText: "Delete",
      confirmButtonText: `Don't delete`,
      reverseButtons: true,
    }).then((result) => {
      if (result.isDenied) {        
        Swal.fire({
          title: "Room deleted successfully",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Accept", 
          didOpen: () => {
            roomListDispatch(roomListDeleteOneThunk({id: roomId, list: roomListRoomList}));
          }
        });
      } else if (result.isConfirmed) {
        Swal.fire({
          title: "Room wasn't deleted",
          icon: "info",
          showConfirmButton: true,
          confirmButtonText: "Accept" 
        });
      }
    });
  }

  useEffect(() => {
    switch (roomListStatus) {
      case "idle":
        setIsLoading(false);
        break;
      case "pending":
        setIsLoading(true);
        break;
      case "fulfilled":
        setIsLoading(false);

        if (roomListRoom) {
          setRoom(roomListRoom);
  
          reset({
            roomFacilities: roomListRoom.facilities.map((facility) => ({
              value: facility, 
              label: facility
            }))
          })
        } else if (roomId && roomListRoom === null) {
          navigate("/rooms");
        }
        break;
      case "rejected":
        setIsLoading(true);
        console.log({roomListError});
        break;
      default:
        break;
    }
  }, [roomListStatus])

  useEffect(() => {
    if (roomId)
      roomListDispatch(roomListReadOneThunk({id: roomId, list: roomListRoomList}))
  }, [roomId])

  if (!isLoading) 
    return (
      <>
        <RoomContainer>
          <RoomForm onSubmit={handleSubmit(onSubmit)}>
            <RoomFormFieldListContainer>
              <RoomFormField width="50%">
                <RoomFormLabel htmlFor="roomType">Room type</RoomFormLabel>
                <RoomInput disabled={!canEdit && room} {...register("roomType", { value: room?.type })}/>
              </RoomFormField>
              <RoomFormField width="50%">
                <RoomFormLabel htmlFor="roomNumber">Room number</RoomFormLabel>
                <RoomInput disabled={!canEdit && room} {...register("roomNumber", { value: room?.number })}/>
              </RoomFormField>
              <RoomFormField>
                <RoomFormLabel htmlFor="roomDescription">Description</RoomFormLabel>
                <RoomTextarea disabled={!canEdit && room} {...register("roomDescription", { value: room?.description })} rows={10}></RoomTextarea>
              </RoomFormField>
              <RoomFormField width="33%">
                <RoomFormLabel htmlFor="roomPrice">Price</RoomFormLabel>
                <RoomInput disabled={!canEdit && room} {...register("roomPrice", { value: room?.price_night })}/>
              </RoomFormField>
              <RoomFormField width="33%">
                <RoomFormLabel htmlFor="roomDiscount">Discount</RoomFormLabel>
                <RoomInput disabled={!canEdit && room} {...register("roomDiscount", { value: room?.discount })}/>
              </RoomFormField>
              <RoomFormField width="33%">
                <RoomFormLabel htmlFor="roomHasOffer">Offer</RoomFormLabel>
                <ToogleButton>
                  <ToggleButtonInput id="roomHasOffer" {...register("roomHasOffer", { value: room?.has_offer === "true" ? true : false })} disabled={!canEdit && room} type="checkbox"/>
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
                      isDisabled={!canEdit && room}
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
                          alignSelf: "flex-start",
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
                          lineHeight: `${canEdit ? "1.4em" : "4em"}`,
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
                <RoomTextarea name='roomPolicy' disabled={!canEdit && room} rows={10} { ...register("roomPolicy", {value: room?.cancellation_policy}) }></RoomTextarea>
              </RoomFormField>              
            </RoomFormFieldListContainer>
            <FormButton 
              onClick={() => deleteRoom()}
              disabled={canEdit || !roomId } 
              styled="deny" 
              type='button'
              position="left">
                Delete 
            </FormButton>
            <FormButton 
              onClick={() => setCanEdit(!canEdit && room)} 
              disabled={canEdit || !roomId } 
              styled="primary" 
              type='button'
              position="right">
                Edit  
            </FormButton>
            <FormButton 
              onClick={() => {
                setCanEdit(!canEdit && room);

                reset();

                if (!roomId)
                  navigate("/rooms");
              }} 
              disabled={!canEdit && room && roomId} 
              styled="deny" 
              type='button'
              position="left">
                Dismiss
            </FormButton>
            

            <FormButton 
              disabled={!canEdit && room && roomId} 
              styled="primary" 
              type='submit'
              position="right">
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
                ? room?.photos.map((photo, index) => (
                  <SwiperSlide key={`${room?.id}_${index}`} style={{backgroundImage:`url(${photo})`}}>
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
    <></>
}
