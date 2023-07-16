import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaFileAlt } from 'react-icons/fa';

function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

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

  const handleFilterChange = (e) => {
    const { value } = e.target;
    if (value === 'all') {
      setFilteredUsers(users);
    } else if (value === 'adults') {
      setFilteredUsers(users.filter((user) => user.age >= 18));
    } else if (value === 'minors') {
      setFilteredUsers(users.filter((user) => user.age < 18));
    }
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
            <div className="me-3">
              <span className="me-2">Filter:</span>
              <select className="form-select" onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="adults">Adults (18+)</option>
                <option value="minors">Minors</option>
              </select>
            </div>
            <Link to="/create" className="btn btn-success me-2">
              Add +
            </Link>
            <button className="btn btn-secondary">
              <FaFilter className="me-2" />
              Filters
            </button>
            <button className="btn btn-secondary ms-2">
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
