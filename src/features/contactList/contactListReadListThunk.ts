import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactInterface } from './contactListSlice';

const getContactList = (contactList: ContactInterface[]): Promise<ContactInterface[]> => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(contactList);
    }, 200);
  })
}

export const contactListReadListThunk = createAsyncThunk<ContactInterface[], { list: ContactInterface[] }>("contactList/contactListReadList", async ({list}) => {
  const contactList: ContactInterface[] = await getContactList(list);

  return contactList;
})