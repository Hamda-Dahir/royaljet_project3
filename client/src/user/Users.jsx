import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaFileAlt, FaPrint } from 'react-icons/fa';
import UserReport from './UserReport';
import './users.css';
import { getAllUsers, createUser, updateUser, deleteUser } from '../api';
import AddUserForm from './AddUser';
import UpdateUserForm from './UpdateUserForm';
import { Modal, Button, Form } from 'react-bootstrap';

function Users() {
  const [users, setUsers] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  // const [filteredUsers, setFilteredUsers] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);
  const [filterName, setFilterName] = useState('');
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleShowUpdateModal = (user) => {
    setSelectedUser(user);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedUser(null);
    setShowUpdateModal(false);
  };

  const handleUpdateUser = (updatedUser) => {
    // Update the state with the updated user data
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
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
      fetchUsers(); // Fetch users again after adding a new user
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

  // const handleUpdateUser = async (userId) => {
  //   try {
  //     const updatedUser = await updateUser(userId, newUserData);
  //     setUsers((prevUsers) =>
  //       prevUsers.map((user) => (user._id === userId ? updatedUser : user))
  //     );
  //   } catch (error) {
  //     console.error('Error updating user:', error);
  //   }
  // };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // filter by name

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filterName.toLowerCase())
  );

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

  // const handleFilterChange = () => {
  //   let filteredResults = users;

  //   if (filterName) {
  //     filteredResults = filteredResults.filter((user) =>
  //       user.name.toLowerCase().includes(filterName.toLowerCase())
  //     );
  //   }

  //   if (filterAge) {
  //     filteredResults = filteredResults.filter((user) =>
  //       user.age.toString().includes(filterAge)
  //     );
  //   }

  //   setFilteredUsers(filteredResults);
  // };

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
            <h2 className="mb-0">Users Data</h2>
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center me-3">
                <span className="me-2">Search: </span>
                <input
                  type="text"
                  value={filterName}
                  onChange={handleFilterChange}
                  placeholder="Filter by name..."
                  className="form-control me-2"
                />
              </div>
              {/* <Link to="/create" className="btn btn-success me-2">
                Add +
              </Link> */}
              <Button
                className="me-2"
                variant="success"
                onClick={handleShowModal}
              >
                Add User
              </Button>
              <button className="btn btn-secondary me-2" onClick={toggleReport}>
                <FaFileAlt className="me-2" />
                Report
              </button>
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{(currentPage - 1) * usersPerPage + index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {/* <Link
                      onClick={() => handleUpdateUser(user._id)}
                      className="btn btn-success me-2"
                    >
                      Update
                    </Link> */}
                    <Button
                      className="me-2"
                      variant="info"
                      onClick={() => handleShowUpdateModal(user)}
                    >
                      Edit
                    </Button>
                    <button
                      className="btn btn-danger "
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

          {/* edit modal */}

          <Modal
            show={showUpdateModal}
            onHide={handleCloseUpdateModal}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Update User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedUser && (
                <UpdateUserForm
                  user={selectedUser}
                  onUpdate={handleUpdateUser}
                  onClose={handleCloseUpdateModal}
                />
              )}
            </Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Users;
