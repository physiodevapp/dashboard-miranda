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
    console.log('Success: ', responseData);
    return responseData;  
    
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export const userListReadOneThunk = createAsyncThunk<UserInterface | null, { id: string }>("userList/userListReadOne", async ({id}) => {
  const user = await getUserByKey<UserInterface>(id);

  return user
})