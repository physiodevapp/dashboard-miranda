export interface UserInterface {
  [key: string]: any;
  id: string,
  first_name: string,
  last_name: string,
  photo: string,
  start_date: string,
  job_description: string,
  telephone: string,
  status: "active" | "inactive",
  job: "Manager" | "Reservation desk" | "Room service",
  password: string,
  email: string,
}

export interface RoomInterface {
  [key: string]: any,
  id: string,
  number: number,
  description: string,
  has_offer: boolean,
  facilities: string[],
  name: string,
  cancellation_policy: string,
  type: string,
  price_night: number,
  discount: number,
  status: "available" | "booked",
  photos: string[],
}

export interface ContactInterface {
  [key: string]: any;
  id: string,
  status: "" | "published" | "archived",
  first_name: string,
  last_name: string,
  email: string,
  phone: string,
  subject: string,
  message: string,
  datetime: string,
}

export interface BookingInterface {
  [key: string]: any;
  id: string,
  first_name: string,
  last_name: string,
  order_date: string,
  check_in: string,
  check_out: string,
  room_type: "Single Bed" | "Double Bed" | "Double Superior" | "Suite",
  room_number: number,
  status: "check_in" | "check_out" | "in_progress",
  special_request: string,
  room_details?: RoomInterface | null
} 

