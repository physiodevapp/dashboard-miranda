import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingInterface } from './bookingListSlice';
import { RoomInterface } from '../roomList/roomListSlice';

const getBooking = (bookingId: string, bookingList: BookingInterface[]): Promise<BookingInterface | undefined> => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(bookingList.find((booking: BookingInterface) => booking.id === bookingId));
    }, 200);
  })
}

const getRoom = (roomNumber: number, roomList: RoomInterface[]): Promise<RoomInterface | undefined> => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(roomList.find((room: RoomInterface) => room.number === roomNumber));
    }, 200);
  })
}

export const bookingListReadOneThunk = createAsyncThunk<BookingInterface | undefined, { id: string, list: BookingInterface[], roomList: RoomInterface[] }>("booking/bookingListReadOne", async ({id, list, roomList}) => {
  
  const booking: BookingInterface | undefined = await getBooking(id, list);

  let bookingRoom: RoomInterface | undefined
  if (booking)
    bookingRoom = await getRoom(booking.room_number, roomList);

  return booking 
  ? {
    ...(booking || undefined), 
    room_details: bookingRoom
    }
  : undefined
})