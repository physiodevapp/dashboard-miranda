
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../apiCall";
import { BookingInterface } from "../../modelInterface";

export const bookingListDeleteOneThunk = createAsyncThunk<BookingInterface, { id: string }, { rejectValue: string }>("bookingList/bookingListDeleteOne", async ({id}, { rejectWithValue }) => {
  try {
    const bookingDeleted = await fetchData<BookingInterface>(`bookings/${id}`, { 
      method: 'DELETE', 
    }) as BookingInterface;

    return bookingDeleted;
    
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue(error as string);
    }
  }
})