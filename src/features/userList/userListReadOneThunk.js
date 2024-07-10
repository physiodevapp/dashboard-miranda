import { createAsyncThunk } from "@reduxjs/toolkit";

const getUserById = (userId, userList) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(userList.find((user) => user.id === userId));
    }, 200);
  })
}

export const userListReadOneThunk = createAsyncThunk("userList/userListReadOne", async ({id, list}) => {
  const user = await getUserById(id, list);

  return user;
})