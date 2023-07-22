import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './user/Users';
import CreateUser from './user/CreateUser';
import UpdateUser from './user/UpdateUser';
import SidebarMenu from './Dashboard/SidebarMenu';
import Header from './Dashboard/Header';
import AddUser from './user/AddUser';
import Expenses from './expense/Expenses';
import AddExpense from './expense/AddExpense';
import Orders from './order/Orders';
import AddOrder from './order/AddOrder';
import Signup from './Signup';
import Login from './Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userName = 'Warsame'; // Replace this with the actual user name fetched from your data or state

  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />
          {isAuthenticated ? (
            <>
              <Header userName={userName} />
              <div className="middle-section">
                <div className="sidebar">
                  <SidebarMenu />
                </div>
                <div className="content">
                  <Routes>
                    <Route path="/dashboard" element={<SidebarMenu />} />
                    <Route path="/" element={<SidebarMenu />} />

                    <Route path="/orders" element={<Orders />} />
                    <Route path="/add-order" element={<AddOrder />} />
                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/add-expense" element={<AddExpense />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/add-user" element={<AddUser />} />
                    <Route path="/update/:id" element={<UpdateUser />} />
                  </Routes>
                </div>
              </div>
            </>
          ) : null}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
