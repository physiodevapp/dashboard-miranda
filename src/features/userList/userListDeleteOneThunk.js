
import { createAsyncThunk } from "@reduxjs/toolkit";

const deleteUser = (userId, userList) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(userList.filter((user) => user.id !== userId));
    }, 200);
  })
}

export const userListDeleteOneThunk = createAsyncThunk("userList/userListDeleteOne", async ({id, list}) => {
  const userList =  await deleteUser(id, list);
  
  return userList;
})