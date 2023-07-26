import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ userName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <header
      className="header"
      style={{
        backgroundColor: '#000045',
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
        {/* <p style={{ margin: '3px 0' }}>Welcome, {userName}</p> */}
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
