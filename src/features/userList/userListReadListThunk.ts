
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../../modelInterface";

const getUserList = (roomList: UserInterface[]): Promise<UserInterface[]> => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(roomList);
    }, 200);
  })
}

export const userListReadListThunk = createAsyncThunk<UserInterface[], { list: UserInterface[] }>("userList/userListReadList", async ({list}) => {
  const userList: UserInterface[] = await getUserList(list);

  return userList;
})