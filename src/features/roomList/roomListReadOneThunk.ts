import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from "../../modelInterface";

const getRoom = async <T extends RoomInterface>(roomId: string): Promise<T | null> => {

  const apiUrl = `http://localhost:3000/rooms/${roomId}`;

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

export const roomListReadOneThunk = createAsyncThunk<RoomInterface | null, { id: string }>("roomList/roomListReadOne", async ({id}) => {
  const room = await getRoom<RoomInterface>(id);

  return room;
})