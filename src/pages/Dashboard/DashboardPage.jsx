

import React from 'react'
import { KPIsListComponent } from '../../components/KPIsList/KPIsListComponent';
import { RecentContactsComponent } from '../../components/RecentContacts/RecentContactsComponent';

export const DashboardPage = () => {
  return (
    <>
      <KPIsListComponent/>
      <RecentContactsComponent/>
    </>
  )
}
