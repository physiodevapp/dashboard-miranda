import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../../app/store';
import dataContacts from "../../data/mock_contacts.json";
import { contactListReadListThunk } from "./contactListReadListThunk";
import { contactListUpdateOneThunk } from "./contactListUpdateOneThunk";

export interface ContactInterface {
  id: string,
  status: "" | "published" | "archived",
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  subject: string,
  message: string,
  datetime: string,
}

interface ContactStateInterface {
  error: null | string,
  status: "idle" | "pending" | "fulfilled" | "rejected",
  contactList: ContactInterface[],
  contact: {} | ContactInterface | null | undefined
}

const initialState: ContactStateInterface = {
  error: null,
  status: "idle",
  contactList: dataContacts as ContactInterface[],
  contact: {}
}

export const contactListSlice = createSlice({
  name: "contactList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(contactListUpdateOneThunk.pending, (state, action) => {
      state.status = "pending";
    })
    .addCase(contactListUpdateOneThunk.fulfilled, (state, action: PayloadAction<ContactInterface[]>) => {
      state.contactList = action.payload;

      state.contact = null;

      state.status = "fulfilled";
    })
    .addCase(contactListUpdateOneThunk.rejected, (state, action) => {
      state.status = "rejected";
    })
    
    .addCase(contactListReadListThunk.pending, (state, action) => {
      state.status = "pending";
    })
    .addCase(contactListReadListThunk.fulfilled, (state, action: PayloadAction<ContactInterface[]>) => {
      state.contactList = action.payload;
      state.contact = undefined;

      state.status = "fulfilled";
    })
    .addCase(contactListReadListThunk.rejected, (state, action) => {
      state.status = "rejected";
    })
  }

}) 


export const contactListStatusSelect = (state: RootState) => state.contactList.status;
export const contactListErrorSelect = (state: RootState) => state.contactList.error;
export const contactListcontactListSelect = (state: RootState) => state.contactList.contactList;
export const contactListContactSelect = (state: RootState) => state.contactList.contact;