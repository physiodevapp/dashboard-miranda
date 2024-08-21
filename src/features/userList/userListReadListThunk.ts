
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../../modelInterface";
import { fetchData } from "../apiCall";

export const userListReadListThunk = createAsyncThunk<UserInterface[]>("userList/userListReadList", async () => {
  const userList = await fetchData<UserInterface>('users', { 
    method: 'GET', 
    token: localStorage.getItem('authToken'), 
  }) as UserInterface[];

  return userList;
})