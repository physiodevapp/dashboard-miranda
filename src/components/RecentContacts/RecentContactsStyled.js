import styled from "styled-components";

export const Section = styled.div`
  background-color: white;
  box-shadow: 0px 4px 4px #00000005;
  border-radius: 0.8em;
  width: calc(100% - 4em);
  margin: 0 auto;
  padding: 1.6em 3em 1em;
  max-width: 1240px;

  .swiper {
    width: 100%;
    height: 200px;
    padding: 0em 2em;

    .swiper-slide {
      text-align: center;
      font-size: 18px;
      background: #fff;
      width: 100%;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    .swiper-button-prev, .swiper-button-next {
      background-color: #135846;
      color: white;
      padding: 1em;
      border-radius: 0.6em;
      width: unset;
      height: unset;
      &::after {
        content: unset;
      }
    }

    .swiper-button-prev.disabled, .swiper-button-next.disabled {
      display: none;
    }
  }
`

export const SwiperTitle = styled.h3`
  font-size: 1.4rem;
`