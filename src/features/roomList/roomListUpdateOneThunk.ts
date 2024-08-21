import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from "../../modelInterface";

const updateRoom = async <T extends RoomInterface>(updateRoom: T): Promise<T | null> => {

  const apiUrl = `http://localhost:3000/rooms/${updateRoom.id}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateRoom), 
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

export const roomListUpdateOneThunk = createAsyncThunk<void, { room: RoomInterface }>("roomList/roomListUpdateOne", async ({room}) => {
  await updateRoom(room);
})