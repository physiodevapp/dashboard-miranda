import React, { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
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
} from "./RecentContactListStyled";

import { FaArrowRight, FaArrowLeft, FaRegCheckCircle } from "react-icons/fa";
import { RiCloseCircleLine } from "react-icons/ri";

import contacts from "../../data/mock_contacts.json";
import userPhoto from "../../assets/Imagen de perfil.png";

import Swal from "sweetalert2";
import 'animate.css';

export const RecentContactListComponent = () => {
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

  const showContact = (contact) => {
    Swal.fire({
      title:`Contact details`,
      showClass: {
        popup:`
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup:`
          animate__animated
          animate__fadeOutUp
          animate__faster
        `
      },
      html:`
        <article class="contact__container__article">
          <img class="container__article__img" src="${userPhoto}"/>
          <section class="container__article__section">
            <h6 class="container__article__section__title">${contact.first_name} ${contact.last_name}</h6>
            <h5 class="container__article__section__subtitle">(${getTimeDiffNow(contact.datetime, contact.id)})</h5>
            <p class="container__article__section__message">${contact.message}</p>
          </section> 
        </article>
      `,
      showCloseButton: true,
      showConfirmButton: false,
      customClass: {
        title: "contact__title",
        htmlContainer: "contact__container"
      }     
    }).then((result) => {
      // if (result.isConfirmed) {
      // }
    })
  }

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
          slidesPerView={"auto"}
          spaceBetween={32}
        >
          {recentContacts.map((contact) => (
            <SwiperSlide key={contact.id}>
              <SwiperSliderMessage onClick={() => showContact(contact)}>{contact.message}</SwiperSliderMessage>
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
