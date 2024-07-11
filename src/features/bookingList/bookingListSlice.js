import { createSlice } from "@reduxjs/toolkit";
import dataBookings from "../../data/mock_bookings.json";
import { bookingListReadListThunk } from "./bookingListReadListThunk";
import { bookingListReadOneThunk } from "./bookingListReadOneThunk";
import { bookingListDeleteOneThunk } from "./bookingListDeleteOneThunk";

export const bookingListSlice = createSlice({
  name: "bookingList",
  initialState: {
    error: null,
    status: "idle",
    bookingList: dataBookings,
    booking: {},
    searchTerm: '',
  },
  reducers: {
    bookingListSetBookingSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(bookingListReadOneThunk.pending, (state, action) => {
      state.status = "pending";
    })
    .addCase(bookingListReadOneThunk.fulfilled, (state, action) => {
      state.booking = action.payload;

      state.status = "fulfilled";
    })
    .addCase(bookingListReadOneThunk.rejected, (state, action) => {
      state.status = "rejected";
    })

    .addCase(bookingListDeleteOneThunk.pending, (state, action) => {
      state.status = "pending";
    })
    .addCase(bookingListDeleteOneThunk.fulfilled, (state, action) => {
      state.booking = null;
      state.bookingList = action.payload;

      state.status = "fulfilled";
    })
    .addCase(bookingListDeleteOneThunk.rejected, (state, action) => {
      state.status = "rejected";
    })

    .addCase(bookingListReadListThunk.pending, (state, action) => {
      state.status = "pending";
    })
    .addCase(bookingListReadListThunk.fulfilled, (state, action) => {
      state.bookingList = action.payload;
      state.booking = undefined;

      state.status = "fulfilled";
    })
    .addCase(bookingListReadListThunk.rejected, (state, action) => {
      state.status = "rejected";
    })
  }
})

export const { bookingListSetBookingSearchTerm } = bookingListSlice.actions

export const bookingListStatusSelect = (state) => state.bookingList.status;
export const bookingListErrorSelect = (state) => state.bookingList.error;
export const bookingListBookingListSelect = (state) => state.bookingList.bookingList;
export const bookingListBookingSelect = (state) => state.bookingList.booking;
export const bookingListSearchTermSelect = (state) => state.bookingList.searchTerm;