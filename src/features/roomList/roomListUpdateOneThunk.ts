import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from "../../modelInterface";

const updateRoom = (updateRoom: RoomInterface, list: RoomInterface[]): Promise<RoomInterface[]> => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      const roomList = list.map((room) => {
        if (room.id === updateRoom.id)
          return { ...updateRoom }
    
        return room;
      })
      resolve(roomList);
    }, 200);
  })
}

export const roomListUpdateOneThunk = createAsyncThunk<RoomInterface[], { room: RoomInterface; list: RoomInterface[] }>("roomList/roomListUpdateOne", async ({room, list}) => {
  const roomList: RoomInterface[] = await updateRoom(room, list);

  return roomList;
})