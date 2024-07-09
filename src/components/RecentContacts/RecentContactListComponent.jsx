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

import userPhoto from "../../assets/Imagen de perfil.png";

import Swal from "sweetalert2";

import { useDispatch, useSelector } from "react-redux";
import { contactListErrorSelect, contactListStatusSelect, contactListcontactListSelect } from "../../features/contactList/contactListSlice";
import { contactListUpdateOneThunk } from "../../features/contactList/contactListUpdateOneThunk";

export const RecentContactListComponent = () => {
  const contactListDispatch = useDispatch();
  const contactListContactList = useSelector(contactListcontactListSelect);
  const contactListStatus = useSelector(contactListStatusSelect);
  const contactListError = useSelector(contactListErrorSelect);
  const [isUpdating, setIsUpdating] = useState(false);

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
          <section class="container__article__profile">
            <img class="container__article__img" src="${userPhoto}"/>
            <h6 class="container__article__tel">${contact.phone}</h6>
            <input disabled class="container__article__email" type="text" value="${contact.email}" class="container__article__email"/>
          </section>
          <section class="container__article__content">
            <h6 class="container__article__content__title">${contact.first_name} ${contact.last_name}</h6>
            <h5 class="container__article__content__subtitle">(${getTimeDiffNow(contact.datetime, contact.id)})</h5>
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

  const sortContacts = (contacts, { headerKey: key, direction: criteria = -1}) => {
    return contacts.sort((current, next) => {
      if (current[key] < next[key])
        return criteria

      if (current[key] > next[key])
        return -1 * criteria
      
      return 0;
    })
  }

  useEffect(() => {
    switch (contactListStatus) {
      case "idle":
        setIsUpdating(false);
        break;
      case "pending":
        setIsUpdating(true);
        break;
      case "fulfilled":
        setIsUpdating(false);          
        break;
      case "rejected":
        setIsUpdating(true);
        console.log({contactListError});
        break;
      default:
        break;
    }
  }, [contactListStatus])

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
                  <RiCloseCircleLine className={`archive ${contact.status === "archived" && "disabled"}`} onClick={() => {
                    if(contact.status === "archived")
                      return

                    contact.status = "archived";

                    contactListDispatch(contactListUpdateOneThunk({
                      contact: contact, 
                      list: contactListContactList
                    }))
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
