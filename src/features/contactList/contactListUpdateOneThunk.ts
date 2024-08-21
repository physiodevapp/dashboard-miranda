import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactInterface } from "../../modelInterface";
import { fetchData } from "../apiCall";

export const contactListUpdateOneThunk = createAsyncThunk<void, { contact: ContactInterface }>("contactList/contactListUpdateOne", async ({contact}) => {
  await fetchData<ContactInterface>(`contacts/${contact.id}`, { 
    method: 'PATCH', 
    token: localStorage.getItem('authToken'),
    body: contact, 
  })
})