import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingInterface } from "../../modelInterface";
import { fetchData } from "../apiCall";

export const bookingListReadListThunk = createAsyncThunk<BookingInterface[]>("bookingList/bookingListReadList", async () => {

  const bookingList = await fetchData<BookingInterface>('bookings', { 
    method: 'GET', 
    token: localStorage.getItem('authToken') 
  }) as BookingInterface[]

  return bookingList;
})