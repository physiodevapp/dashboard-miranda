
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from "../../modelInterface";
import { fetchData } from "../apiCall";

export const roomListDeleteOneThunk = createAsyncThunk<RoomInterface, { id: string }, { rejectValue: string }>("roomList/roomListDeleteOne", async ({id}, { rejectWithValue }) => {
  try {
    const roomDeleted = await fetchData<RoomInterface>(`rooms/${id}`, { 
      method: 'DELETE', 
    }) as RoomInterface;

    return roomDeleted;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue(error as string);
    }
  };
})