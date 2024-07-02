import { createSlice } from "@reduxjs/toolkit";
import { roomListUpdateOneThunk } from "./roomListUpdateOneThunk";
import dataRooms from "../../data/mock_rooms.json";

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
        state.roomList = state.roomList.map((room) => {
          if (room.id === action.payload.id)
            return { ...action.payload }

          return room;
        });

        state.room = action.payload;

        state.status = "fulfilled";
      })
      .addCase(roomListUpdateOneThunk.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export const roomListStatusSelect = (state) => state.roomList.status;
export const roomListErrorSelect = (state) => state.roomList.error;
export const roomListRoomListSelect = (state) => state.roomList.roomList;
export const roomListRoomSelect = (state) => state.roomList.room;
