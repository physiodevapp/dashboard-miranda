
import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInterface } from "../../modelInterface";

const createUser = async <T extends UserInterface>(user: T): Promise<T | null> => {

  const apiUrl = `http://localhost:3000/users`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user), 
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

export const userListCreateOneThunk = createAsyncThunk<void, { user: UserInterface }>("userList/userListCreateOne", async ({user}) => {
  await createUser(user);
})