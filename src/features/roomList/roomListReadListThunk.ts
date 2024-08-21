
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RoomInterface } from "../../modelInterface";

const getRoomList = async <T extends RoomInterface>(): Promise<T[]> => {
  const apiUrl = 'http://localhost:3000/rooms';

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

export const roomListReadListThunk = createAsyncThunk<RoomInterface[]>("roomList/roomListReadList", async () => {
  const roomList: RoomInterface[] = await getRoomList();

  return roomList;
})