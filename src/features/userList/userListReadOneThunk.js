import { createAsyncThunk } from "@reduxjs/toolkit";

const getUser = (userId, userList) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(userList.find((user) => user.id === userId));
    }, 200);
  })
}

export const userListReadOneThunk = createAsyncThunk("userList/userListReadOne", async ({id, list}) => {
  const user = await getUser(id, list);

  return user;
})