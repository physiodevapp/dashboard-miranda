import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../../modelInterface";

const updateUser = async <T extends UserInterface>(updateUser: T): Promise<T | null> => {

  const apiUrl = `http://localhost:3000/users/${updateUser.id}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateUser), 
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

export const userListUpdateOneThunk = createAsyncThunk<void, { user: UserInterface }>("userList/userListUpdateOne", async ({user}) => {
  await updateUser(user);
})