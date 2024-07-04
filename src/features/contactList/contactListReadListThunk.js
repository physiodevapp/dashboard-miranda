import { createAsyncThunk } from "@reduxjs/toolkit";

const getContactList = (contactList) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(contactList);
    }, 200);
  })
}

export const contactListReadListThunk = createAsyncThunk("contactList/contactListReadList", async ({list}) => {
  const contactList = await getContactList(list);

  return contactList;
})