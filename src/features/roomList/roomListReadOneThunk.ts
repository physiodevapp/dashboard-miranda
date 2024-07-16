import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from './roomListSlice';

const getRoom = (roomId: string, roomList: RoomInterface[]): Promise<RoomInterface | undefined> => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      const room  = roomList.find((room: RoomInterface) => room.id === roomId);

      resolve(room);    
    }, 200);
  })
}

export const roomListReadOneThunk = createAsyncThunk<RoomInterface | undefined, { id: string; list: RoomInterface[] }>("roomList/roomListReadOne", async ({id, list}) => {
  const room: RoomInterface | undefined = await getRoom(id, list);

  return room;
})