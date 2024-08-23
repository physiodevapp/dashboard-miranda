
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../../modelInterface";
import { fetchData } from "../apiCall";

export const userListReadListThunk = createAsyncThunk<UserInterface[], void, { rejectValue: string }>("userList/userListReadList", async (_, { rejectWithValue }) => {
  try {
    const userList = await fetchData<UserInterface>('users', { 
      method: 'GET', 
      token: localStorage.getItem('authToken'), 
    }) as UserInterface[];
  
    return userList;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue(error as string);
    }
  }
})