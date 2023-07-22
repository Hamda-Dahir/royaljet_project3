// App.js
import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import Stats from './stats/Stats';

function App() {
  const [count, setCount] = useState(0);
  const userName = 'Warsame'; // Replace this with the actual user name fetched from your data or state

  return (
    <div className="app-container">
      <BrowserRouter>
        <Header userName={userName} />
        <div className="middle-section">
          <div className="sidebar">
            <SidebarMenu />
          </div>
          <div className="content">
            <Routes>
              {/* <Route path="/" element={<Login />} /> */}
              <Route path="/" element={<Stats />} />
              <Route path="/dashboard" element={<SidebarMenu />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/orders" element={<Orders />}></Route>
              <Route path="/add-order" element={<AddOrder />}></Route>
              <Route path="/expenses" element={<Expenses />}></Route>
              <Route path="/add-expense" element={<AddExpense />} />
              <Route path="/users" element={<Users />}></Route>
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/update/:id" element={<UpdateUser />}></Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
