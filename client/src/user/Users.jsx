import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaFileAlt, FaPrint } from 'react-icons/fa';
import UserReport from './UserReport';
import './users.css';
import { getAllUsers } from '../api';

function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [filterName, setFilterName] = useState('');
  const [filterAge, setFilterAge] = useState('');

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:5000/usermodel')
  //     .then((result) => {
  //       setUsers(result.data);
  //       setFilteredUsers(result.data);
  //     })
  //     .catch((error) => {
  //       console.log('Error:', error);
  //       // Handle the error or show an error message to the user.
  //     });
  // }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/delete/${id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleFilterChange = () => {
    let filteredResults = users;

    if (filterName) {
      filteredResults = filteredResults.filter((user) =>
        user.name.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    if (filterAge) {
      filteredResults = filteredResults.filter((user) =>
        user.age.toString().includes(filterAge)
      );
    }

    setFilteredUsers(filteredResults);
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterAge('');
    setFilteredUsers(users);
  };

  // State to handle showing the printable report
  const [showReport, setShowReport] = useState(false);

  // Function to toggle the printable report
  const toggleReport = () => setShowReport(!showReport);

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container py-5">
      {showReport ? ( // If showReport is true, show the printable report
        <UserReport users={users} />
      ) : (
        <div className="bg-white rounded p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">Users</h2>
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center me-3">
                <span className="me-2">Name:</span>
                <input
                  type="text"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  className="form-control me-2"
                />
                <span className="me-2">Age:</span>
                <input
                  type="text"
                  value={filterAge}
                  onChange={(e) => setFilterAge(e.target.value)}
                  className="form-control"
                />
              </div>
              <button
                onClick={handleFilterChange}
                className="btn btn-primary me-2"
              >
                <FaFilter className="me-2" />
                Filter
              </button>
              <button
                onClick={handleResetFilter}
                className="btn btn-secondary me-2"
              >
                Reset
              </button>
              <Link to="/create" className="btn btn-success me-2">
                Add +
              </Link>
              <button className="btn btn-secondary">
                <FaFileAlt className="me-2" />
                Reports
              </button>
              <button className="btn btn-secondary me-2" onClick={toggleReport}>
                <FaPrint className="me-2" />
                Print
              </button>
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-success me-2"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav className="d-flex justify-content-center">
            <ul className="pagination">
              {Array.from({
                length: Math.ceil(filteredUsers.length / usersPerPage),
              }).map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? 'active' : ''
                  }`}
                >
                  <button
                    onClick={() => paginate(index + 1)}
                    className="page-link"
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Users;
