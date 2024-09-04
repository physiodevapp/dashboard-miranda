import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactInterface } from "../../modelInterface";
import { fetchData } from "../apiCall";

export const contactListReadListThunk = createAsyncThunk<ContactInterface[], void, { rejectValue: string }>("contactList/contactListReadList", async (_, { rejectWithValue }) => {
  try {
    const contactList = await fetchData<ContactInterface>('contacts', { 
      method: 'GET', 
    }) as ContactInterface[];
  
    return contactList;
    
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue(error as string);
    }
  }
})