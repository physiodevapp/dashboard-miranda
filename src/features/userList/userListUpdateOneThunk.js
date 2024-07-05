import { createAsyncThunk } from "@reduxjs/toolkit";

const updateUser = (updateUser, list) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(
        list.map((user) => {
          if (user.id === updateUser.id)
            return { ...updateUser }
      
          return user;
        })
      );
    }, 200);
  })
}

export const userListUpdateOneThunk = createAsyncThunk("userList/userListUpdateOne", async ({user, list}) => {
  const userList = await updateUser(user, list);

  return userList;
})