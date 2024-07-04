import { createSlice } from "@reduxjs/toolkit";
import dataUsers from "../../data/mock_users.json";
import { userListReadListThunk } from "./userListReadListThunk";


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