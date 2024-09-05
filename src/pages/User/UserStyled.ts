import styled, { css } from "styled-components";
import { ButtonStyled } from "../../components/ButtonStyled";
import { PageElementContainerStyled } from "../../components/PageElementContainerStyled";
import { FormField } from "../../components/FormField";

interface UserStyledProps {
  width?: string,
  position?: string,
  defaultphoto?: string
}

export const UserContainer = styled(PageElementContainerStyled)`
  height: 100%;
  max-height: 95%;
  max-width: 700px;
  display: flex;
  flex-direction: row;
  position: relative;
  left: unset;
  bottom: unset;
  border-radius: 1em;
  box-shadow: 0px 20px 30px #00000014;
`

export const UserForm = styled.form`
  height: 100%;
  flex: 1;
  background-color: white;
  border-radius: 1em 1em;
  border: none;
  width: 50%;
  position: relative;
  padding: 2em 2em;
`

export const UserFormFieldContainer = styled.div<UserStyledProps>`
  display: flex;
  width: ${props => props.width || "100%"};
`

export const UserFormFieldPhoto = styled(FormField)<UserStyledProps>`
  position: relative;
  margin: 0em 0em 1em;
  overflow: hidden;
  border-radius: 0.4rem;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) 
      scale(${props => props.defaultphoto === 'true' ? 1.1 : 1.6});
    max-height: 100%;
    max-width: 100%;
    border-radius: 0.4rem;
  }
`

export const UserFormField = styled(FormField)`
  align-items: center;
  position: relative;

  input, textarea {
    border-radius: 4px;
    border: 1px solid rgb(204, 204, 204);
  }
`

export const FormButton = styled(ButtonStyled)<UserStyledProps>`
  margin: 1em 0em 1em;

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
      case "readonly":
        return css`
          width: 100%;
          cursor: default;
        `
    }
  }}

  ${props => props.position !== "readonly" && 
    css`
      &:disabled {
        display: none;
      }
    `
  }
` 

