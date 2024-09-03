import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from "../../modelInterface";
import { fetchData } from "../apiCall";

export const roomListReadOneThunk = createAsyncThunk<RoomInterface | null, { id: string }, { rejectValue: string }>("roomList/roomListReadOne", async ({id}, { rejectWithValue }) => {
  try {
    const room = await fetchData<RoomInterface>(`rooms/${id}`, { 
      method: 'GET', 
      token: localStorage.getItem('authToken'), 
    }) as RoomInterface;
  
    return room;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue(error as string);
    }
  };
})