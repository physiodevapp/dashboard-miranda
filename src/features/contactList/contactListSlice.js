import { createSlice } from "@reduxjs/toolkit";
import dataContacts from "../../data/mock_contacts.json";
import { contactListReadListThunk } from "./contactListReadListThunk";
import { contactListUpdateOneThunk } from "./contactListUpdateOneThunk";


export const contactListSlice = createSlice({
  name: "contactList",
  initialState: {
    error: null,
    status: "idle",
    contactList: dataContacts,
    contact: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(contactListUpdateOneThunk.pending, (state, action) => {
      state.status = "pending";
    })
    .addCase(contactListUpdateOneThunk.fulfilled, (state, action) => {
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
    .addCase(contactListReadListThunk.fulfilled, (state, action) => {
      state.contactList = action.payload;
      state.contact = undefined;

      state.status = "fulfilled";
    })
    .addCase(contactListReadListThunk.rejected, (state, action) => {
      state.status = "rejected";
    })
  }

}) 


export const contactListStatusSelect = (state) => state.contactList.status;
export const contactListErrorSelect = (state) => state.contactList.error;
export const contactListcontactListSelect = (state) => state.contactList.contactList;
export const contactListContactSelect = (state) => state.contactList.contact;