import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from './userListSlice';

const getUserByKey = (userKey: string, userValue: string, userList: UserInterface[]): Promise<UserInterface | undefined> => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      const user = userList.find((user: UserInterface) => user[userKey] === userValue)
      resolve(user);
    }, 200);
  })
}

export const userListReadOneThunk = createAsyncThunk<UserInterface | undefined, { key: string, value: string, list: UserInterface[] }>("userList/userListReadOne", async ({key, value, list}) => {
  const user: UserInterface | undefined = await getUserByKey(key, value, list);

  return user
})