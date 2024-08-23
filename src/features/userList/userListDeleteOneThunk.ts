
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../apiCall";
import { UserInterface } from "../../modelInterface";

export const userListDeleteOneThunk = createAsyncThunk<UserInterface[], { id: string }, { rejectValue: string }>("userList/userListDeleteOne", async ({ id }, { rejectWithValue }) => {
  try {
    const userList = await fetchData<UserInterface>(`users/${id}`, { 
      method: 'DELETE', 
      token: localStorage.getItem('authToken'), 
    });

    if (Array.isArray(userList)) {
      return userList;
    } else {
      return rejectWithValue('Expected an array of users');
    }
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue(error as string);
    }
  }
})