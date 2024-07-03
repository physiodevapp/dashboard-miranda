

import { createAsyncThunk } from "@reduxjs/toolkit";

const createRoom = (room, list) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve([...list, room])
    }, 200);
  })
}

export const roomListCreateOneThunk = createAsyncThunk("roomList/roomListCreateOne", async ({room, list}) => {
  const roomList = await createRoom(room, list);

  return roomList;
})