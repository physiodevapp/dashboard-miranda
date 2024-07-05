
import { createAsyncThunk } from "@reduxjs/toolkit";

const createUser = (user, list) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve([...list, user])
    }, 200);
  })
}

export const userListCreateOneThunk = createAsyncThunk("userList/userListCreateOne", async ({user, list}) => {
  const userList = await createUser(user, list);

  return userList;
})