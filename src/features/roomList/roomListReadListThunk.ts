
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from "./roomListSlice";

const getRoomList = (roomList: RoomInterface[]): Promise<RoomInterface[]> => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(roomList);
    }, 200);
  })
}

export const roomListReadListThunk = createAsyncThunk<RoomInterface[], {list: RoomInterface[]}>("roomList/roomListReadList", async ({list}) => {
  const roomList: RoomInterface[] = await getRoomList(list);

  return roomList;
})