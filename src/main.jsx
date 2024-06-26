import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./guards/PrivateRoute";
import { NoMatch } from "./guards/NoMatch";
import { LoginPage } from "./pages/Login/LoginPage";
import { HomePage } from "./pages/Home/HomePage";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>}>
            <Route path="dashboard" element={<PrivateRoute><DashboardPage/></PrivateRoute>}/>
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
