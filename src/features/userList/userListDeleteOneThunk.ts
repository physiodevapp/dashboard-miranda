
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../../modelInterface";

const deleteUser = (userId: string, userList: UserInterface[]): Promise<UserInterface[]> => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(userList.filter((user) => user.id !== userId));
    }, 200);
  })
}

export const userListDeleteOneThunk = createAsyncThunk<UserInterface[], { id: string, list: UserInterface[] }>("userList/userListDeleteOne", async ({id, list}) => {
  const userList: UserInterface[] =  await deleteUser(id, list);
  
  return userList;
})