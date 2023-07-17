import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../api';

const AddUser = () => {
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
      navigate('/users'); // Redirect back to the Users page after adding a user
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <h1>Add User</h1>
      <input
        type="text"
        name="name"
        value={newUserData.name}
        placeholder="Name"
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        value={newUserData.email}
        placeholder="Email"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="age"
        value={newUserData.age}
        placeholder="Age"
        onChange={handleInputChange}
      />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
};

export default AddUser;
