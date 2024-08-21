import React, { useEffect, useRef, useState } from 'react'
import { BookingContainer, BookingForm, BookingGallery, BookingGalleryBlackLayer, BookingSwiperPaginationNext, BookingSwiperPaginationPrev, BookingSwiperSlideRoomImage, BookingSwiperSlideRoomInfo, BookingSwiperSliderRoomDescription, BookingSwiperSliderRoomStatus, BookingSwiperSliderRoomType } from './BookingStyled';
import { FormField, FormFieldLabel, FormFieldListContainer, FormInput, FormTextarea } from '../../components/FormField';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperTypes } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { useDispatch, useSelector } from 'react-redux';
import { bookingListBookingListSelect, bookingListBookingSelect, bookingListErrorSelect, bookingListStatusSelect } from '../../features/bookingList/bookingListSlice';
import { bookingListReadOneThunk } from '../../features/bookingList/bookingListReadOneThunk';
import { roomListRoomListSelect } from '../../features/roomList/roomListSlice';

import { BounceLoader } from 'react-spinners';

import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { BookingInterface } from '../../modelInterface';

export const BookingPage = () => {
  const [booking, setBooking] = useState<BookingInterface | null>(null);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [roomPhotosSwiper, setRoomPhotosSwiper] = useState<SwiperTypes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [canRedirectBack, setCanRedirectBack] = useState<boolean>(false);
  
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, control, reset } = useForm();

  const bookingListDispatch = useAppDispatch();
  const bookingListStatus = useAppSelector(bookingListStatusSelect);
  const bookingListBooking = useAppSelector(bookingListBookingSelect);
  const bookingListBookingList = useAppSelector(bookingListBookingListSelect);
  const bookingListError = useAppSelector(bookingListErrorSelect);
  const roomListRoomList = useAppSelector(roomListRoomListSelect)


  const formatDatetime = (datetime: string) => {
    return new Date(Number(datetime)).toLocaleDateString("es-MX", {
      day: "2-digit",
      year: "numeric",
      month: "short"
    });
  } 

  const facilityOptions = ["Air conditioner", "High speed WiFi", "Breakfast", "Kitchen", "Cleaning", "Shower", "Grocery", "Single bed", "Shop near", "Towels"].map((facility) => ({
    value: facility,
    label: facility
  }))

  const getTotalPrice = (checkIn: number, checkOut: number) => {
    const diffTime = checkOut - checkIn;    
    const DAY_TO_MILISECONDS = (24 * 3600 * 1000);
    const totalNights: number = Math.round(diffTime / DAY_TO_MILISECONDS);
    
    const finalPrice: number = booking!.room!.has_offer
      ? (totalNights * booking!.room!.price_night * booking!.room!.discount / 100)
      : totalNights * booking!.room!.price_night

    return `$${finalPrice}`
  }

  const onSubmit = (formData: {}) => {

  }

  useEffect(() => {
    switch (bookingListStatus) {
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

        if (bookingListBooking && bookingId) {
          setBooking(bookingListBooking);

          reset({
            bookingRoomFacilities: bookingListBooking.room?.facilities.map((facility: string) => ({
              value: facility, 
              label: facility 
            }))
          })
        } else if (canRedirectBack) {
          navigate("/bookings");
        }
        
        break;
      case "rejected":
        setIsLoading(false);
        console.log({bookingListError});
        break;
      default:
        break;
    }
  }, [bookingListStatus])

  useEffect(() => {
    if (bookingId)
      bookingListDispatch(bookingListReadOneThunk({id: bookingId}))

  }, [bookingId])

  return (
    isLoading
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
        <BookingContainer>
          <BookingForm onSubmit={handleSubmit(onSubmit)}>
            <FormFieldListContainer>
              <FormField width="50%">
                <FormFieldLabel htmlFor='bookingName'>Fullname</FormFieldLabel>
                <FormInput disabled={!canEdit} { ...register("bookingName", { value: booking?.first_name }) }></FormInput>
              </FormField>
              <FormField width="50%">
                <FormFieldLabel htmlFor='bookingId'>Booking Id</FormFieldLabel>
                <FormInput disabled={!canEdit} { ...register("bookingId", { value: (booking!.id).split("-")[booking!.id.split("-"). length - 1] }) }></FormInput>
              </FormField>
              <FormField width="50%">
                <FormFieldLabel htmlFor='bookingCheckIn'>Check In</FormFieldLabel>
                <FormInput disabled={!canEdit} { ...register("bookingCheckIn", { value: formatDatetime(booking!.check_in) }) }></FormInput>
              </FormField>
              <FormField width="50%">
                <FormFieldLabel htmlFor='bookingCheckOut'>Check Out</FormFieldLabel>
                <FormInput disabled={!canEdit} { ...register("bookingCheckOut", { value: formatDatetime(booking!.check_out) }) }></FormInput>
              </FormField>
              <FormField width="50%">
                <FormFieldLabel htmlFor='bookingRoomNumber'>Room number</FormFieldLabel>
                <FormInput disabled={!canEdit} { ...register("bookingRoomNumber", { value: booking!.room!.number }) }></FormInput>
              </FormField>
              <FormField width="50%">
                <FormFieldLabel htmlFor='bookingTotalPrice'>Final Price</FormFieldLabel>
                <FormInput disabled={!canEdit} { ...register("bookingTotalPrice", { value: getTotalPrice(Number(booking!.check_in), Number(booking!.check_out)) }) }></FormInput>
              </FormField>
              <FormField width="100%">
                <FormFieldLabel htmlFor='bookingRoomFacilities'>Facilities</FormFieldLabel>
                <Controller
                  name='bookingRoomFacilities'
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
                  )}/>
              </FormField>
              <FormField>
                <FormFieldLabel htmlFor="bookingSpecialRequest">Special request</FormFieldLabel>                
                <FormTextarea disabled={!canEdit} rows={10} { ...register("bookingSpecialRequest", { value: booking?.special_request }) }></FormTextarea>
              </FormField>
            </FormFieldListContainer>
          </BookingForm>
          <BookingGallery>
            <BookingSwiperSliderRoomStatus styled={booking?.status}>
              <h6>{ booking?.status.replace("_", " ") }</h6>
            </BookingSwiperSliderRoomStatus>
            <BookingSwiperSlideRoomInfo>
              <BookingSwiperSliderRoomType>
                { booking?.room?.type }
              </BookingSwiperSliderRoomType>
              <BookingSwiperSliderRoomDescription>
                { booking?.room?.description }
              </BookingSwiperSliderRoomDescription>
            </BookingSwiperSlideRoomInfo>
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
                booking?.room?.photos
                ? booking?.room.photos.map((photo, index) => (
                  <SwiperSlide key={`${booking?.room?.id}_${index}`} style={{backgroundImage:`url(${photo})`}}>
                    <BookingGalleryBlackLayer/>
                    <BookingSwiperSlideRoomImage src={photo}/>
                  </SwiperSlide>
                ))
                : <></>
              }
            </Swiper>
            <BookingSwiperPaginationPrev
              ref={prevRef}
              className="swiper-button-prev disabled"
              onClick={() =>
                roomPhotosSwiper?.slideTo(roomPhotosSwiper?.activeIndex - 1)
              }
            >
              <FaArrowLeft />
            </BookingSwiperPaginationPrev>
            <BookingSwiperPaginationNext
              ref={nextRef}
              className="swiper-button-next"
              onClick={() =>
                roomPhotosSwiper?.slideTo(roomPhotosSwiper.activeIndex + 1)
              }
            >
              <FaArrowRight />
            </BookingSwiperPaginationNext>
          </BookingGallery>
        </BookingContainer>
      </>
  )
}
