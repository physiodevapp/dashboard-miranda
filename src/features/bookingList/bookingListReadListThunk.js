import { createAsyncThunk } from "@reduxjs/toolkit";

const getBookingList = (bookingList) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(bookingList);
    }, 200);
  })
}

export const bookingListReadListThunk = createAsyncThunk("bookingList/bookingListReadList", async ({list}) => {
  const bookingList = await getBookingList(list);

  return bookingList;
})