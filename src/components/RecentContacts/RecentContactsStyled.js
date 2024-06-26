import styled from "styled-components";

export const Section = styled.div`
  background-color: white;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 0.8em;
  width: calc(100% - 4em);
  margin: 0 auto;
  padding: 1.6em 0em 1em;
  max-width: 1240px;
  position: relative;

  .swiper {
    width: 100%;
    height: 340px;
    padding: 1em 2em 3em;

    .swiper-slide {
      cursor: default;
      text-align: center;
      font-size: 18px;
      background: #fff;
      border: 1px solid rgb(235, 235, 235);
      border-radius: 1.2em;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      padding: 1.2em 1.2em;
      width: 430px;
      transition: 0.2s ease-in-out;
      &:hover {
        box-shadow: 0px 16px 30px #00000014;
        transform: scale(1.05);
      }
    }

  }

`

export const SwiperPaginationPrev = styled.div`
  position: absolute;
  background-color: #135846;
  color: white;
  padding: 1em;
  border-radius: 0.6em;
  width: unset;
  height: unset;
  left: -1em;
  &::after {
    content: unset;
  }

  &.disabled {
    background-color: #EBF1EF;
  }
`

export const SwiperPaginationNext = styled.div`
  position: absolute;
  background-color: #135846;
  color: white;
  padding: 1em;
  border-radius: 0.6em;
  width: unset;
  height: unset;
  right: -1em;
  &::after {
    content: unset;
  }

  &.disabled {
    background-color: #EBF1EF;
  }

`

export const SwiperTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 1em;
  padding: 0em 1.6em;
`

export const SwiperSliderMessage = styled.p`
  color: #4E4E4E;
  font-size: 1rem;
  margin-bottom: 1em;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  width: 100%;
  text-align: left;
  line-height: 28px;
`

export const SwiperSlideAuthor = styled.article`
  display: flex;
  width: 100%;
`

export const SwiperSlideAuthorPhotoContainer = styled.figure`
  background-color: #C5C5C5;
  width: 56px;
  height:56px;
  position: relative;
  overflow: hidden;
`

export const SwiperSlideAuthorPhoto = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.1);
  max-width: 100%;
  max-height: 100%;
`

export const SwiperSlideAuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 1em;
  flex: 1;
`

export const SwiperSlideAuthorInfoName = styled.h6`
  color: #262626;
  font-size: 1rem;
  margin-bottom: 0.6em;
`

export const SwiperSlideAuthorInfoDatetime = styled.h6`
  color: #799283;
  font-size: 0.8rem;
`

export const SwiperSliderButtons = styled.div`
  align-self: center;

  .post {
    font-size: 1.5rem;
    color: #5AD07A;
    margin-right: 0.4em;
    cursor: pointer;
  }

  .archive {
    font-size: 1.5rem;
    transform: scale(1.15);
    color: #E23428;
    cursor: pointer;
  }
`