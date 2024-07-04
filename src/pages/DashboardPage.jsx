

import React, { useState } from 'react'
import { KPIsListComponent } from '../components/KPIsList/KPIsListComponent';
import { RecentContactListComponent } from '../components/RecentContacts/RecentContactListComponent';
import { PageElementContainerStyled } from '../components/PageElementContainerStyled';

import dataContacts from "../data/mock_contacts.json";

export const DashboardPage = () => {
  const [contacts, setContacts] = useState(dataContacts);
  
  return (
    <>
      <PageElementContainerStyled>
        <KPIsListComponent/>
        <RecentContactListComponent 
          onUpdate={(updateContact) => {
            const updateContactList = JSON.parse(JSON.stringify(contacts)).map((item) => {
              if (item.id === updateContact.id) {
                return updateContact
              }

              return item
            })
            setContacts(updateContactList);  
          }}
        />
      </PageElementContainerStyled>
    </>
  )
}
