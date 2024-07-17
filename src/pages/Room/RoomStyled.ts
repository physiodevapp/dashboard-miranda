import styled, { css } from "styled-components";
import { PageElementContainerStyled } from "../../components/PageElementContainerStyled";
import { ButtonStyled } from "../../components/ButtonStyled";

interface RoomStyledProps {
  width?: string,
  position?: string,
}

export const RoomContainer = styled(PageElementContainerStyled)`
  height: 100%;
  max-height: 95%;
  display: flex;
  flex-direction: row;
  position: relative;
  left: unset;
  bottom: unset;
  border-radius: 1em;
  box-shadow: 0px 20px 30px #00000014;
`

export const RoomForm = styled.form`
  height: 100%;
  flex: 1;
  background-color: white;
  border-radius: 1em 0em 0em 1em;
  border: none;
  width: 50%;
  position: relative;
  padding: 2em 2em;
`

export const RoomGallery = styled.section`
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

export const RoomSwiperPagination = styled.div`
  position: absolute;
  border: 1px solid white;
  background-color: #c2c2c2;
  color: white;
  padding: 1em;
  border-radius: 0.6em;
  width: unset;
  height: unset;
  &::after {
    content: unset;
  }

  &.disabled {
    background-color: #ebf1ef63;
    border: 1px solid #ebf1ef63;
    cursor: default;
  }
`

export const RoomSwiperPaginationPrev = styled(RoomSwiperPagination)`
  left: 2em;
`

export const RoomSwiperPaginationNext = styled(RoomSwiperPagination)`
  right: 2em;
`

export const RoomFormFieldListContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  padding-right: 0.4em;

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
    border: 2px solid #f1f1f1;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
    cursor: grab;
  }
  &::-webkit-scrollbar-thumb:horizontal {
    border-radius: 10px;
  }
`

export const RoomFormField = styled.div<RoomStyledProps>`
  width: ${props => props.width || "100%"};
  margin-bottom: 1.4em;
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0em 0.4em;
  font-family: "Poppins";
`

export const RoomFormLabel = styled.label`
  width: 100%;
  margin-bottom: 0.2em;
  color: #6E6E6E;
  font-size: 0.8rem;
  font-family: inherit;
`

export const RoomInput = styled.input`
  border-radius: 4px;
  border: 1px solid rgb(204, 204, 204);
  padding: 0.6em;
  width: 100%;
  font-size: 1rem;
  font-family: inherit;
  &:disabled {
    border: none;
    background-color: white;
    font-weight: 600;
    cursor: default;
  }
`

export const RoomTextarea = styled.textarea`
  border-radius: 4px;
  border: 1px solid rgb(204, 204, 204);
  padding: 0.6em;
  width: 100%;
  font-family: inherit;
  font-weight: 400;
  &:disabled {
    border: none;
    background-color: white;
    font-weight: 500;
  }

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
    border: 2px solid #f1f1f1;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
    cursor: grab;
  }
  &::-webkit-scrollbar-thumb:horizontal {
    border-radius: 10px;
  }
`

export const ToogleButton = styled.div`
  position: relative;
  width: 60px;
  height: 30px;

  input:checked + label {
    background-color: #135846;
  }

  input:checked + label::after {
    transform: translateX(30px);
  }

  input:disabled + label {
    background-color: #aaa;
    cursor: default;
  }

  input:disabled + .toggle-label::after {
    background-color: #888;
}
`
export const ToogleLabel = styled.label`
  display: block;
  width: 100%;
  height: 100%;
  background-color: #ccc;
  border-radius: 15px;
  cursor: pointer;
  position: absolute;
  margin: 0.4em 0em;
  transition: background-color 0.3s ease;
  &::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 3px;
    width: 24px;
    height: 24px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }
`
export const ToggleButtonInput = styled.input`
  display: none;
`

export const FormButton = styled(ButtonStyled)<RoomStyledProps>`
  margin: 1em 0em 1em;
  &:disabled {
    display: none;
  }

  ${props => {
    switch(props.position) {
      case "left":
        return css`
          max-width: 500px;
          width: calc(50% - 1em);
          margin-right: 2em;
        `
      case "right":
        return css`
          max-width: 500px;
          width: calc(50% - 1em);
        `
    }
  }}
` 
