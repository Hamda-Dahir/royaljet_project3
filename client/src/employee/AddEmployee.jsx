import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../api';
import { Form, Button } from 'react-bootstrap';

function AddEmployee({ onClose }) {
  const navigate = useNavigate();
  const [newEmployeeData, setNewEmployeeData] = useState({
    name: '',
    phone: 0,
    position: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmployeeData((prevEmployeeData) => ({
      ...prevEmployeeData,
      [name]: value,
    }));
  };

  const handleAddEmployee = async () => {
    try {
      await createEmployee(newEmployeeData);
      onClose(); // Close the modal after adding a Employee
      navigate('/employees');
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  return <div>AddEmployee</div>;
}

export default AddEmployee;
