
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../apiCall";
import { BookingInterface } from "../../modelInterface";

export const bookingListDeleteOneThunk = createAsyncThunk<void, { id: string }>("bookingList/bookingListDeleteOne", async ({id}) => {
  await fetchData<BookingInterface>('bookings', { 
    method: 'DELETE', 
    token: localStorage.getItem('authToken') 
  })
})