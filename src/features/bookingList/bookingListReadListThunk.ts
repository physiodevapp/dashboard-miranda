import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingInterface } from './bookingListSlice';

const getBookingList = (bookingList: BookingInterface[]): Promise<BookingInterface[]> => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(bookingList);
    }, 200);
  })
}

export const bookingListReadListThunk = createAsyncThunk<BookingInterface[], { list: BookingInterface[] }>("bookingList/bookingListReadList", async ({list}) => {
  const bookingList: BookingInterface[] = await getBookingList(list);

  return bookingList;
})