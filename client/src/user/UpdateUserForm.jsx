import React, { useState } from 'react';
import { updateUser } from '../api';
import { Form, Button } from 'react-bootstrap';

const UpdateUserForm = ({ user, onClose, onUpdate }) => {
  const [updatedUserData, setUpdatedUserData] = useState({
    name: user.name,
    email: user.email,
    password: user.password,
    role: user.role,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
    try {
      const updatedUser = await updateUser(user._id, updatedUserData);
      onUpdate(updatedUser); // Notify the parent about the updated user
      onClose(); // Close the modal after updating the user
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Form>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={updatedUserData.name}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={updatedUserData.email}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPass">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="text"
          name="password"
          value={updatedUserData.password}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formRole">
        <Form.Label>Role</Form.Label>
        <Form.Control
          as="select" // If using a dropdown select, use "as='select'"
          name="role"
          value={updatedUserData.role}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </Form.Control>
      </Form.Group>

      <Button variant="primary" onClick={handleUpdateUser}>
        Update User
      </Button>
    </Form>
  );
};

export default UpdateUserForm;
