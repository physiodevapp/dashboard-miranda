import styled from "styled-components";

export const Logo = styled.img`
  max-width: 100%;
  padding: 0em 3.4em
`

export const MenuList = styled.ul`
  list-style: none;
  margin-top: 1em;
`

export const MenuListItem = styled.li`
  padding: 0.8em 1em 0.8em 3.4em;
  color: #799283;
  display: flex;
  align-items: center;
  font-family: "Poppins";
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  cursor: pointer;
  &:hover {
    color: #E23428;
    svg {
      color: #E23428;
    }
    span {
      background-color: #E23428;
    }
  }

  svg {
    margin-right: 0.6em;
    color: #799283;
    font-size: 1.2rem;
  }

  span {
    height: 2.2em;
    width: 0.25em;
    border-radius: 0em 0.6em 0.6em 0em;
    position: absolute;
    left: 0em;
  }
`

export const User = styled.article`
  box-shadow: 0px 20px 30px #00000014;
  border-radius: 18px;
  margin: 0.6em 3.4em 0em;
  padding: 0.2em 3em 1.6em;
  text-align: center;

  img {
    max-width: 70px;
    border-radius: 0.6em;
    margin-bottom: 1em;
  }
`

export const Name = styled.h6`
  font-size: 1rem;
  color: #393939;
  margin-bottom: 0.4em;
  font-family: "Poppins";
`

export const Email = styled.h6`
  font-size: 0.8rem;
  color: #B2B2B2;
  margin-bottom: 1.4em;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: "Poppins";
  font-weight: 300;
`

export const Brand = styled.h5`
  font-size: 1rem;
  color: #212121;
  position: absolute;
  bottom: 5rem;
  padding: 0em 3.4rem;
  font-family: "Poppins";
`

export const Copyright = styled.h6`
  font-size: 0.9rem;
  color: #799283;
  position: absolute;
  bottom: 3.5rem;
  padding: 0em 3.4rem;
  font-family: "Poppins";
  font-weight: 300;
`

export const Author = styled.h6`
  position: absolute;
  font-size: 0.8rem;
  bottom: 1.5em;
  color: #799283;
  padding: 0em 3.4rem;
  font-family: "Poppins";
  font-weight: 400;
`