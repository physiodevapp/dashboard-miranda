
import styled, { css } from 'styled-components';

export const ButtonStyled = styled.button`
  width: 100%;
  font-size: 1rem;
  padding: 1em 0.6em;
  border-radius: 0.4em;
  border: none;
  text-transform: uppercase;
  cursor: pointer;

  ${props => {
    switch(props.styled) {
      case "primary":
        return css`
          background-color: #135846;
          color: #EBF1EF;
          border: 2px solid #135846;
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
          border: 2px solid #135846;
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
    }
  }}
` 