
import { createAsyncThunk } from "@reduxjs/toolkit";

const deleteUser = async (userId: string): Promise<void | null> => {

  const apiUrl = `http://localhost:3000/users/${userId}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }  
    
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export const userListDeleteOneThunk = createAsyncThunk<void, { id: string }>("userList/userListDeleteOne", async ({id}) => {
  await deleteUser(id);
})