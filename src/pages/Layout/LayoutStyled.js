import styled, { css } from 'styled-components';

export const GridLayout = styled.div`
  display: grid;
  grid-template-rows: 120px calc(100vh - 120px);
  grid-template-columns: 345px 1fr;
  height: 100vh;
  transform: translateX(0px);
  width: 100%;
  transition: ease-in-out 0.2s;
  transition-delay: 0.2s;
  
  ${props => props.show === "false" && css`
    transform: translateX(-345px);
    width: calc(100% + 345px);
    `
  }
`;

export const MenuLayout = styled.aside`
  grid-area: 1 / 1 / 3 / 1;
  padding: 1.6em 0em 0em;
  box-shadow: 13px 3px 40px #00000005;
`;

export const NavbarLayout = styled.nav`
  grid-area: 1 / 2 / 1 / 3;
  padding: 0em 1em 0em 0em;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MainLayout = styled.main`
  grid-area: 2 / 2 / 2 / 3;
  background-color: #f8f8f8;
  max-width: 100vw;
  min-width: calc(100vw - 345px);
`;