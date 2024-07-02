import { createAsyncThunk } from "@reduxjs/toolkit";

const updateRoom = (room) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(room)
    }, 200);
  })
}

export const roomListUpdateOneThunk = createAsyncThunk("roomList", async ({room}) => {

  const updatedRoom = await updateRoom(room);

  return updatedRoom;
  
})