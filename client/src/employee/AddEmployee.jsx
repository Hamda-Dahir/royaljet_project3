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
    salary:'',
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

  return (
    <Form>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          className="mt-2 form-control rounded-0 w-100"
          value={newEmployeeData.name}
          placeholder="Enter name"
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="number"
          name="phone"
          className="mt-2 form-control rounded-0 w-100"
          value={newEmployeeData.phone}
          placeholder="Enter phone number"
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPosi">
        <Form.Label>Position</Form.Label>
        <Form.Control
          type="text"
          name="position"
          className="mt-2 form-control rounded-0 w-100"
          value={newEmployeeData.position}
          placeholder="Enter employee title"
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPosi">
        <Form.Label>salary</Form.Label>
        <Form.Control
          type="number"
          name="salary"
          className="mt-2 form-control rounded-0 w-100"
          value={newEmployeeData.salary}
          placeholder="Enter employee title"
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button
        variant="primary"
        onClick={handleAddEmployee}
        className="mt-2 form-control rounded-10 w-100 mt-2"
      >
        Add Employee
      </Button>
    </Form>
  );
}

export default AddEmployee;
