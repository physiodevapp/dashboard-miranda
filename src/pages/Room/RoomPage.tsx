

import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { RoomFormFieldListContainer, FormButton, RoomContainer, RoomForm, RoomFormField, RoomFormLabel, RoomGallery, RoomInput, RoomSwiperPaginationNext, RoomSwiperPaginationPrev, RoomTextarea, ToggleButtonInput, ToogleButton, ToogleLabel } from './RoomStyled';

import Select from 'react-select';

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperTypes } from "swiper/types"
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { useForm, Controller } from 'react-hook-form';

import { resetRoomStatusError, roomListErrorSelect, roomListRoomListSelect, roomListRoomSelect, roomListStatusSelect } from '../../features/roomList/roomListSlice';
import { roomListUpdateOneThunk } from '../../features/roomList/roomListUpdateOneThunk';
import { roomListReadOneThunk } from '../../features/roomList/roomListReadOneThunk';
import { roomListDeleteOneThunk } from '../../features/roomList/roomListDeleteOneThunk';
import { roomListCreateOneThunk } from '../../features/roomList/roomListCreateOneThunk';

import Swal from 'sweetalert2';

import { BounceLoader } from 'react-spinners';

import { FormModeContext, FormModeContextInterface } from '../../context/FormModeContext';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RoomInterface } from '../../modelInterface';

interface FormInputInterface {
  id: string,
  name: string,
  photos: string[],
  status: "available" | "booked",
  roomNumber: number,
  roomName: string,
  roomType: string,
  roomDescription: string,
  roomPrice: number,
  roomDiscount: number,
  roomHasOffer: boolean,
  roomFacilities: { value: string, label: string }[],
  roomPolicy: string
}

