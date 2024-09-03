import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactInterface } from "../../modelInterface";
import { fetchData } from "../apiCall";

export const contactListUpdateOneThunk = createAsyncThunk<ContactInterface, { contact: ContactInterface }, { rejectValue: string }>("contactList/contactListUpdateOne", async ({contact}, { rejectWithValue }) => {
  try {
    const updatedContact = await fetchData<ContactInterface>(`contacts/${contact.id}`, { 
      method: 'PATCH', 
      token: localStorage.getItem('authToken'),
      body: contact, 
    });

    if (Array.isArray(updatedContact)) {
      return rejectWithValue('Unexpected response: received an array instead of a single contact.');
    }

    return updatedContact;   

  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue(error as string);
    }
  }
})