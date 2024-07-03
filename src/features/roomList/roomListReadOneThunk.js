import { createAsyncThunk } from "@reduxjs/toolkit";

const getRoom = (roomId, roomList) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(roomList.find((room) => room.id === roomId));
    }, 200);
  })
}

export const roomListReadOneThunk = createAsyncThunk("roomList/roomListReadOne", async ({id, list}) => {
  const room = await getRoom(id, list);

  return room;
})