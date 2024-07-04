import { configureStore } from "@reduxjs/toolkit";
import { roomListSlice } from "../features/roomList/roomListSlice";
import { contactListSlice } from "../features/contactList/contactListSlice";
import { bookingListSlice } from "../features/bookingList/bookingListSlice";


export const store = configureStore({
  reducer: {
    roomList: roomListSlice.reducer,
    contactList: contactListSlice.reducer,
    bookingList: bookingListSlice.reducer
  }
})