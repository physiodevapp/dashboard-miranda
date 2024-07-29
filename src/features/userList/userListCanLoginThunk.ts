import { createAsyncThunk } from "@reduxjs/toolkit";
import { hashPassword } from '../../utils/hashPassword';
import { UserInterface } from "../../modelInterface";

const canLogin = <T extends UserInterface>(email: string, password: string, userList: T[]): Promise<T | null> => {
  return new Promise((resolve, rejected) => {
    setTimeout(async () => {
      const user = userList.find((user) => user.email === email) || null
      const isValid = await hashPassword(password, user?.password as string)

      if (isValid)
        resolve(user)
      else  
        rejected("Invalid password")

    }, 200);
  })
}

export const userListCanLoginThunk = createAsyncThunk<UserInterface | null, { email: string, password: string, list: UserInterface[] }, { rejectValue: string }>("userList/userListCanLogin", async ({email, password, list}, { rejectWithValue }) => {

  try {
    const user = await canLogin<UserInterface>(email, password, list);
    
    return user;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue(error as string);
    }
  }
})