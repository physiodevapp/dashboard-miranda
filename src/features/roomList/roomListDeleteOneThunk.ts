
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from "../../modelInterface";

const deleteRoom = (roomId: string, roomList: RoomInterface[]): Promise<RoomInterface[]> => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(roomList.filter((room) => room.id !== roomId));
    }, 200);
  })
}

export const roomListDeleteOneThunk = createAsyncThunk<RoomInterface[], { id: string, list: RoomInterface[] }>("roomList/roomListDeleteOne", async ({id, list}) => {
  const roomList: RoomInterface[] =  await deleteRoom(id, list);
  
  return roomList;
})