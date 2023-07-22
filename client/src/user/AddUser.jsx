import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../api';
import { Form, Button } from 'react-bootstrap';

const AddUserForm = ({ onClose }) => {
  const navigate = useNavigate();
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    try {
      await createUser(newUserData);
      onClose(); // Close the modal after adding a user
      navigate('/users');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <Form>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          className="mt-2 form-control rounded-0 w-100"
          value={newUserData.name}
          placeholder="Enter name"
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          className="mt-2 form-control rounded-0 w-100"
          value={newUserData.email}
          placeholder="Enter email"
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPass">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="text"
          name="password"
          className="mt-2 form-control rounded-0 w-100"
          value={newUserData.password}
          placeholder="Enter password"
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formRole">
        <Form.Label>Role</Form.Label>
        <Form.Control
          as="select" // If using a dropdown select, use "as='select'"
          name="role"
          className="mt-2 form-control rounded-0 w-100"
          value={newUserData.role}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </Form.Control>
      </Form.Group>

      <Button
        variant="primary"
        onClick={handleAddUser}
        className="mt-2 form-control rounded-10 w-100 mt-2"
      >
        Add User
      </Button>
    </Form>
  );
};

export default AddUserForm;
