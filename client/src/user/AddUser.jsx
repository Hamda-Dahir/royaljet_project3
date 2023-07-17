import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../api';
import { Form, Button } from 'react-bootstrap'; // Import the Form and Button components

const AddUserForm = ({ onClose }) => {
  const navigate = useNavigate();
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    age: 0,
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
          value={newUserData.email}
          placeholder="Enter email"
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formAge">
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="number"
          name="age"
          value={newUserData.age}
          placeholder="Enter age"
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant="primary" onClick={handleAddUser}>
        Add User
      </Button>
    </Form>
  );
};

export default AddUserForm;
