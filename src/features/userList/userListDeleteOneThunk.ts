
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../apiCall";
import { UserInterface } from "../../modelInterface";

export const userListDeleteOneThunk = createAsyncThunk<void, { id: string }>("userList/userListDeleteOne", async ({id}) => {
  await fetchData<UserInterface>(`users/${id}`, { 
    method: 'DELETE', 
    token: localStorage.getItem('authToken'), 
  });
})