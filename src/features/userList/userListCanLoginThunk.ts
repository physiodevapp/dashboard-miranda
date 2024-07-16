import { createAsyncThunk } from "@reduxjs/toolkit";
import { hashPassword } from "../../utils/hashPassword";
import { UserInterface } from './userListSlice';

const canLogin = <T extends UserInterface>(userEmail: string, hash: string, userList: T[]): Promise<T | undefined> => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(userList.find((user) => user.email === userEmail && user.password === hash))
    }, 200);
  })
}

export const userListCanLoginThunk = createAsyncThunk<UserInterface | undefined, { email: string, password: string, list: UserInterface[] }>("userList/userListCanLogin", async ({email, password, list}) => {
  const hash = await hashPassword(password) ;
  const user = await canLogin<UserInterface>(email, hash, list);

  return user;
})