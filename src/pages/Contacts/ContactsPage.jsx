import React from "react";
import { RecentContactsComponent } from "../../components/RecentContacts/RecentContactsComponent";
import { PageElementContainerStyled } from "../../components/PageElementContainerStyled";
import contacts from "../../data/mock_contacts.json"

export const ContactsPage = () => {
  return (
    <>
      <PageElementContainerStyled>
        <RecentContactsComponent />
      </PageElementContainerStyled>

    </>
  );
};
