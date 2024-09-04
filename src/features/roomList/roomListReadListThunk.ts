
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from "../../modelInterface";
import { fetchData } from "../apiCall";

export const roomListReadListThunk = createAsyncThunk<RoomInterface[], void, { rejectValue: string }>("roomList/roomListReadList", async (_, { rejectWithValue }) => {
  try {
    const roomList = await fetchData<RoomInterface>('rooms', { 
      method: 'GET', 
    }) as RoomInterface[];
  
    return roomList;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue(error as string);
    }
  }
})