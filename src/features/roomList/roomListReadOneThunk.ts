import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from './roomListSlice';

const getRoom = <T extends RoomInterface>(roomId: string, roomList: T[]): Promise<T | null> => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      const room  = roomList.find((room: T) => room.id === roomId);

      resolve(room || null);    
    }, 200);
  })
}

export const roomListReadOneThunk = createAsyncThunk<RoomInterface | null, { id: string; list: RoomInterface[] }>("roomList/roomListReadOne", async ({id, list}) => {
  const room = await getRoom<RoomInterface>(id, list);

  return room;
})