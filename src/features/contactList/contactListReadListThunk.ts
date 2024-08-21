import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactInterface } from "../../modelInterface";
import { fetchData } from "../apiCall";

export const contactListReadListThunk = createAsyncThunk<ContactInterface[]>("contactList/contactListReadList", async () => {
  const contactList = await fetchData<ContactInterface>('contacts', { 
    method: 'GET', 
    token: localStorage.getItem('authToken'), 
  }) as ContactInterface[];

  return contactList;
})