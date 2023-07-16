import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './user/Users';
import CreateUser from './user/CreateUser';
import UpdateUser from './user/UpdateUser';
import SidebarMenu from './Dashboard/SidebarMenu';
import Header from './Dashboard/Header';

function App() {
  const [count, setCount] = useState(0);
  const userName = 'John Doe'; // Replace this with the actual user name fetched from your data or state

  return (
    <div className="app-container">
      <BrowserRouter>
        <Header userName={userName} /> {/* Pass the userName prop */}
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
