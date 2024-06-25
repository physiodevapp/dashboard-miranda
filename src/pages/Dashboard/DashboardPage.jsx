

import React, { useState } from 'react'
import { Menu, Navbar, Content, Grid } from './DashboardStyled';

export const DashboardPage = () => {
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
        <Content>Et commodo aliqua culpa veniam. Aliquip est irure ullamco cupidatat exercitation dolor culpa commodo enim. Exercitation consequat ullamco minim aute ipsum duis esse elit voluptate qui eiusmod ipsum. Eu nostrud deserunt dolore officia non ex irure dolor aliquip.</Content>
      </Grid>
    </>
  )
}
