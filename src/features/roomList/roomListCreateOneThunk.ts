

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from "../../modelInterface";
import { fetchData } from "../apiCall";

export const roomListCreateOneThunk = createAsyncThunk<void, { room: RoomInterface }, { rejectValue: string }>("roomList/roomListCreateOne", async ({room}, { rejectWithValue }) => {
  try {
    await fetchData<RoomInterface>('rooms', { 
      method: 'POST', 
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