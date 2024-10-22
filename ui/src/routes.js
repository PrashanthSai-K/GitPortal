import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/login";
import UsersManage from "./Pages/UsersManage";

const RoutesComponent = () => {
  return ( // Added return statement here
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/user/dashboard" element={<Dashboard />} />

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<UsersManage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
