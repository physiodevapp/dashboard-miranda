
import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingInterface } from "../../modelInterface";

const deleteBooking = async <T extends BookingInterface>(bookingId: string): Promise<void | null> => {

  const apiUrl = `http://localhost:3000/bookings/${bookingId}`;

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

export const bookingListDeleteOneThunk = createAsyncThunk<void, { id: string }>("bookingList/bookingListDeleteOne", async ({id}) => {
  await deleteBooking(id);
})