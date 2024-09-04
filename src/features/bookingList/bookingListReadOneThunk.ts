import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingInterface  } from "../../modelInterface";
import { fetchData } from "../apiCall";

export const bookingListReadOneThunk = createAsyncThunk<BookingInterface | null, { id: string }, { rejectValue: string }>("booking/bookingListReadOne", async ({id}, { rejectWithValue }) => {
  try {
    const booking = await fetchData<BookingInterface>(`bookings/${id}`, { 
      method: 'GET', 
    }) as BookingInterface;
  
    return booking || null;
    
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue(error as string);
    }
  }
})