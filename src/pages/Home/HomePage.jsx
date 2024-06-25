

import React, { useState } from 'react'
import { Menu, Navbar, Main, Grid } from './HomeStyled';
import { Outlet } from 'react-router-dom';

export const HomePage = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const handleClickMenu = () => {
    setIsMenuVisible(!isMenuVisible)
  }

  return (
    <>
      <Grid show={isMenuVisible.toString()}>
        <Navbar>
          <button onClick={handleClickMenu}>Menu</button>
        </Navbar>
        <Menu>Non laborum sit Lorem magna tempor voluptate esse consectetur ex non mollit nulla.</Menu>
        <Main>
          <Outlet/>
        </Main>
      </Grid>
    </>
  )
}
