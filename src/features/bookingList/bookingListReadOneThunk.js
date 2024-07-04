import { createAsyncThunk } from "@reduxjs/toolkit";

const getBooking = (bookingId, bookingList) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(bookingList.find((booking) => booking.id === bookingId));
    }, 200);
  })
}

const getRoom = (roomNumber, roomList) => {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(roomList.find((room) => room.number === roomNumber));
    }, 200);
  })
}

export const bookingListReadOneThunk = createAsyncThunk("booking/bookingListReadOne", async ({id, list, roomList}) => {
  const booking = await getBooking(id, list);

  const bookingRoom = await getRoom(booking.room_number, roomList);

  return {
    ...booking,
    room_details: bookingRoom
  };
})