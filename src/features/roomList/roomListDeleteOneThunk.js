
import { createAsyncThunk } from "@reduxjs/toolkit";

const deleteRoom = (roomId, roomList) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(roomList.filter((room) => room.id !== roomId));
    }, 200);
  })
}

export const roomListDeleteOneThunk = createAsyncThunk("roomList/roomListDeleteOne", async ({id, list}) => {
  const roomList =  await deleteRoom(id, list);
  
  return roomList;
})