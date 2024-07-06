
import { createAsyncThunk } from "@reduxjs/toolkit";

const deleteBooking = (bookingId, bookingList) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(bookingList.filter((booking) => booking.id !== bookingId));
    }, 200);
  })
}

export const bookingListDeleteOneThunk = createAsyncThunk("bookingList/bookingListDeleteOne", async ({id, list}) => {
  const bookingList =  await deleteBooking(id, list);
  
  return bookingList;
})