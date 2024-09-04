import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../../modelInterface";
import { fetchData } from "../apiCall";

export const userListUpdateOneThunk = createAsyncThunk<void, { user: UserInterface }, { rejectValue: string }>("userList/userListUpdateOne", async ({user}, { rejectWithValue }) => {
  try {
    await fetchData<UserInterface>(`users/${user.id}`, { 
      method: 'PATCH', 
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