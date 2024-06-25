
import React from 'react'
import styled, { css } from 'styled-components';

const ButtonTemplate = styled.button`
  width: 100%;
  font-size: 1rem;
  padding: 1em 0.6em;
  border-radius: 0.4em;
  border: none;
  text-transform: uppercase;
  cursor: pointer;

  ${props => props.type === "primary" && css`
    background-color: #135846;
    color: #EBF1EF;
    `
  }

  ${props => props.type === "secondary" && css`
    background-color: #EBF1EF;
    color: #135846;
    `
  }
` 

export const Button = ({type, children}) => {
  return (
    <ButtonTemplate type={type}>{children}</ButtonTemplate>
  )
}
