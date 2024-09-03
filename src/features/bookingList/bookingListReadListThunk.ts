import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingInterface } from "../../modelInterface";
import { fetchData } from "../apiCall";

export const bookingListReadListThunk = createAsyncThunk<BookingInterface[], void, { rejectValue: string }>("bookingList/bookingListReadList", async (_, { rejectWithValue }) => {
  try {
    const bookingList = await fetchData<BookingInterface>('bookings', { 
      method: 'GET', 
      token: localStorage.getItem('authToken') 
    }) as BookingInterface[]
  
    return bookingList;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue(error as string);
    }
  }
})