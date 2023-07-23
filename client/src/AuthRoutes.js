import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './auth/Signup';
import Login from './auth/Login';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AuthRoutes;
