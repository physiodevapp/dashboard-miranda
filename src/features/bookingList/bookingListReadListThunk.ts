import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingInterface } from "../../modelInterface";

const getBookingList = async <T extends BookingInterface>(): Promise<T[]> => {

  const apiUrl = 'http://localhost:3000/bookings';

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

export const bookingListReadListThunk = createAsyncThunk<BookingInterface[]>("bookingList/bookingListReadList", async () => {
  const bookingList: BookingInterface[] = await getBookingList();

  return bookingList;
})