
import { createAsyncThunk } from "@reduxjs/toolkit";

const deleteRoom = async (roomId: string): Promise<void | null> => {

  const apiUrl = `http://localhost:3000/rooms/${roomId}`;

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

export const roomListDeleteOneThunk = createAsyncThunk<void, { id: string }>("roomList/roomListDeleteOne", async ({id}) => {
  await deleteRoom(id,);
})