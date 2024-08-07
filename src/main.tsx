import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NoMatch } from "./components/NoMatch";
import { LoginPage } from "./pages/Login/LoginPage";
import { Layout } from "./pages/Layout/Layout";
import { DashboardPage } from "./pages/DashboardPage";
import { RoomListPage } from "./pages/RoomList/RoomListPage";
import { RoomPage } from "./pages/Room/RoomPage";
import { ContactListPage } from "./pages/Contacts/ContactListPage";
import { BookingListPage } from "./pages/BookingList/BookingListPage";
import { BookingPage } from "./pages/Booking/BookingPage";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { UserListPage } from "./pages/UserList/UserListPage";
import { UserPage } from "./pages/User/UserPage";

import 'animate.css';
import { FormModeProvider } from "./context/FormModeContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <FormModeProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<Layout/>}>
                <Route path="dashboard" element={<DashboardPage/>}/>
                <Route path="rooms" element={<RoomListPage/>}></Route>
                <Route path="rooms/new" element={<RoomPage/>}></Route>
                <Route path="rooms/:roomId" element={<RoomPage/>}></Route>
                <Route path="bookings" element={<BookingListPage/>}></Route>
                <Route path="bookings/:bookingId" element={<BookingPage/>}></Route>
                <Route path="contacts" element={<ContactListPage/>}></Route>
                <Route path="users" element={<UserListPage/>}></Route>
                <Route path="users/new" element={<UserPage/>}></Route>
                <Route path="users/:userId" element={<UserPage/>}></Route>
                <Route path="" element={<NoMatch/>}/>
                <Route path="*" element={<NoMatch/>}/>
              </Route>
              <Route path="" element={<NoMatch/>}/>
              <Route path="*" element={<NoMatch/>}/>
            </Routes>
          </FormModeProvider>
        </Provider> 
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
