import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../../app/store';
import dataBookings from "../../data/mock_bookings.json";
import { bookingListReadListThunk } from "./bookingListReadListThunk";
import { bookingListReadOneThunk } from "./bookingListReadOneThunk";
import { bookingListDeleteOneThunk } from "./bookingListDeleteOneThunk";
import { RoomInterface } from "../roomList/roomListSlice";

export interface BookingInterface {
  [key: string]: any;
  id: string,
  first_name: string,
  last_name: string,
  order_date: string,
  check_in: string,
  check_out: string,
  room_type: "Single Bed" | "Double Bed" | "Double Superior" | "Suite",
  room_number: number,
  status: "check_in" | "check_out" | "in_progress",
  special_request: string,
  room_details?: RoomInterface | undefined
} 

interface BookingStateInterface {
  error: null | string,
  status: "idle" | "pending" | "fulfilled" | "rejected",
  bookingList: BookingInterface[],
  booking: BookingInterface | null | undefined,
  searchTerm: string,
}

const initialState: BookingStateInterface = {
  error: null,
  status: "idle",
  bookingList: dataBookings as BookingInterface[],
  booking: undefined,
  searchTerm: '',
}

export const bookingListSlice = createSlice({
  name: "bookingList",
  initialState,
  reducers: {
    bookingListSetBookingSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(bookingListReadOneThunk.pending, (state, action) => {
      state.status = "pending";
    })
    .addCase(bookingListReadOneThunk.fulfilled, (state, action: PayloadAction<BookingInterface | undefined>) => {
      state.booking = action.payload;

      state.status = "fulfilled";
    })
    .addCase(bookingListReadOneThunk.rejected, (state, action) => {
      state.status = "rejected";
    })

    .addCase(bookingListDeleteOneThunk.pending, (state, action) => {
      state.status = "pending";
    })
    .addCase(bookingListDeleteOneThunk.fulfilled, (state, action: PayloadAction<BookingInterface[]>) => {
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
    .addCase(bookingListReadListThunk.fulfilled, (state, action: PayloadAction<BookingInterface[]>) => {
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

export const bookingListStatusSelect = (state: RootState) => state.bookingList.status;
export const bookingListErrorSelect = (state: RootState) => state.bookingList.error;
export const bookingListBookingListSelect = (state: RootState) => state.bookingList.bookingList;
export const bookingListBookingSelect = (state: RootState) => state.bookingList.booking;
export const bookingListSearchTermSelect = (state: RootState) => state.bookingList.searchTerm;