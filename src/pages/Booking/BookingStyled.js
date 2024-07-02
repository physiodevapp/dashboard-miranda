import styled from "styled-components";
import { PageElementContainerStyled } from "../../components/PageElementContainerStyled";

export const BookingContainer = styled(PageElementContainerStyled)`
  height: 100%;
  max-height: 95%;
  display: flex;
  flex-direction: row;
  position: relative;
  left: unset;
  bottom: unset;
  border-radius: 1em;
`

export const BookingForm = styled.form`
  height: 100%;
  flex: 1;
  background-color: white;
  border-radius: 1em 0em 0em 1em;
  border: none;
  width: 50%;
  position: relative;
  padding: 2em 2em 2em;
`

export const BookingGallery = styled.section`
  flex:  1;
  height: 100%;
  border-radius: 0em 1em 1em 0em;
  width: 50%;
  position: relative;

  .swiper {
    width: 100%;
    height: 100%;
    padding: 0em 0em;
    border-radius: 0em 1.2em 1.2em 0em;
    background-color: black;

    .swiper-slide {
      cursor: default;
      text-align: center;
      font-size: 18px;
      background: #fff;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      padding: 0em 0em;
      width: 430px;
      transition: 0.2s ease-in-out;  
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;  
    }
  }
`

export const BookingGalleryBlackLayer = styled.div`
  position: relative;
  top: 100%;
  transform: translateY(-100%);
  width: 100%;
  height: 60%;
  z-index: 10;
  opacity: 0.8;
  /*
  * Created with https://www.css-gradient.com
  * Gradient link: https://www.css-gradient.com/?c1=ffffff&c2=010101&gt=l&gd=dtt
  */
  background: #FFFFFF;
  background: linear-gradient(180deg, #ffffff00, #222222);
`

export const BookingSwiperSlideRoomImage = styled.img`
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.0);
  width: 100%;
`

export const BookingSwiperPagination = styled.div`
  position: absolute;
  border: 1px solid white;
  background-color: #c2c2c2;
  color: white;
  padding: 1em;
  border-radius: 0.6em;
  width: unset;
  height: unset;
  top: 25.4em;
  &::after {
    content: unset;
  }

  &.disabled {
    background-color: #ebf1ef63;
    border: 1px solid #ebf1ef63;
    cursor: default;
  }
`

export const BookingSwiperPaginationPrev = styled(BookingSwiperPagination)`
  left: 2em;
`

export const BookingSwiperPaginationNext = styled(BookingSwiperPagination)`
  right: 2em;
`

export const BookingSwiperSlideRoomInfo = styled.article`
  font-family: "Poppins";
  position: absolute;
  bottom: 0em;
  z-index: 10;
  padding: 1em 1em 2em;
`

export const BookingSwiperSliderRoomType = styled.h6`
  font-weight: 700;
  font-size: 1.2rem;
  color: white;
  margin-bottom: 0.6em;
`

export const BookingSwiperSliderRoomDescription = styled.p`
  font-size: 0.8rem;
  color: #B2B2B2;
  margin: 0em;
  padding: 0em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${props => props.lineclamp || 4};
  overflow: hidden;
  text-overflow: ellipsis;
`

export const BookingSwiperSliderRoomStatus = styled.h6`

`

export const BookingFacilities = styled.ul`

`