import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from './userListSlice';

const updateUser = (updateUser: UserInterface, list:UserInterface[]): Promise<UserInterface[]> => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(
        list.map((user: UserInterface) => {
          if (user.id === updateUser.id)
            return { ...updateUser }
      
          return user;
        })
      );
    }, 200);
  })
}

export const userListUpdateOneThunk = createAsyncThunk<UserInterface[], { user: UserInterface, list: UserInterface[] }>("userList/userListUpdateOne", async ({user, list}) => {
  const userList: UserInterface[] = await updateUser(user, list);

  return userList;
})