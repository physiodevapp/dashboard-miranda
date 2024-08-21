import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../../modelInterface";
import { requestLogin } from "../apiCall";

export const userListCanLoginThunk = createAsyncThunk<UserInterface | null, { email: string, password: string, list: UserInterface[] }, { rejectValue: string }>("userList/userListCanLogin", async ({email, password}, { rejectWithValue }) => {
  try {
    const user = await requestLogin<UserInterface>('login', {
      body: { email, password }
    }) 
    
    return user;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue(error as string);
    }
  }
})