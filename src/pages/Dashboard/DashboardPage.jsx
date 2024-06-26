

import React from 'react'
import { KPIsComponent } from '../../components/KPIs/KPIsComponent';
import { RecentContactsComponent } from '../../components/RecentContacts/RecentContactsComponent';

export const DashboardPage = () => {
  return (
    <>
      <KPIsComponent/>
      <RecentContactsComponent/>
    </>
  )
}
