import React from 'react';
import Header from '../../../Dashboard/Header';
import SidebarMenu from '../../../Dashboard/SidebarMenu';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  //   console.log(children);
  return (
    <div className="app-container">
      <Header />
      <div className="middle-section">
        <div className="sidebar">
          <SidebarMenu />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
