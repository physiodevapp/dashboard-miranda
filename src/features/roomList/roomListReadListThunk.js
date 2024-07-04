
import { createAsyncThunk } from "@reduxjs/toolkit";

const getRoomList = (roomList) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(roomList);
    }, 200);
  })
}

export const roomListReadListThunk = createAsyncThunk("roomList/roomListReadList", async ({list}) => {
  const roomList = await getRoomList(list);

  return roomList;
})