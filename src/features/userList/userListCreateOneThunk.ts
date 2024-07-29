
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../../modelInterface";

const createUser = (user: UserInterface, list: UserInterface[]): Promise<UserInterface[]> => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve([...list, user])
    }, 200);
  })
}

export const userListCreateOneThunk = createAsyncThunk<UserInterface[], { user: UserInterface, list: UserInterface[] }>("userList/userListCreateOne", async ({user, list}) => {
  const userList: UserInterface[] = await createUser(user, list);

  return userList;
})