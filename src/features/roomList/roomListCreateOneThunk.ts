

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from "../../modelInterface";

const createRoom = async <T extends RoomInterface>(room: T): Promise<T | null> => {

  const apiUrl = `http://localhost:3000/rooms`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(room), 
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

export const roomListCreateOneThunk = createAsyncThunk<void, { room: RoomInterface }>("roomList/roomListCreateOne", async ({room}) => {
  await createRoom(room);
})