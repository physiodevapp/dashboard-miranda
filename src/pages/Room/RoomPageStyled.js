import styled, { css } from "styled-components";
import { PageElementContainerStyled } from "../../components/PageElementContainerStyled";
import { ButtonStyled } from "../../components/ButtonStyled";


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
  padding: 2em 2em 6em;
`

export const RoomGallery = styled.img`
  flex:  1;
  height: 100%;
  border-radius: 0em 1em 1em 0em;
  width: 50%;
`

export const RoomFormFieldContainer = styled.div`
  height: 100%;
  overflow-y: auto;

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

export const RoomFormField = styled.div`
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
  top: 50%;
  transform: translateY(-41%);
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

export const FormButton = styled(ButtonStyled)`
  margin: 1em 0em;
  position: absolute;
  bottom: 1em;
  &:disabled {
    display: none;
  }

  ${props => {
    switch(props.text) {
      case "edit":
        return css`
          max-width: 500px;
          width: calc(100% - 4em);
          left: 50%;
          transform: translateX(-50%);
        `
      case "dismiss":
        return css`
          max-width: 500px;
          width: calc(50% - 2.5em);
          left: calc(0% + 2em);
        `
      case "save":
        return css`
          max-width: 500px;
          width: calc(50% - 2.5em);
          right: calc(0% + 2em);
        `
    }
  }}
` 

export const RoomFacilities = styled.ul`

`
