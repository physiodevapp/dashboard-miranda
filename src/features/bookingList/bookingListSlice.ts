import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../../app/store';
import { bookingListReadListThunk } from "./bookingListReadListThunk";
import { bookingListReadOneThunk } from "./bookingListReadOneThunk";
import { bookingListDeleteOneThunk } from "./bookingListDeleteOneThunk";
import { BookingInterface } from '../../modelInterface';

interface BookingStateInterface {
  error: null | string,
  status: "idle" | "pending" | "fulfilled" | "rejected",
  bookingList: BookingInterface[],
  booking: BookingInterface | null ,
  searchTerm: string,
}

const initialState: BookingStateInterface = {
  error: null,
  status: "idle",
  bookingList: [] as BookingInterface[],
  booking: null,
  searchTerm: '',
}

export const bookingListSlice = createSlice({
  name: "bookingList",
  initialState,
  reducers: {
    bookingListSetBookingSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    resetBookingStatusError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(bookingListReadOneThunk.pending, (state) => {
      state.status = "pending";
    })
    .addCase(bookingListReadOneThunk.fulfilled, (state, action: PayloadAction<BookingInterface | null>) => {
      state.booking = action.payload;

      state.status = "fulfilled";
    })
    .addCase(bookingListReadOneThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.status = "rejected";

      state.error = action.payload || 'An unknown error occurred';
    })

    .addCase(bookingListDeleteOneThunk.pending, (state) => {
      state.status = "pending";
    })
    .addCase(bookingListDeleteOneThunk.fulfilled, (state, action: PayloadAction<BookingInterface>) => {
      state.bookingList = state.bookingList.filter((booking) => booking.id !== action.payload.id);

      state.booking = null;

      state.status = "fulfilled";
    })
    .addCase(bookingListDeleteOneThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.status = "rejected";

      state.error = action.payload || 'An unknown error occurred';
    })

    .addCase(bookingListReadListThunk.pending, (state) => {
      state.status = "pending";
    })
    .addCase(bookingListReadListThunk.fulfilled, (state, action: PayloadAction<BookingInterface[]>) => {
      state.bookingList = action.payload;
      state.booking = null;

      state.status = "fulfilled";
    })
    .addCase(bookingListReadListThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.status = "rejected";

      state.error = action.payload || 'An unknown error occurred';
    })
  }
})

export const { bookingListSetBookingSearchTerm, resetBookingStatusError } = bookingListSlice.actions

export const bookingListStatusSelect = (state: RootState) => state.bookingList.status;
export const bookingListErrorSelect = (state: RootState) => state.bookingList.error;
export const bookingListBookingListSelect = (state: RootState) => state.bookingList.bookingList;
export const bookingListBookingSelect = (state: RootState) => state.bookingList.booking;
export const bookingListSearchTermSelect = (state: RootState) => state.bookingList.searchTerm;