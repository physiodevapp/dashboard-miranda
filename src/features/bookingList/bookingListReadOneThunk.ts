import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingInterface  } from "../../modelInterface";

const getBooking = async <T extends BookingInterface>(bookingId: string): Promise<T | null> => {

  const apiUrl = `http://localhost:3000/bookings/${bookingId}`;

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

export const bookingListReadOneThunk = createAsyncThunk<BookingInterface | null, { id: string }>("booking/bookingListReadOne", async ({id}) => {
  
  const booking = await getBooking<BookingInterface>(id);

  console.log('booking ', booking);

  return booking || null
})