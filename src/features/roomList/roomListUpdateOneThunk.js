import { createAsyncThunk } from "@reduxjs/toolkit";

const updateRoom = (updateRoom, list) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(
        list.map((room) => {
          if (room.id === updateRoom.id)
            return { ...updateRoom }
      
          return room;
        })
      );
    }, 200);
  })
}

export const roomListUpdateOneThunk = createAsyncThunk("roomListUpdateOne", async ({room, list}) => {
  const roomList = await updateRoom(room, list);

  return roomList;
})