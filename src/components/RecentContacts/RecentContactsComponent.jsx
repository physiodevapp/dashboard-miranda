import React, { useEffect, useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './RecentContactsStyled';
import { Navigation } from 'swiper/modules';
import { Section, SwiperTitle } from './RecentContactsStyled';

import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

import contacts from "../../data/mock_contacts.json";

export const RecentContactsComponent = () => {
  const [contactsSwiper, setContactsSwiper] = useState({});
  const [recentContacts, setRecentContacts] = useState([])
  const prevRef = useRef();
  const nextRef = useRef();

  const handleSlideChange = () => {
    const isSwiperEnd = contactsSwiper.params?.slidesPerView + (contactsSwiper.activeIndex) >= contactsSwiper.slides?.length;
  
    nextRef.current.classList.remove('disabled');
    prevRef.current.classList.remove('disabled');
    
    if (isSwiperEnd)
      nextRef.current.classList.add('disabled');
    else if (!contactsSwiper.activeIndex)
      prevRef.current.classList.add('disabled');
  }

  useEffect(() => {
    handleSlideChange()
  }, [])

  useEffect(() => {
    const sortByField = 'submission_datetime';

    const  compareFunction = (contact, nextContact) => {
      if (contact[sortByField] - nextContact[sortByField] < 0)
        return 1
      else if (contact[sortByField] - nextContact[sortByField] > 0)
        return -1
      
      return 0
    }

    setRecentContacts(() => {
      const recents = [...contacts].map((contact) => (
        {
          ...contact, 
          'submission_datetime': new Date(contact.submission_datetime).getTime()
        }
      ))
      .sort(compareFunction)
      .slice(0, 6)
      
      return recents
    })
  }, [contacts])
  
  
  return (
    <>
      <Section>
        <SwiperTitle>Latest Review by Customers</SwiperTitle>
        <Swiper 
          className="contacts-swiper"
          modules={[Navigation]} 
          onInit={(event) => setContactsSwiper(event)}
          onSlideChange={handleSlideChange}
          navigation={{
            prevEl: 'swiper-button-prev',
            nextEl: 'swiper-button-next'
          }}
          slidesPerView={3}
          spaceBetween={32}>
          {
            recentContacts.map((contact) => (
              <SwiperSlide key={contact.id}>{contact.message}</SwiperSlide>
            ))
          }
          <div ref={prevRef} className='swiper-button-prev' onClick={() => contactsSwiper.slideTo(contactsSwiper.activeIndex - 1)}><FaArrowLeft/></div>
          <div ref={nextRef} className='swiper-button-next' onClick={() => contactsSwiper.slideTo(contactsSwiper.activeIndex + 1)}><FaArrowRight/></div>
        </Swiper>
      </Section>
    </>
  )
}
