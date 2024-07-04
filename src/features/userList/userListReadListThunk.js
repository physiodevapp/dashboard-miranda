
import { createAsyncThunk } from "@reduxjs/toolkit";

const getUserList = (roomList) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(roomList);
    }, 200);
  })
}

export const userListReadListThunk = createAsyncThunk("userList/userListReadList", async ({list}) => {
  const userList = await getUserList(list);

  return userList;
})