import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../../modelInterface";
import { fetchData } from "../apiCall";

export const userListUpdateOneThunk = createAsyncThunk<void, { user: UserInterface }>("userList/userListUpdateOne", async ({user}) => {
  await fetchData<UserInterface>(`users/${user.id}`, { 
    method: 'PATCH', 
    token: localStorage.getItem('authToken'), 
    body: user,
  });
});