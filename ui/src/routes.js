import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/login";
import UsersManage from "./Pages/UsersManage";
import Project from "./Pages/Project";
import Settings from "./Pages/Settings";
import Leaderboard from "./Pages/Leaderboard";

const RoutesComponent = () => {
  return ( // Added return statement here
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/user/dashboard" element={<Dashboard />} />

        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/projects" element={<Project />} />
        <Route path="/admin/users" element={<UsersManage />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/leaderboard" element={<Leaderboard />} />

      </Routes>
    </BrowserRouter>
  );
};

export default RoutesComponent;
