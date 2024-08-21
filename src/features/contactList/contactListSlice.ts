import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../../app/store';
import { contactListReadListThunk } from "./contactListReadListThunk";
import { contactListUpdateOneThunk } from "./contactListUpdateOneThunk";
import { ContactInterface } from "../../modelInterface";

interface ContactStateInterface {
  error: null | string,
  status: "idle" | "pending" | "fulfilled" | "rejected",
  contactList: ContactInterface[],
  contact: ContactInterface | null
}

const initialState: ContactStateInterface = {
  error: null,
  status: "idle",
  contactList: [] as ContactInterface[],
  contact: null
}

export const contactListSlice = createSlice({
  name: "contactList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(contactListUpdateOneThunk.pending, (state) => {
      state.status = "pending";
    })
    .addCase(contactListUpdateOneThunk.fulfilled, (state) => {
      state.contact = null;

      state.status = "fulfilled";
    })
    .addCase(contactListUpdateOneThunk.rejected, (state) => {
      state.status = "rejected";
    })
    
    .addCase(contactListReadListThunk.pending, (state) => {
      state.status = "pending";
    })
    .addCase(contactListReadListThunk.fulfilled, (state, action: PayloadAction<ContactInterface[]>) => {
      state.contactList = action.payload;
      state.contact = null;

      state.status = "fulfilled";
    })
    .addCase(contactListReadListThunk.rejected, (state) => {
      state.status = "rejected";
    })
  }

}) 


export const contactListStatusSelect = (state: RootState) => state.contactList.status;
export const contactListErrorSelect = (state: RootState) => state.contactList.error;
export const contactListcontactListSelect = (state: RootState) => state.contactList.contactList;
export const contactListContactSelect = (state: RootState) => state.contactList.contact;