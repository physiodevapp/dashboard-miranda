import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NoMatch } from "./guards/NoMatch";
import { LoginPage } from "./pages/Login/LoginPage";
import { Layout } from "./pages/Layout/Layout";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { RoomsPage } from "./pages/Rooms/RoomsPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout/>}>
            <Route path="dashboard" element={<DashboardPage/>}/>
            <Route path="rooms" element={<RoomsPage/>}></Route>
            <Route exact path="" element={<NoMatch/>}/>
            <Route path="*" element={<NoMatch/>}/>
          </Route>
          <Route exact path="" element={<NoMatch/>}/>
          <Route path="*" element={<NoMatch/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
