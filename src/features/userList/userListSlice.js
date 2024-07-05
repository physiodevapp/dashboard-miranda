import { createSlice } from "@reduxjs/toolkit";
import dataUsers from "../../data/mock_users.json";
import { userListReadListThunk } from "./userListReadListThunk";
import { userListUpdateOneThunk } from "./userListUpdateOneThunk";
import { userListReadOneThunk } from "./userListReadOneThunk";
import { userListDeleteOneThunk } from "./userListDeleteOneThunk";
import { userListCreateOneThunk } from "./userListCreateOneThunk";


export const userListSlice = createSlice({
  name: "userList",
  initialState: {
    error: null,
    status: "idle",
    userList: dataUsers,
    user: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(userListUpdateOneThunk.pending, (state, action) => {
      state.status = "pending";
    })
    .addCase(userListUpdateOneThunk.fulfilled, (state, action) => {
      state.userList = action.payload

      state.user = null;

      state.status = "fulfilled";
    })
    .addCase(userListUpdateOneThunk.rejected, (state, action) => {
      state.status = "rejected";
    })

    .addCase(userListReadOneThunk.pending, (state, action) => {
      state.status = "pending";
    })
    .addCase(userListReadOneThunk.fulfilled, (state, action) => {
      state.user = action.payload;

      state.status = "fulfilled";
    })
    .addCase(userListReadOneThunk.rejected, (state, action) => {
      state.status = "rejected";
    })

    .addCase(userListDeleteOneThunk.pending, (state, action) => {
      state.status = "pending";
    })
    .addCase(userListDeleteOneThunk.fulfilled, (state, action) => {
      state.user = null;
      state.userList = action.payload;

      state.status = "fulfilled";
    })
    .addCase(userListDeleteOneThunk.rejected, (state, action) => {
      state.status = "rejected";
    })

    .addCase(userListCreateOneThunk.pending, (state, action) => {
      state.status = "pending";
    })
    .addCase(userListCreateOneThunk.fulfilled, (state, action) => {
      state.userList = action.payload;

      state.user = null;

      state.status = "fulfilled";
    })
    .addCase(userListCreateOneThunk.rejected, (state, action) => {
      state.status = "rejected";
    })

    .addCase(userListReadListThunk.pending, (state, action) => {
      state.status = "pending";
    })
    .addCase(userListReadListThunk.fulfilled, (state, action) => {
      state.userList = action.payload;
      state.user = undefined;

      state.status = "fulfilled";
    })
    .addCase(userListReadListThunk.rejected, (state, action) => {
      state.status = "rejected";
    })
  }

})

export const userListStatusSelect = (state) => state.userList.status;
export const userListErrorSelect = (state) => state.userList.error;
export const userListUserListSelect = (state) => state.userList.userList;
export const userListUserSelect = (state) => state.userList.user;