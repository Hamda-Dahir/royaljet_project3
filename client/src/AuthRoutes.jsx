// AuthRoutes.js
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';
import SidebarMenu from './Dashboard/SidebarMenu';

const AuthRoutes = () => {
  const navigate = useNavigate();

  // Function to handle login and redirect to the dashboard
  const handleLogin = (email, password) => {
    // Replace this with your actual login authentication logic
    // Example: If login is successful, navigate to '/dashboard'
    if (email === 'sample@example.com' && password === 'password') {
      navigate('/dashboard');
    } else {
      // If login fails, show an error or take appropriate action
      console.log('Login failed.');
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={handleLogin} />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<SidebarMenu />} />
    </Routes>
  );
};

export default AuthRoutes;
