import { configureStore } from "@reduxjs/toolkit";
import { roomListSlice } from "../features/roomList/roomListSlice";
import { contactListSlice } from "../features/contactList/contactListSlice";


export const store = configureStore({
  reducer: {
    roomList: roomListSlice.reducer,
    contactList: contactListSlice.reducer
  }
})