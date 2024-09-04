
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../apiCall";
import { UserInterface } from "../../modelInterface";

export const userListDeleteOneThunk = createAsyncThunk<UserInterface, { id: string }, { rejectValue: string }>("userList/userListDeleteOne", async ({ id }, { rejectWithValue }) => {
  try {
    const userDeleted = await fetchData<UserInterface>(`users/${id}`, { 
      method: 'DELETE', 
    }) as UserInterface;

    return userDeleted;

  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue(error as string);
    }
  }
})