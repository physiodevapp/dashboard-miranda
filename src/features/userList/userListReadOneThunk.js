import { createAsyncThunk } from "@reduxjs/toolkit";

const getUserByKey = (userKey, userValue, userList) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(userList.find((user) => user[userKey] === userValue));
    }, 200);
  })
}

export const userListReadOneThunk = createAsyncThunk("userList/userListReadOne", async ({key, value, list}) => {
  const user = await getUserByKey(key, value, list)

  return user;
})