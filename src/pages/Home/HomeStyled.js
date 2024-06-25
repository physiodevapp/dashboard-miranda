import styled, { css } from 'styled-components'

export const Grid = styled.div`
  display: grid;
  grid-template-rows: 120px 1fr;
  grid-template-columns: 345px 1fr;
  height: 100vh;
  width: 100%;
  transition: ease-in-out 0.2s;
  
  ${props => props.show === "false" && css`
    transform: translateX(-345px);
    width: calc(100% + 345px);
  `}
`;

export const Menu = styled.aside`
  grid-area: 1 / 1 / 3 / 1;
  background-color: red;
`;

export const Navbar = styled.nav`
  grid-area: 1 / 2 / 1 / 3;
  background-color: green;
`;

export const Main = styled.main`
  grid-area: 2 / 2 / 2 / 3;
  background-color: yellow;
`;