export const RoomPage = () => {
  const useFormMode = (): FormModeContextInterface => {
    const context = useContext(FormModeContext);
    if (!context) {
      throw new Error('useFormMode must be used within an FormModeProvider');
    }
    return context;
  };
  const { setIsEditingForm } = useFormMode();

  // const [room, setRoom] = useState<RoomInterface | null>(null);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [roomPhotosSwiper, setRoomPhotosSwiper] = useState<SwiperTypes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [canRedirectBack, setCanRedirectBack] = useState<boolean>(false);

  const { roomId = "" } = useParams();
  const navigate = useNavigate();

  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  const { register, handleSubmit, control, reset } = useForm<FormInputInterface>();

  const roomListDispatch = useAppDispatch();
  const roomListStatus = useAppSelector(roomListStatusSelect);
  const roomListRoom = useAppSelector(roomListRoomSelect);
  const roomListRoomList = useAppSelector(roomListRoomListSelect)
  const roomListError = useAppSelector(roomListErrorSelect);

  const facilityOptions: {value: string, label: string}[] = ["Air conditioner", "High speed WiFi", "Breakfast", "Kitchen", "Cleaning", "Shower", "Grocery", "Single bed", "Shop near", "Towels"].map((facility: string) => ({
    value: facility,
    label: facility
  }))

  const onSubmit = (formData: FormInputInterface) => {
    Swal.fire({
      title: `Do you want to ${roomId ? "update" : "create"} the room?`,
      icon: "question",
      showDenyButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: `${roomId ? "Update" : "Create"}`,
      denyButtonText: ` ${roomId ? "Don't update" : "Don't create"}`,
      reverseButtons: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: async () => {
        const denyButton = Swal.getDenyButton();
        if (denyButton) {
          denyButton.disabled = true;
          denyButton.style.display = 'none'; 
        }

        try {
          setIsUpdating(true);
          
          if (roomId) {
            const updateRoom: RoomInterface = {
              ...roomListRoom!,
              number: formData.roomNumber,
              type: formData.roomType,
              description: formData.roomDescription,
              price_night: formData.roomPrice,
              discount: formData.roomDiscount,
              has_offer: formData.roomHasOffer,
              facilities: formData.roomFacilities.map((facility) => facility.value),
              cancellation_policy: formData.roomPolicy,
            }

            const resultAction = await roomListDispatch(roomListUpdateOneThunk({ room: updateRoom })).unwrap();

            // Check if the action was rejected
            if (roomListUpdateOneThunk.rejected.match(resultAction)) {
              // Handle the error from the thunk
              throw new Error(resultAction.payload || 'Update failed');
            }

          } else {
            const newRoom: RoomInterface = {
              id: self.crypto.randomUUID(),
              name: formData.roomName,
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
            };
            const resultAction = await roomListDispatch(roomListCreateOneThunk({ room: newRoom })).unwrap();

            // Check if the action was rejected
            if (roomListCreateOneThunk.rejected.match(resultAction)) {
              // Handle the error from the thunk
              throw new Error(resultAction.payload || 'Create failed');
            }
          }

          // If no errors, show success
          Swal.fire({
            title: `Room ${roomId ? "updated" : "created"} successfully`,
            icon: "success",
            confirmButtonText: "Accept",
          }); 
        } catch (error) {
          Swal.update({
            icon: "error",
            title: `${roomId ? "Updating" : "Creating"} the room failed`,
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
            showDenyButton: false,
          })

          Swal.showValidationMessage(`Request failed: ${error}`);
        }

      }
    }).then((result) => {
      setIsUpdating(false);
      roomListDispatch(resetRoomStatusError());

      if (result.isDenied) {
        setCanEdit(false);
        reset();
      } else if(result.isDismissed) {
        setCanEdit(true)
      } else if (result.isConfirmed) {
        navigate("/rooms");
      }

      // if (result.isConfirmed) {
      //   Swal.fire({
      //     title: "Room updated successfully",
      //     icon: "success",
      //     showConfirmButton: true,
      //     confirmButtonText: "Accept", 
      //     didOpen: () => {
      //       setCanEdit(!canEdit && !!roomListRoom);
        
      //       if (roomId) {
      //         const updateRoom: RoomInterface = {
      //           ...roomListRoom!,
      //           number: formData.roomNumber,
      //           type: formData.roomType,
      //           description: formData.roomDescription,
      //           price_night: formData.roomPrice,
      //           discount: formData.roomDiscount,
      //           has_offer: formData.roomHasOffer,
      //           facilities: formData.roomFacilities.map((facility) => facility.value),
      //           cancellation_policy: formData.roomPolicy,
      //         }
              
      //         setCanRedirectBack(true);

      //         roomListDispatch(roomListUpdateOneThunk({ room: updateRoom }));
      //       } else {
      //         const newRoom: RoomInterface = {
      //           id: self.crypto.randomUUID(),
      //           name: formData.name,
      //           photos: ["http://dummyimage.com/346x307.png/ff4444/ffffff","http://dummyimage.com/346x307.png/ff4444/ffffff","http://dummyimage.com/346x307.png/ff4444/ffffff"], 
      //           status: "available",
      //           number: formData.roomNumber,
      //           type: formData.roomType,
      //           description: formData.roomDescription,
      //           price_night: formData.roomPrice,
      //           discount: formData.roomDiscount,
      //           has_offer: formData.roomHasOffer,
      //           facilities: formData.roomFacilities.map((facility) => facility.value),
      //           cancellation_policy: formData.roomPolicy
      //         }

      //         setCanRedirectBack(true);
              
      //         roomListDispatch(roomListCreateOneThunk({ room: newRoom }))
      //       }
      //     }
      //   });
      // } else if (result.isDenied) {
      //   reset();
      //   setCanEdit(false);
      // }
    })
  }

  const deleteRoom = () => {
    Swal.fire({
      title: "Do you want to delete the room?",
      showDenyButton: true,
      showLoaderOnDeny: true,
      icon: "warning",
      denyButtonText: "Delete",
      confirmButtonText: `Don't delete`,
      reverseButtons: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preDeny: async () => { 
        const confirmButton = Swal.getConfirmButton();
        if (confirmButton) {
          confirmButton.disabled = true;
          confirmButton.style.display = 'none'; 
        }

        try {
          setIsUpdating(true);

          const resultAction = await roomListDispatch(roomListDeleteOneThunk({ id: roomId }));

          // Check if the action was rejected
          if (roomListDeleteOneThunk.rejected.match(resultAction)) {
            // Handle the error from the thunk
            throw new Error(resultAction.payload || 'Delete failed');
          }
          
          Swal.fire({
            title: "Room deleted successfully",
            icon: "success",
            showConfirmButton: true,
            confirmButtonText: "Accept", 
          });
          
        } catch (error) {
          Swal.update({
            icon: "error",
            title: "Deleting the room failed",
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false,
            showDenyButton: false,
          })

          Swal.showValidationMessage(`Request failed: ${error}`);
        }

      }
    }).then((result) => {
      setIsUpdating(false);
      roomListDispatch(resetRoomStatusError());

      if (result.isDenied) {
        navigate("/rooms");
      }

      // if (result.isDenied) {        
      //   Swal.fire({
      //     title: "Room deleted successfully",
      //     icon: "success",
      //     showConfirmButton: true,
      //     confirmButtonText: "Accept", 
      //     didOpen: () => {
      //       setCanRedirectBack(true);

      //       roomListDispatch(roomListDeleteOneThunk({ id: roomId }));
      //     }
      //   });
      // } 
    });
  }

  useEffect(() => {
    if (roomId)
      roomListDispatch(roomListReadOneThunk({ id: roomId }))

  }, [roomId]);

  useEffect(() => {
    switch (roomListStatus) {
      case "idle":
        setIsLoading(false);
        break;
      case "pending":
        setIsLoading(true);
        break;
      case "fulfilled":
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);

        if (roomListRoom && roomId) {
          reset({
            roomFacilities: roomListRoom.facilities.map((facility) => ({
              value: facility, 
              label: facility 
            }))
          })
        } 
        // else if (canRedirectBack) {
        //   navigate("/rooms");
        // }
        break;
      case "rejected":
        setIsLoading(false);
        console.log({roomListError});
        break;
      default:
        break;
    }
  }, [roomListStatus]);
  
  useEffect(() => {
    setIsEditingForm(canEdit || !roomId);

    return () => {
      setIsEditingForm(false);
    }
  }, [canEdit]);

  return (
    isLoading && !isUpdating
    ? <>
        <BounceLoader
          color={"#135846"}
          loading={isLoading}
          cssOverride={{
            position: "relative",
            top: "40%",
            display: "block",
            margin: "0 auto",
            borderColor: "#135846",
          }}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </>
    : <>
        <RoomContainer style={!roomId ? {maxWidth: "700px"} : {}}>
          <RoomForm onSubmit={handleSubmit(onSubmit)}>
            <RoomFormFieldListContainer>
              <RoomFormField width="33%">
                <RoomFormLabel htmlFor="roomName">Room name</RoomFormLabel>
                <RoomInput disabled={!canEdit && !!roomListRoom} {...register("roomName", { value: roomListRoom?.name })}/>
              </RoomFormField>
              <RoomFormField width="33%">
                <RoomFormLabel htmlFor="roomType">Room type</RoomFormLabel>
                <RoomInput disabled={!canEdit && !!roomListRoom} {...register("roomType", { value: roomListRoom?.type })}/>
              </RoomFormField>
              <RoomFormField width="33%">
                <RoomFormLabel htmlFor="roomNumber">Room number</RoomFormLabel>
                <RoomInput disabled={!canEdit && !!roomListRoom} {...register("roomNumber", { value: roomListRoom?.number })}/>
              </RoomFormField>
              <RoomFormField>
                <RoomFormLabel htmlFor="roomDescription">Description</RoomFormLabel>
                <RoomTextarea disabled={!canEdit && !!roomListRoom} {...register("roomDescription", { value: roomListRoom?.description })} rows={10}></RoomTextarea>
              </RoomFormField>
              <RoomFormField width="33%">
                <RoomFormLabel htmlFor="roomPrice">Price</RoomFormLabel>
                <RoomInput disabled={!canEdit && !!roomListRoom} {...register("roomPrice", { value: roomListRoom?.price_night })}/>
              </RoomFormField>
              <RoomFormField width="33%">
                <RoomFormLabel htmlFor="roomDiscount">Discount (%)</RoomFormLabel>
                <RoomInput disabled={!canEdit && !!roomListRoom} {...register("roomDiscount", { value: roomListRoom?.discount })}/>
              </RoomFormField>
              <RoomFormField width="33%">
                <RoomFormLabel htmlFor="roomHasOffer">Offer</RoomFormLabel>
                <ToogleButton>
                  <ToggleButtonInput id="roomHasOffer" {...register("roomHasOffer", { value: roomListRoom?.has_offer })} disabled={!canEdit && !!roomListRoom} type="checkbox"/>
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
                      isDisabled={!canEdit && !!roomListRoom}
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
                          lineHeight: `${canEdit || !roomListRoom ? "1.4em" : "4em"}`,
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
                <RoomTextarea disabled={!canEdit && !!roomListRoom} rows={10} { ...register("roomPolicy", {value: roomListRoom?.cancellation_policy}) }></RoomTextarea>
              </RoomFormField>              
              <FormButton 
                onClick={() => deleteRoom()}
                disabled={canEdit || !roomListRoom } 
                styled="deny" 
                type='button'
                position="left">
                  Delete 
              </FormButton>
              <FormButton 
                onClick={() => setCanEdit(!canEdit && !!roomListRoom)} 
                disabled={canEdit || !roomListRoom } 
                styled="primary" 
                type='button'
                position="right">
                  Edit  
              </FormButton>
              <FormButton 
                onClick={() => {
                  setCanEdit(!canEdit && !!roomListRoom);

                  reset();

                  if (!roomId)
                    navigate("/rooms");
                }} 
                disabled={!canEdit && !!roomListRoom} 
                styled="deny" 
                type='button'
                position="left">
                  Dismiss
              </FormButton>   
              <FormButton 
                disabled={!canEdit && !!roomListRoom} 
                styled="primary" 
                type='submit'
                position="right">
                  {roomId ? "Update" : "Create"}
              </FormButton>            
            </RoomFormFieldListContainer>
          </RoomForm>
          {
            roomId 
            ? <RoomGallery>
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
                    roomListRoom?.photos
                    ? roomListRoom?.photos.map((photo, index) => (
                      <SwiperSlide key={`${roomListRoom?.id}_${index}`} style={{backgroundImage:`url(${photo})`}}/>
                    ))
                    : <></>
                  }
                </Swiper>
                <RoomSwiperPaginationPrev
                ref={prevRef}
                className="swiper-button-prev disabled"
                onClick={() =>
                  roomPhotosSwiper?.slideTo(roomPhotosSwiper?.activeIndex - 1)
                }
              >
                <FaArrowLeft />
              </RoomSwiperPaginationPrev>
              <RoomSwiperPaginationNext
                ref={nextRef}
                className="swiper-button-next"
                onClick={() =>
                  roomPhotosSwiper?.slideTo(roomPhotosSwiper?.activeIndex + 1)
                }
              >
                <FaArrowRight />
              </RoomSwiperPaginationNext>
              </RoomGallery>
            : <></>
          }
        </RoomContainer>        
      </>
  )
}
