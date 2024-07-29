import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingInterface, RoomInterface } from "../../modelInterface";

const getBooking = <T extends BookingInterface>(bookingId: string, bookingList: T[]): Promise<T | null> => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(bookingList.find((booking: T) => booking.id === bookingId) || null);
    }, 200);
  })
}

const getRoom = <T extends RoomInterface>(roomNumber: number, roomList: T[]): Promise<T | null> => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(roomList.find((room: T) => room.number === roomNumber) || null);
    }, 200);
  })
}

export const bookingListReadOneThunk = createAsyncThunk<BookingInterface | null, { id: string, list: BookingInterface[], roomList: RoomInterface[] }>("booking/bookingListReadOne", async ({id, list, roomList}) => {
  
  const booking = await getBooking<BookingInterface>(id, list);

  let bookingRoom
  if (booking)
    bookingRoom = await getRoom<RoomInterface>(booking.room_number, roomList);

  return booking 
  ? {
    ...booking, 
    room_details: bookingRoom
    }
  : null
})