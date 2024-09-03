import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactInterface } from "../../modelInterface";
import { fetchData } from "../apiCall";

export const contactListUpdateOneThunk = createAsyncThunk<void, { contact: ContactInterface }, { rejectValue: string }>("contactList/contactListUpdateOne", async ({contact}, { rejectWithValue }) => {
  try {
    await fetchData<ContactInterface>(`contacts/${contact.id}`, { 
      method: 'PATCH', 
      token: localStorage.getItem('authToken'),
      body: contact, 
    });
    
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue(error as string);
    }
  }
})