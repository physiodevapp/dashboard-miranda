import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactInterface } from "../../modelInterface";

const updateContact = (updateContact: ContactInterface, list: ContactInterface[]): Promise<ContactInterface[]> => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(
        list.map((contact: ContactInterface) => {
          if (contact.id === updateContact.id)
            return { ...updateContact }
      
          return contact;
        })
      );
    }, 200);
  })
}

export const contactListUpdateOneThunk = createAsyncThunk<ContactInterface[], { contact: ContactInterface, list: ContactInterface[] }>("contactList/contactListUpdateOne", async ({contact, list}) => {
  const contactList: ContactInterface[] = await updateContact(contact, list);

  return contactList;
})