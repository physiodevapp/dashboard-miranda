
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { roomListRoomListSelect } from "./roomListSlice";

const getRoomList = (roomList) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(roomList);
    }, 200);
  })
}

export const roomListReadListThunk = createAsyncThunk("roomListReadList", async ({list}) => {
  const roomList = await getRoomList(list);

  return roomList;
})