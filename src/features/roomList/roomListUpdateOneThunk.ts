import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from "../../modelInterface";
import { fetchData } from "../apiCall";

export const roomListUpdateOneThunk = createAsyncThunk<void, { room: RoomInterface }, { rejectValue: string }>("roomList/roomListUpdateOne", async ({room}, { rejectWithValue }) => {
  try {
    await fetchData<RoomInterface>(`rooms/${room.id}`, { 
      method: 'PATCH', 
      token: localStorage.getItem('authToken'), 
      body: room,
    });

  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue(error as string);
    }
  };
})