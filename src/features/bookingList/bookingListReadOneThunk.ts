import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingInterface  } from "../../modelInterface";
import { fetchData } from "../apiCall";

export const bookingListReadOneThunk = createAsyncThunk<BookingInterface | null, { id: string }>("booking/bookingListReadOne", async ({id}) => {
  const booking = await fetchData<BookingInterface>(`bookings/${id}`, { 
    method: 'GET', 
    token: localStorage.getItem('authToken') 
  }) as BookingInterface;

  return booking || null;
})