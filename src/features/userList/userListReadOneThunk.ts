import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../../modelInterface";
import { fetchData } from "../apiCall";

export const userListReadOneThunk = createAsyncThunk<UserInterface | null, { id: string }, { rejectValue: string }>("userList/userListReadOne", async ({id}, { rejectWithValue }) => {

  try {
    const user = await fetchData<UserInterface>(`users/${id}`, { 
      method: 'GET', 
    }) as UserInterface;
  
    return user;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue(error as string);
    }
  };
})