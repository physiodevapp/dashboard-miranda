
import styled, { css } from 'styled-components';

export const ButtonStyled = styled.button`
  width: 100%;
  font-size: 1rem;
  padding: 0.6em 0.6em;
  border-radius: 0.4em;
  border: none;
  text-transform: uppercase;
  cursor: pointer;
  font-family: "Poppins";
  border: 2px solid transparent;

  ${props => {
    switch(props.styled) {
      case "primary":
        return css`
          background-color: #135846;
          color: #EBF1EF;
          border-color: #135846;
          &:hover {
            background-color: white;
            color: #135846;
          }

          &.disabled {
            background-color: #EBF1EF;
            color: white;
            cursor: default;
          }
        `
      case "secondary":
        return css`
          border-color: #135846;
          background-color: white;
          color: #135846;

          &:hover {
            background-color: #135846;
            color: #EBF1EF;
          }

          &.disabled {
            background-color: #EBF1EF;
            color: white;
            border-color: #EBF1EF;
            cursor: default;
          }
        `
      case "tertiary":
        return css`
          background-color: #EBF1EF;
          color: #135846;
          &:hover {
            background-color: #135846;
            color: #EBF1EF;
          }
        `
      case "available":
        return css`
          background-color: #5AD07A;
          color: white;
        `
      case "booked":
        return css`
          background-color: #E23428;
          color: white;
        `
      case "publish":
        return css`
          padding-top: 0em;
          background-color: white;
          color: #5AD07A;
          text-transform: capitalize;
          cursor: default;
        `
      case "archive":
        return css`
          padding-top: 0em;
          background-color: white;
          color: #E23428;
          text-transform: capitalize;
          &:hover {
            text-decoration: underline;
          }
        `
      case "check_in":
        return css`
          background-color: #E8FFEE;
          color: #5AD07A;
        `
      case "check_out":
        return css`
          background-color: #FFEDEC;
          color: #E23428;
        `
      case "in_progress":
        return css`
          background-color: #E2E2E2;
          color: #6D6D6D;
        `
      case "deny":
        return css`
          border: 2px solid transparent;
          background-color: #E23428;
          color: white;
          &:hover {
            color: #E23428;
            border-color: #E23428;
            background-color: white;
            background-image: unset !important;
          }
        `
    }
  }}
` 