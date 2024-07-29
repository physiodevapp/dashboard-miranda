
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingInterface } from "../../modelInterface";

const deleteBooking = (bookingId: string, bookingList: BookingInterface[]): Promise<BookingInterface[]> => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(bookingList.filter((booking) => booking.id !== bookingId));
    }, 200);
  })
}

export const bookingListDeleteOneThunk = createAsyncThunk<BookingInterface[], { id: string, list: BookingInterface[] }>("bookingList/bookingListDeleteOne", async ({id, list}) => {
  const bookingList: BookingInterface[] =  await deleteBooking(id, list);
  
  return bookingList;
})