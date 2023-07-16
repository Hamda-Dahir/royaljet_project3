// Header.js
import { left } from '@popperjs/core';
import React from 'react';

const Header = ({ userName }) => {
  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clearing the user session or state
    console.log('Logged out');
  };

  return (
    <header
      className="header"
      style={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          marginLeft: '500px',
        }}
      >
        <h3 style={{ margin: 0 }}>Royal Jet Management System</h3>
        <p style={{ margin: '3px 0' }}>Welcome, {userName}</p>
      </div>
      <button
        style={{
          backgroundColor: '#555',
          color: '#fff',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
