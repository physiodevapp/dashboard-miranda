import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../../app/store';
import { userListReadListThunk } from "./userListReadListThunk";
import { userListUpdateOneThunk } from "./userListUpdateOneThunk";
import { userListReadOneThunk } from "./userListReadOneThunk";
import { userListDeleteOneThunk } from "./userListDeleteOneThunk";
import { userListCreateOneThunk } from "./userListCreateOneThunk";
import { userListCanLoginThunk } from "./userListCanLoginThunk";
import { UserInterface } from "../../modelInterface";

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
  userList: [] as UserInterface[],
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
    },
    resetUserStatusError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(userListUpdateOneThunk.pending, (state) => {
      state.status = "pending";
    })
    .addCase(userListUpdateOneThunk.fulfilled, (state) => {
      state.user = null;

      state.status = "fulfilled";
    })
    .addCase(userListUpdateOneThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.status = "rejected";

      state.error = action.payload || 'An unknown error occurred';
    })

    .addCase(userListReadOneThunk.pending, (state) => {
      state.status = "pending";
    })
    .addCase(userListReadOneThunk.fulfilled, (state, action: PayloadAction<UserInterface | null>) => {
      state.user = action.payload;

      state.status = "fulfilled";
    })
    .addCase(userListReadOneThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.status = "rejected";

      state.error = action.payload || 'An unknown error occurred';
    })

    .addCase(userListCanLoginThunk.pending, (state) => {
      state.status = "pending";
    })
    .addCase(userListCanLoginThunk.fulfilled, (state, action: PayloadAction<UserInterface | null>) => {
      state.user = action.payload;

      state.status = "fulfilled";
    })
    .addCase(userListCanLoginThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.status = "rejected";
      state.error = action.payload || 'An unknown error occurred';
    })

    .addCase(userListDeleteOneThunk.pending, (state) => {
      state.status = "pending";
    })
    .addCase(userListDeleteOneThunk.fulfilled, (state, action: PayloadAction<UserInterface>) => {
      state.userList = state.userList.filter((user) => user.id !== action.payload.id);

      state.user = null;

      state.status = "fulfilled";
    })
    .addCase(userListDeleteOneThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.status = "rejected";

      state.error = action.payload || 'An unknown error occurred';
    })

    .addCase(userListCreateOneThunk.pending, (state) => {
      state.status = "pending";
    })
    .addCase(userListCreateOneThunk.fulfilled, (state) => {
      state.user = null;

      state.status = "fulfilled";
    })
    .addCase(userListCreateOneThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.status = "rejected";

      state.error = action.payload || 'An unknown error occurred';
    })

    .addCase(userListReadListThunk.pending, (state) => {
      state.status = "pending";
    })
    .addCase(userListReadListThunk.fulfilled, (state, action: PayloadAction<UserInterface[]>) => {
      state.userList = action.payload;
      state.user = null;

      state.status = "fulfilled";
    })
    .addCase(userListReadListThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.status = "rejected";

      state.error = action.payload || 'An unknown error occurred';
    })
  }

})

export const { userListResetUser, userListSetUserSearchTerm, resetUserStatusError } = userListSlice.actions;

export const userListStatusSelect = (state: RootState) => state.userList.status;
export const userListErrorSelect = (state: RootState) => state.userList.error;
export const userListUserListSelect = (state: RootState) => state.userList.userList;
export const userListUserSelect = (state: RootState) => state.userList.user;
export const userListSearchTermSelect = (state: RootState) => state.userList.searchTerm;