

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from './roomListSlice';

const createRoom = (room: RoomInterface, list: RoomInterface[]): Promise<RoomInterface[]> => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve([...list, room])
    }, 200);
  })
}

export const roomListCreateOneThunk = createAsyncThunk<RoomInterface[], { room: RoomInterface; list: RoomInterface[] }>("roomList/roomListCreateOne", async ({room, list}) => {
  const roomList: RoomInterface[] = await createRoom(room, list);

  return roomList;
})