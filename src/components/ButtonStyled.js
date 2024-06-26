
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
        `
      case "secondary":
        return css`
          background-color: #EBF1EF;
          color: #135846;
          &:hover {
            background-color: #135846;
            color: #EBF1EF;
          }
        `
    }
  }}
` 