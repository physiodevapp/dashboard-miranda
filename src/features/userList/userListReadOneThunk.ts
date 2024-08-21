import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../../modelInterface";
import { fetchData } from "../apiCall";

export const userListReadOneThunk = createAsyncThunk<UserInterface | null, { id: string }>("userList/userListReadOne", async ({id}) => {
  const user = await fetchData<UserInterface>(`users/${id}`, { 
    method: 'GET', 
    token: localStorage.getItem('authToken'), 
  }) as UserInterface;

  return user;
})