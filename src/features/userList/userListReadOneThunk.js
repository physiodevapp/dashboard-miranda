import { createAsyncThunk } from "@reduxjs/toolkit";

const getUserById = (userId, userList) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(userList.find((user) => user.id === userId));
    }, 200);
  })
}

const getUserByEmail = (userEmail, userList) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(userList.find((user) => user.email === userEmail));
    }, 200);
  })
}

export const userListReadOneThunk = createAsyncThunk("userList/userListReadOne", async ({key, list}) => {
  let user = undefined;

  user = await getUserById(key, list);

  if (!user)
    user = await getUserByEmail(key, list)

  return user;
})