import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../../app/store';
import { roomListUpdateOneThunk } from "./roomListUpdateOneThunk";
import { roomListReadOneThunk } from "./roomListReadOneThunk";
import { roomListReadListThunk } from "./roomListReadListThunk";
import { roomListDeleteOneThunk } from "./roomListDeleteOneThunk";
import { roomListCreateOneThunk } from "./roomListCreateOneThunk";
import { RoomInterface } from "../../modelInterface";

interface RoomStateInterface {
  error: null | string,
  status: "idle" | "pending" | "fulfilled" | "rejected",
  roomList: RoomInterface[],
  room: RoomInterface | null,
}

const initialState: RoomStateInterface = {
  error: null,
  status: "idle",
  roomList: [] as RoomInterface[],
  room: null,
}

export const roomListSlice = createSlice({
  name: "roomList",
  initialState,
  reducers: {
    resetRoomStatusError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(roomListUpdateOneThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(roomListUpdateOneThunk.fulfilled, (state) => {
        state.room = null;

        state.status = "fulfilled";
      })
      .addCase(roomListUpdateOneThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = "rejected";

        state.error = action.payload || 'An unknown error occurred';
      })

      .addCase(roomListReadOneThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(roomListReadOneThunk.fulfilled, (state, action: PayloadAction<RoomInterface | null>) => {
        state.room = action.payload;

        state.status = "fulfilled";
      })
      .addCase(roomListReadOneThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = "rejected";

        state.error = action.payload || 'An unknown error occurred';
      })

      .addCase(roomListDeleteOneThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(roomListDeleteOneThunk.fulfilled, (state, action: PayloadAction<RoomInterface>) => {
        state.roomList = state.roomList.filter((room) => room.id !== action.payload.id);
        
        state.room = null;

        state.status = "fulfilled";
      })
      .addCase(roomListDeleteOneThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = "rejected";

        state.error = action.payload || 'An unknown error occurred';
      })

      .addCase(roomListCreateOneThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(roomListCreateOneThunk.fulfilled, (state) => {
        state.room = null;

        state.status = "fulfilled";
      })
      .addCase(roomListCreateOneThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = "rejected";

        state.error = action.payload || 'An unknown error occurred';
      })

      .addCase(roomListReadListThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(roomListReadListThunk.fulfilled, (state, action: PayloadAction<RoomInterface[]>) => {
        state.roomList = action.payload;
        state.room = null;

        state.status = "fulfilled";
      })
      .addCase(roomListReadListThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = "rejected";

        state.error = action.payload || 'An unknown error occurred';
      })
  },
});

export const { resetRoomStatusError } = roomListSlice.actions;

export const roomListStatusSelect = (state: RootState) => state.roomList.status;
export const roomListErrorSelect = (state: RootState) => state.roomList.error;
export const roomListRoomListSelect = (state: RootState) => state.roomList.roomList;
export const roomListRoomSelect = (state: RootState) => state.roomList.room;
