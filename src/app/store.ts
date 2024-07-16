import { configureStore } from "@reduxjs/toolkit";
import { roomListSlice } from "../features/roomList/roomListSlice";
import { contactListSlice } from "../features/contactList/contactListSlice";
import { bookingListSlice } from "../features/bookingList/bookingListSlice";
import { userListSlice } from "../features/userList/userListSlice";


export const store = configureStore({
  reducer: {
    roomList: roomListSlice.reducer,
    contactList: contactListSlice.reducer,
    bookingList: bookingListSlice.reducer,
    userList: userListSlice.reducer
  }
});

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']