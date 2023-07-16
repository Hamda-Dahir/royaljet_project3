import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaFileAlt } from 'react-icons/fa';
import './users.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [filterName, setFilterName] = useState('');
  const [filterAge, setFilterAge] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001')
      .then((result) => {
        setUsers(result.data);
        setFilteredUsers(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
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

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container py-5">
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
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id}>
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
    </div>
  );
}

export default Users;
