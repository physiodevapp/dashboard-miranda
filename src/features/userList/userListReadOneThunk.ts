import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from './userListSlice';

const getUserByKey = <T extends UserInterface>(userKey: string, userValue: string, userList: T[]): Promise<T | null> => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      const user = userList.find((user: T) => user[userKey] === userValue)
      resolve(user || null);
    }, 200);
  })
}

export const userListReadOneThunk = createAsyncThunk<UserInterface | null, { key: string, value: string, list: UserInterface[] }>("userList/userListReadOne", async ({key, value, list}) => {
  const user = await getUserByKey<UserInterface>(key, value, list);

  return user
})