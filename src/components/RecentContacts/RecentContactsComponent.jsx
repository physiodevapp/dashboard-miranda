import React, { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./RecentContactsStyled";
import { Navigation } from "swiper/modules";
import {
  Section,
  SwiperPaginationNext,
  SwiperPaginationPrev,
  SwiperSlideAuthor,
  SwiperSlideAuthorInfo,
  SwiperSlideAuthorInfoDatetime,
  SwiperSlideAuthorInfoName,
  SwiperSlideAuthorPhoto,
  SwiperSlideAuthorPhotoContainer,
  SwiperSliderButtons,
  SwiperSliderMessage,
  SwiperTitle,
} from "./RecentContactsStyled";

import { FaArrowRight, FaArrowLeft, FaRegCheckCircle } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";

import contacts from "../../data/mock_contacts.json";
import userPhoto from "../../assets/Imagen de perfil.png";

export const RecentContactsComponent = () => {
  const [contactsSwiper, setContactsSwiper] = useState({});
  const [recentContacts, setRecentContacts] = useState([]);
  const prevRef = useRef();
  const nextRef = useRef();

  const getTimeDiffNow = (dateTime) => {
    const dateNow = new Date().getTime();
    const diffTime = dateNow - dateTime;

    const diffDays = Math.round(diffTime / (24 * 3600 * 1000));

    return `${diffDays} days ago`;
  };

  useEffect(() => {
    const recentContacts = contacts
      .map((contact) => ({
        ...contact,
        submission_datetime: new Date(contact.submission_datetime).getTime(),
      }))
      .sort()
      .slice(0, 6);

    setRecentContacts(recentContacts);
  }, [contacts]);

  return (
    <>
      <Section>
        <SwiperTitle>Latest Review by Customers</SwiperTitle>
        <Swiper
          modules={[Navigation]}
          onInit={(event) => setContactsSwiper(event)}
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
          slidesPerView={2.4}
          spaceBetween={32}
        >
          {recentContacts.map((contact) => (
            <SwiperSlide key={contact.id}>
              <SwiperSliderMessage>{contact.message}</SwiperSliderMessage>
              <SwiperSlideAuthor>
                <SwiperSlideAuthorPhotoContainer>
                  <SwiperSlideAuthorPhoto src={userPhoto} />
                </SwiperSlideAuthorPhotoContainer>
                <SwiperSlideAuthorInfo>
                  <SwiperSlideAuthorInfoName>
                    {`${contact.first_name} ${contact.last_name}`}
                  </SwiperSlideAuthorInfoName>
                  <SwiperSlideAuthorInfoDatetime>
                    {getTimeDiffNow(contact.datetime, contact.id)}
                  </SwiperSlideAuthorInfoDatetime>
                </SwiperSlideAuthorInfo>
                <SwiperSliderButtons>
                  <FaRegCheckCircle className="post" />
                  <RiCloseCircleLine className="archive"/>
                </SwiperSliderButtons>
              </SwiperSlideAuthor>
            </SwiperSlide>
          ))}
        </Swiper>
          <SwiperPaginationPrev
            ref={prevRef}
            className="swiper-button-prev disabled"
            onClick={() =>
              contactsSwiper.slideTo(contactsSwiper.activeIndex - 1)
            }
          >
            <FaArrowLeft />
          </SwiperPaginationPrev>
          <SwiperPaginationNext
            ref={nextRef}
            className="swiper-button-next"
            onClick={() =>
              contactsSwiper.slideTo(contactsSwiper.activeIndex + 1)
            }
          >
            <FaArrowRight />
          </SwiperPaginationNext>
      </Section>
    </>
  );
};
