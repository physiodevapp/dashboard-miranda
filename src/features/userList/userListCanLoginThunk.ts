import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../../modelInterface";

const canLogin = async <T extends UserInterface>(email: string, password: string): Promise<T | null> => {

  const apiUrl = 'http://localhost:3000/login';
  const data = {
    email,
    password
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const token = response.headers.get('Authorization')?.split("Bearer ")[1];
    if (token) {
      localStorage.setItem('authToken', token);
    }
    const responseData: T = await response.json();
    
    return responseData;
    
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export const userListCanLoginThunk = createAsyncThunk<UserInterface | null, { email: string, password: string, list: UserInterface[] }, { rejectValue: string }>("userList/userListCanLogin", async ({email, password, list}, { rejectWithValue }) => {

  try {
    const user = await canLogin<UserInterface>(email, password);
    
    return user;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue(error as string);
    }
  }
})