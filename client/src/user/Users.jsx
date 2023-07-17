import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaFileAlt, FaPrint } from 'react-icons/fa';
import UserReport from './UserReport';
import './users.css';
import { getAllUsers, createUser, updateUser, deleteUser } from '../api';
import AddUserForm from './AddUser';
import { Modal, Button } from 'react-bootstrap';

function Users() {
  const [users, setUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [filterName, setFilterName] = useState('');
  const [filterAge, setFilterAge] = useState('');
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    age: 0,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleShowModal = () => {
    setShowAddUserModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setShowAddUserModal(false); // Close the modal
  };

  const handleAddUser = async (userData) => {
    try {
      await createUser(userData);
      handleCloseModal();
      fetchUsers(); // Refresh the list after adding a user
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setNewUserData((prevUserData) => ({
  //     ...prevUserData,
  //     [name]: value,
  //   }));
  // };

  // const handleCreateUser = async () => {
  //   try {
  //     const newUser = await createUser(newUserData);
  //     setUsers((prevUsers) => [...prevUsers, newUser]);
  //     setNewUserData({
  //       name: '',
  //       email: '',
  //       age: 0,
  //     });
  //   } catch (error) {
  //     console.error('Error creating user:', error);
  //   }
  // };

  const handleUpdateUser = async (userId) => {
    try {
      const updatedUser = await updateUser(userId, newUserData);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? updatedUser : user))
      );
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const usersData = await getAllUsers();
  //       setUsers(usersData);
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  // const handleDelete = (id) => {
  //   axios
  //     .delete(`http://localhost:5000/delete/${id}`)
  //     .then((res) => {
  //       console.log(res);
  //       window.location.reload();
  //     })
  //     .catch((err) => console.log(err));
  // };

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
              <Button variant="primary" onClick={handleShowModal}>
                Add User
              </Button>
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
                      // to={`/update/${user._id}`}
                      onClick={() => handleUpdateUser(user._id)}
                      className="btn btn-success me-2"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-danger"
                      // onClick={() => handleDelete(user._id)}
                      onClick={() => handleDeleteUser(user._id)}
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
          {/* Modal to display the "Add User" form */}
          <Modal show={showAddUserModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddUserForm
                onAddUser={handleAddUser}
                onClose={handleCloseModal}
              />
            </Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Users;
