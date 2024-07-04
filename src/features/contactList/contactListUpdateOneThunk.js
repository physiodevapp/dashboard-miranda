import { createAsyncThunk } from "@reduxjs/toolkit";

const updateContact = (updateContact, list) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(
        list.map((contact) => {
          if (contact.id === updateContact.id)
            return { ...updateContact }
      
          return contact;
        })
      );
    }, 200);
  })
}

export const contactListUpdateOneThunk = createAsyncThunk("contactList/contactListUpdateOne", async ({contact, list}) => {
  const contactList = await updateContact(contact, list);

  return contactList;
})