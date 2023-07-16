import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './user/Users';
import CreateUser from './user/CreateUser';
import UpdateUser from './user/UpdateUser';
import SidebarMenu from './Dashboard/SidebarMenu';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      <BrowserRouter>
        <div className="sidebar">
          <SidebarMenu />
        </div>
        <div className="content">
          <Routes>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/create" element={<CreateUser />}></Route>
            <Route path="/update/:id" element={<UpdateUser />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
