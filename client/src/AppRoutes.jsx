// AppRoutes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SidebarMenu from './Dashboard/SidebarMenu';
import Header from './Dashboard/Header';
import Stats from './stats/Stats';
import Users from './user/Users';

const AppRoutes = ({ userName }) => {
  return (
    <>
      <Header userName={userName} />
      <div className="middle-section">
        <div className="sidebar">
          <Routes>
            {/* Redirect to dashboard if the user is not authenticated */}
            <Route path="/home" element={<Navigate to="/dashboard" />} />
            {/* Dashboard route */}
            <Route path="/dashboard" element={<SidebarMenu />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/users" element={<Users />} />
            {/* Add more non-auth routes as needed */}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default AppRoutes;
