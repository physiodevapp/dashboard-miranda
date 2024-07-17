import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../../app/store';
import dataUsers from "../../data/mock_users.json";
import { userListReadListThunk } from "./userListReadListThunk";
import { userListUpdateOneThunk } from "./userListUpdateOneThunk";
import { userListReadOneThunk } from "./userListReadOneThunk";
import { userListDeleteOneThunk } from "./userListDeleteOneThunk";
import { userListCreateOneThunk } from "./userListCreateOneThunk";
import { userListCanLoginThunk } from "./userListCanLoginThunk";


export interface UserInterface {
  [key: string]: any;
  id: string,
  first_name: string,
  last_name: string,
  photo: string,
  start_date: string,
  job_description: string,
  telephone: string,
  status: "active" | "inactive",
  job: "Manager" | "Reservation desk" | "Room service",
  password: string,
  email: string,
}

interface UserStateInterface {
  error: null | string,
  status: "idle" | "pending" | "fulfilled" | "rejected",
  userList: UserInterface[],
  user:  UserInterface | null,
  searchTerm: string
}

const initialState: UserStateInterface = {
  error: null,
  status: "idle",
  userList: dataUsers as UserInterface[],
  user: null,
  searchTerm: '',
}

export const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    userListResetUser: (state) => {
      state.user = null;
    },
    userListSetUserSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(userListUpdateOneThunk.pending, (state) => {
      state.status = "pending";
    })
    .addCase(userListUpdateOneThunk.fulfilled, (state, action: PayloadAction<UserInterface[]>) => {
      state.userList = action.payload

      state.user = null;

      state.status = "fulfilled";
    })
    .addCase(userListUpdateOneThunk.rejected, (state) => {
      state.status = "rejected";
    })

    .addCase(userListReadOneThunk.pending, (state) => {
      state.status = "pending";
    })
    .addCase(userListReadOneThunk.fulfilled, (state, action: PayloadAction<UserInterface | null>) => {
      state.user = action.payload;

      state.status = "fulfilled";
    })
    .addCase(userListReadOneThunk.rejected, (state) => {
      state.status = "rejected";
    })

    .addCase(userListCanLoginThunk.pending, (state) => {
      state.status = "pending";
    })
    .addCase(userListCanLoginThunk.fulfilled, (state, action: PayloadAction<UserInterface | null>) => {
      state.user = action.payload;

      state.status = "fulfilled";
    })
    .addCase(userListCanLoginThunk.rejected, (state) => {
      state.status = "rejected";
    })

    .addCase(userListDeleteOneThunk.pending, (state) => {
      state.status = "pending";
    })
    .addCase(userListDeleteOneThunk.fulfilled, (state, action: PayloadAction<UserInterface[]>) => {
      state.user = null;
      state.userList = action.payload;

      state.status = "fulfilled";
    })
    .addCase(userListDeleteOneThunk.rejected, (state) => {
      state.status = "rejected";
    })

    .addCase(userListCreateOneThunk.pending, (state) => {
      state.status = "pending";
    })
    .addCase(userListCreateOneThunk.fulfilled, (state, action: PayloadAction<UserInterface[]>) => {
      state.userList = action.payload;

      state.user = null;

      state.status = "fulfilled";
    })
    .addCase(userListCreateOneThunk.rejected, (state) => {
      state.status = "rejected";
    })

    .addCase(userListReadListThunk.pending, (state) => {
      state.status = "pending";
    })
    .addCase(userListReadListThunk.fulfilled, (state, action: PayloadAction<UserInterface[]>) => {
      state.userList = action.payload;
      state.user = null;

      state.status = "fulfilled";
    })
    .addCase(userListReadListThunk.rejected, (state) => {
      state.status = "rejected";
    })
  }

})

export const { userListResetUser, userListSetUserSearchTerm } = userListSlice.actions;

export const userListStatusSelect = (state: RootState) => state.userList.status;
export const userListErrorSelect = (state: RootState) => state.userList.error;
export const userListUserListSelect = (state: RootState) => state.userList.userList;
export const userListUserSelect = (state: RootState) => state.userList.user;
export const userListSearchTermSelect = (state: RootState) => state.userList.searchTerm;