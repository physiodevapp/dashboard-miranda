

import React from 'react'
import { KPIsListComponent } from '../components/KPIsList/KPIsListComponent';
import { RecentContactsComponent } from '../components/RecentContacts/RecentContactsComponent';
import { PageElementContainerStyled } from '../components/PageElementContainerStyled';

export const DashboardPage = () => {
  return (
    <>
      <PageElementContainerStyled>
        <KPIsListComponent/>
        <RecentContactsComponent />
      </PageElementContainerStyled>
    </>
  )
}
