import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../../app/store';
import { roomListUpdateOneThunk } from "./roomListUpdateOneThunk";
import dataRooms from "../../data/mock_rooms.json";
import { roomListReadOneThunk } from "./roomListReadOneThunk";
import { roomListReadListThunk } from "./roomListReadListThunk";
import { roomListDeleteOneThunk } from "./roomListDeleteOneThunk";
import { roomListCreateOneThunk } from "./roomListCreateOneThunk";

export interface RoomInterface {
  [key: string]: any,
  id: string,
  number: number,
  description: string,
  has_offer: boolean,
  facilities: string[],
  name: string,
  cancellation_policy: string,
  type: string,
  price_night: number,
  discount: number,
  status: "available" | "booked",
  photos: string[],
}

interface RoomStateInterface {
  error: null | string,
  status: "idle" | "pending" | "fulfilled" | "rejected",
  roomList: RoomInterface[],
  room: RoomInterface | null | undefined,
}

const initialState: RoomStateInterface = {
  error: null,
  status: "idle",
  roomList: dataRooms as RoomInterface[],
  room: undefined,
}

export const roomListSlice = createSlice({
  name: "roomList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(roomListUpdateOneThunk.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(roomListUpdateOneThunk.fulfilled, (state, action: PayloadAction<RoomInterface[]>) => {
        state.roomList = action.payload

        state.room = null;

        state.status = "fulfilled";
      })
      .addCase(roomListUpdateOneThunk.rejected, (state, action) => {
        state.status = "rejected";
      })

      .addCase(roomListReadOneThunk.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(roomListReadOneThunk.fulfilled, (state, action: PayloadAction<RoomInterface | undefined>) => {
        state.room = action.payload;

        state.status = "fulfilled";
      })
      .addCase(roomListReadOneThunk.rejected, (state, action) => {
        state.status = "rejected";
      })

      .addCase(roomListDeleteOneThunk.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(roomListDeleteOneThunk.fulfilled, (state, action: PayloadAction<RoomInterface[]>) => {
        state.room = null;
        state.roomList = action.payload;

        state.status = "fulfilled";
      })
      .addCase(roomListDeleteOneThunk.rejected, (state, action) => {
        state.status = "rejected";
      })

      .addCase(roomListCreateOneThunk.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(roomListCreateOneThunk.fulfilled, (state, action: PayloadAction<RoomInterface[]>) => {
        state.roomList = action.payload;

        state.room = null;

        state.status = "fulfilled";
      })
      .addCase(roomListCreateOneThunk.rejected, (state, action) => {
        state.status = "rejected";
      })

      .addCase(roomListReadListThunk.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(roomListReadListThunk.fulfilled, (state, action: PayloadAction<RoomInterface[]>) => {
        state.roomList = action.payload;
        state.room = undefined;

        state.status = "fulfilled";
      })
      .addCase(roomListReadListThunk.rejected, (state, action) => {
        state.status = "rejected";
      })
  },
});

export const roomListStatusSelect = (state: RootState) => state.roomList.status;
export const roomListErrorSelect = (state: RootState) => state.roomList.error;
export const roomListRoomListSelect = (state: RootState) => state.roomList.roomList;
export const roomListRoomSelect = (state: RootState) => state.roomList.room;
