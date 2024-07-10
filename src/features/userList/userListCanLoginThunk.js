import { createAsyncThunk } from "@reduxjs/toolkit";
import { hashPassword } from "../../utils/hashPassword";

const canLogin = (userEmail, hash, userList) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(userList.find((user) => user.email === userEmail && user.password === hash))
    }, 200);
  })
}

export const userListCanLoginThunk = createAsyncThunk("userList/userListCanLogin", async ({email, password, list}) => {
  const hash = await hashPassword(password) ;
  const user = await canLogin(email, hash, list);

  return user;
})