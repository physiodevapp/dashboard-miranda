
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../../modelInterface";

const getUserList = async <T extends UserInterface>(): Promise<T[]> => {

  const apiUrl = 'http://localhost:3000/users';

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

    const responseData: T[] = await response.json();
    
    console.log('Success:', responseData);
    return responseData;
    
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export const userListReadListThunk = createAsyncThunk<UserInterface[]>("userList/userListReadList", async () => {
  const userList: UserInterface[] = await getUserList();

  return userList;
})