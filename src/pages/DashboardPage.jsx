

import React from 'react'
import { KPIsListComponent } from '../components/KPIsList/KPIsListComponent';
import { RecentContactListComponent } from '../components/RecentContacts/RecentContactListComponent';
import { PageElementContainerStyled } from '../components/PageElementContainerStyled';

export const DashboardPage = () => {
  return (
    <>
      <PageElementContainerStyled>
        <KPIsListComponent/>
        <RecentContactListComponent />
      </PageElementContainerStyled>
    </>
  )
}
