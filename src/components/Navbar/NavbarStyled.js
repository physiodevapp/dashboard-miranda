import styled from "styled-components";


export const NavbarMenuButton = styled.button`
  font-size: 2.5em;
  border: none;
  background-color: white;
  line-height: 0px;
  cursor: pointer;
  transition: ease-in-out 0.4s;
  transition-delay: 0.2s;
  transform: ${props => props.show === "false" ? "rotateZ(180deg)" : "rotateZ(0deg)"}
`

export const NavbarList = styled.ul`
  list-style: none;
  font-size: 1.6em;
  display: flex;
  gap: 1em;

  svg {
    cursor: pointer;
  }
`

export const NavbarPageTitle = styled.h3`
  font-size: 1.8em;
  font-family: "Poppins";
  color: #262626;
  flex: 1;
  padding-left: 1em;
  text-transform: uppercase;
`