import styled from "styled-components";

interface NavbarMenuButtonProps {
  show: string
}

export const NavbarMenuButton = styled.button<NavbarMenuButtonProps>`
  z-index: 100;
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
    vertical-align: text-top;
  }
`

export const NavbarPageTitle = styled.h3`
  z-index: 100;
  font-size: 1.8em;
  font-family: "Poppins";
  color: #262626;
  padding-left: 1em;
  text-transform: uppercase;
  flex: 1;
`

export const NavbarSearchBarContainer = styled.div`
  margin: 0em 2em;
  position: relative;

  .clear {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;
    font-size: 1.4rem;
    cursor: pointer;
    display: none;

    &.show {
      display: block;
    }
  }
`

export const NavbarSearchBarButton = styled.button`
  position: absolute;
  z-index: 1;
  left: 0%;
  top: 50%;
  transform: translate(-130%, -50%);
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }

  .search {
    font-size: 1.6rem;
    display: block;
  }
`

export const NavbarSearchBarInput = styled.input`
  font-family: "Poppins";
  font-size: 1rem;
  padding: 0.4em 2.6em 0.4em 0.8em;
  width: 340px;
  position: relative;
  left: 100%;
  transform: translateX(-100%);
  background-color: #FCFCFC;
  border: none
`