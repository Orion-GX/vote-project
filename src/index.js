import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ManagePresident from "./Pages/managePresident";
import ManageStudent from "./Pages/manageStudent";
import AuthAdmin from "./Pages/authAdmin";
import HomeAdmin from "./Pages/homeAdmin";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthAdmin />} />
      <Route path="/home" element={<AuthAdmin />} />
      <Route path="/homeAdmin" element={<HomeAdmin />} />
      <Route path="/student" element={<ManageStudent />} />
      <Route path="/president" element={<ManagePresident />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
