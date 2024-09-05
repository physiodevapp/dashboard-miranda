import React, { useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperTypes } from "swiper/types"
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

import Swal from "sweetalert2";

import { contactListcontactListSelect } from "../../features/contactList/contactListSlice";
import { contactListUpdateOneThunk } from "../../features/contactList/contactListUpdateOneThunk";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ContactInterface } from "../../modelInterface";

export const RecentContactListComponent = () => {
  const contactListDispatch = useAppDispatch();
  const contactListContactList = useAppSelector(contactListcontactListSelect);

  const [contactsSwiper, setContactsSwiper] = useState<SwiperTypes | null>(null);

  const [recentContacts, setRecentContacts] = useState<ContactInterface[]>([]);

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const getTimeDiffNow = (dateTime: string): string => {
    const dateNow = new Date().getTime();
    const inputDate = new Date(dateTime).getTime();
    
    const diffTime = dateNow - inputDate;

    const diffYears = Math.floor(diffTime / (365 * 24 * 3600 * 1000));
    const diffDays = Math.floor(diffTime / (24 * 3600 * 1000));
    const diffHours = Math.floor((diffTime % (24 * 3600 * 1000)) / (3600 * 1000));
    const diffMinutes = Math.floor((diffTime % (3600 * 1000)) / (60 * 1000));
    const diffSeconds = Math.floor((diffTime % (60 * 1000)) / 1000);

    if (diffYears > 0) {
      return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
    } else if (diffDays > 30) {
      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    } else if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else {
      return `${diffSeconds} second${diffSeconds > 1 ? 's' : ''} ago`;
    }
  };

  const showContact = (contact: ContactInterface) => {
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
          <section class="container__article__profile">
            <img class="container__article__img" src="${contact.photo}"/>
            <div>
              <h6 class="container__article__tel">${contact.phone}</h6>
              <input disabled class="container__article__email" type="text" value="${contact.email}" class="container__article__email"/>
            </div>
          </section>
          <section class="container__article__content">
            <h6 class="container__article__content__title">${contact.first_name} ${contact.last_name}</h6>
            <h5 class="container__article__content__subtitle">(${getTimeDiffNow(contact.datetime)})</h5>
            <p class="container__article__content__message">${contact.message}</p>
          </section> 
        </article>
      `,
      showCloseButton: true,
      showConfirmButton: false,
      customClass: {
        title: "contact__title",
        htmlContainer: "contact__container"
      }     
    })
  }

  const sortContacts = (contacts: ContactInterface[], { headerKey , direction = -1}: { headerKey: string, direction: -1 | 1 }) => {
    return contacts.sort((current, next) => {
      if (current[headerKey] < next[headerKey])
        return direction

      if (current[headerKey] > next[headerKey])
        return -1 * direction
      
      return 0;
    })
  }

  useEffect(() => {
    const sortedContacts = sortContacts([...contactListContactList], {headerKey: 'datetime', direction: 1})
    
    const recentContacts = sortedContacts
      .map((contact) => ({
        ...contact,
        submission_datetime: new Date(contact.submission_datetime).getTime(),
      }))
      .sort()
      .slice(0, 6);

    setRecentContacts(recentContacts);
  }, [contactListContactList]);

  return (
    <>
      <Section> 
        <SwiperTitle>Latest Review by Customers</SwiperTitle>
        <Swiper
          modules={[Navigation]}
          onInit={(swiper: SwiperTypes) => { 
            setContactsSwiper(swiper) 
          }}
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
            <SwiperSlide key={contact.id} onClick={() => showContact(contact)} style={{cursor: "pointer"}}>
              <SwiperSliderMessage>{contact.message}</SwiperSliderMessage>
              <SwiperSlideAuthor>
                <SwiperSlideAuthorPhotoContainer>
                  <SwiperSlideAuthorPhoto src={contact.photo} />
                </SwiperSlideAuthorPhotoContainer>
                <SwiperSlideAuthorInfo>
                  <SwiperSlideAuthorInfoName>
                    {`${contact.first_name} ${contact.last_name}`}
                  </SwiperSlideAuthorInfoName>
                  <SwiperSlideAuthorInfoDatetime>
                    { getTimeDiffNow(contact.datetime) }
                  </SwiperSlideAuthorInfoDatetime>
                </SwiperSlideAuthorInfo>
                <SwiperSliderButtons>
                  <FaRegCheckCircle className="post" />
                  <RiCloseCircleLine className={`archive ${contact.status === "archived" && "disabled"}`} onClick={() => {
                    if(contact.status === "archived")
                      return

                    contact.status = "archived";

                    contactListDispatch(contactListUpdateOneThunk({ contact }))
                  }}/>
                </SwiperSliderButtons>
              </SwiperSlideAuthor>
            </SwiperSlide>
          ))}
        </Swiper>
        <SwiperPaginationPrev
          ref={prevRef}
          className="swiper-button-prev disabled"
          onClick={() =>
            contactsSwiper!.slideTo(contactsSwiper!.activeIndex - 1)
          }
        >
          <FaArrowLeft />
        </SwiperPaginationPrev>
        <SwiperPaginationNext
          ref={nextRef}
          className="swiper-button-next"
          onClick={() =>
            contactsSwiper!.slideTo(contactsSwiper!.activeIndex + 1)
          }
        >
          <FaArrowRight />
        </SwiperPaginationNext>
      </Section>
    </>
  );
};
