import { configureStore } from "@reduxjs/toolkit";
import { roomListSlice } from "../features/roomList/roomListSlice";


export const store = configureStore({
  reducer: {
    roomList: roomListSlice.reducer
  }
})