import React, { useEffect, useRef, useState } from 'react'
import { BookingContainer, BookingFacilities, BookingForm, BookingGallery, BookingGalleryBlackLayer, BookingSwiperPaginationNext, BookingSwiperPaginationPrev, BookingSwiperSlideRoomImage, BookingSwiperSlideRoomInfo, BookingSwiperSliderRoomDescription, BookingSwiperSliderRoomStatus, BookingSwiperSliderRoomType } from './BookingStyled';
import { FormField, FormFieldLabel, FormFieldListContainer, FormInput, FormTextarea } from '../../components/FormField';
import { useNavigate, useParams } from 'react-router-dom';
import dataBookings from "../../data/mock_bookings.json";
import dataRooms from "../../data/mock_rooms.json";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export const BookingPage = () => {
  const [booking, setBooking] = useState({});
  const [room, setRoom] = useState({})
  const { bookingId } = useParams();
  const [canEdit, setCanEdit] = useState(false);
  const navigate = useNavigate();

  const [roomPhotosSwiper, setRoomPhotosSwiper] = useState({});
  const prevRef = useRef();
  const nextRef = useRef();

  const formatDatetime = (datetime) => {
    return new Date(Number(datetime)).toLocaleDateString("es-MX", {
      day: "2-digit",
      year: "numeric",
      month: "short",
      hour12: true,
      hour:"2-digit",
      minute: "2-digit"
    });
  } 

  const getTotalPrice = (checkIn, checkOut) => {
    const diffTime = checkOut - checkIn;    
    const totalNights = Math.round(diffTime / (24 * 3600 * 1000));
    const finalPrice = room?.has_offer
      ? (totalNights * room?.price_night * room.discount / 100)
      : totalNights * room?.price_night

    return `$${finalPrice}`
  }

  useEffect(() => {
    const room = dataRooms.find((room) => room.number === booking.room_number);
    setRoom(room);
  }, [booking])

  useEffect(() => {
    if (bookingId) {
      const booking = JSON.parse(JSON.stringify(dataBookings)).find(room => room['id'] === bookingId)
      setBooking(booking)
    }
  }, [bookingId])

  return (
    <>
      <BookingContainer>
        <BookingForm>
          <FormFieldListContainer>
            <FormField width="100%">
              <FormFieldLabel htmlFor='booking_name'>Fullname</FormFieldLabel>
              <FormInput disabled={!canEdit} value={`${booking.first_name} ${booking.last_name}`}></FormInput>
            </FormField>
            <FormField width="100%">
              <FormFieldLabel htmlFor='booking_name'>Booking Id</FormFieldLabel>
              <FormInput disabled={!canEdit} value={booking.id}></FormInput>
            </FormField>
            <FormField width="50%">
              <FormFieldLabel htmlFor='booking_name'>Check In</FormFieldLabel>
              <FormInput disabled={!canEdit} value={ formatDatetime(booking.check_in) }></FormInput>
            </FormField>
            <FormField width="50%">
              <FormFieldLabel htmlFor='booking_name'>Check Out</FormFieldLabel>
              <FormInput disabled={!canEdit} value={ formatDatetime(booking.check_out) }></FormInput>
            </FormField>
            <FormField width="50%">
              <FormFieldLabel htmlFor='booking_name'>Room number</FormFieldLabel>
              <FormInput disabled={!canEdit} value={ booking.room_number }></FormInput>
            </FormField>
            <FormField width="50%">
              <FormFieldLabel htmlFor='booking_name'>Final Price</FormFieldLabel>
              <FormInput disabled={!canEdit} value={ getTotalPrice(booking.check_in, booking.check_out) }></FormInput>
            </FormField>
            <FormField>
              <FormFieldLabel htmlFor="booking_special_request">Special request</FormFieldLabel>
              <FormTextarea disabled={!canEdit} rows={10} value={booking.special_request}></FormTextarea>
            </FormField>
            <BookingFacilities>
              {
                room?.facilities?.map((facility) => {
                  return <li key={`${room.id}_${facility}`}>{ facility }</li>
                })
              }
            </BookingFacilities>
          </FormFieldListContainer>
        </BookingForm>
        <BookingGallery>
          <BookingSwiperSlideRoomInfo>
            <BookingSwiperSliderRoomType>
              { room?.type }
            </BookingSwiperSliderRoomType>
            <BookingSwiperSliderRoomDescription>
              { room?.description }
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
              room?.photos
              ? room.photos.map((photo, index) => (
                <SwiperSlide key={`${room.id}_${index}`} style={{backgroundImage:`url(${photo})`}}>
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
              roomPhotosSwiper.slideTo(roomPhotosSwiper.activeIndex - 1)
            }
          >
            <FaArrowLeft />
          </BookingSwiperPaginationPrev>
          <BookingSwiperPaginationNext
            ref={nextRef}
            className="swiper-button-next"
            onClick={() =>
              roomPhotosSwiper.slideTo(roomPhotosSwiper.activeIndex + 1)
            }
          >
            <FaArrowRight />
          </BookingSwiperPaginationNext>
        </BookingGallery>
      </BookingContainer>
    </>
  )
}
