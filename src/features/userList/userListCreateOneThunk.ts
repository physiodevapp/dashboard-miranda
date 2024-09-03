
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../../modelInterface";
import { fetchData } from "../apiCall";

export const userListCreateOneThunk = createAsyncThunk<void, { user: UserInterface }, { rejectValue: string }>("userList/userListCreateOne", async ({user}, { rejectWithValue }) => {
  try {
    await fetchData<UserInterface>('users', { 
      method: 'POST', 
      token: localStorage.getItem('authToken'), 
      body: user,
    });
    
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue(error as string);
    }
  }
});