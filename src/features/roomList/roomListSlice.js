import { createSlice } from "@reduxjs/toolkit";
import { roomListUpdateOneThunk } from "./roomListUpdateOneThunk";
import dataRooms from "../../data/mock_rooms.json";
import { roomListReadOneThunk } from "./roomListReadOneThunk";
import { roomListReadListThunk } from "./roomListReadListThunk";
import { roomListDeleteOneThunk } from "./roomListDeleteOneThunk";
import { roomListCreateOneThunk } from "./roomListCreateOneThunk";

export const roomListSlice = createSlice({
  name: "roomList",
  initialState: {
    error: null,
    status: "idle",
    roomList: dataRooms,
    room: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(roomListUpdateOneThunk.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(roomListUpdateOneThunk.fulfilled, (state, action) => {
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
      .addCase(roomListReadOneThunk.fulfilled, (state, action) => {
        state.room = action.payload;

        state.status = "fulfilled";
      })
      .addCase(roomListReadOneThunk.rejected, (state, action) => {
        state.status = "rejected";
      })

      .addCase(roomListDeleteOneThunk.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(roomListDeleteOneThunk.fulfilled, (state, action) => {
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
      .addCase(roomListCreateOneThunk.fulfilled, (state, action) => {
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
      .addCase(roomListReadListThunk.fulfilled, (state, action) => {
        state.roomList = action.payload;
        state.room = undefined;

        state.status = "fulfilled";
      })
      .addCase(roomListReadListThunk.rejected, (state, action) => {
        state.status = "rejected";
      })
  },
});

export const roomListStatusSelect = (state) => state.roomList.status;
export const roomListErrorSelect = (state) => state.roomList.error;
export const roomListRoomListSelect = (state) => state.roomList.roomList;
export const roomListRoomSelect = (state) => state.roomList.room;
