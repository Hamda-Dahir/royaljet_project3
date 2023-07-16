// Header.js
import React from 'react';

const Header = ({ userName }) => {
  return (
    <header
      className="header"
      style={{ backgroundColor: '#333', color: '#fff', padding: '10px' }}
    >
      <h1>Dashboard Header</h1>
      <p>Welcome, {userName}</p>
    </header>
  );
};

export default Header;
