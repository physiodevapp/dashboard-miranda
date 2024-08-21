import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../../modelInterface";

const getUserByKey = async <T extends UserInterface>(userValue: string): Promise<T | null> => {

  const apiUrl = `http://localhost:3000/users/${userValue}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData: T = await response.json();
    
    return responseData;  
    
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export const userListReadOneThunk = createAsyncThunk<UserInterface | null, { value: string }>("userList/userListReadOne", async ({value}) => {
  const user = await getUserByKey<UserInterface>(value);

  return user
})