
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../../modelInterface";
import { fetchData } from "../apiCall";

export const userListCreateOneThunk = createAsyncThunk<void, { user: UserInterface }>("userList/userListCreateOne", async ({user}) => {
  await fetchData<UserInterface>('users', { 
    method: 'POST', 
    token: localStorage.getItem('authToken'), 
    body: user,
  });
});