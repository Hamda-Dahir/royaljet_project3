import React, { useState } from 'react';
import { updateEmployee } from '../api';
import { Form, Button } from 'react-bootstrap';

function UpdateEmployeeForm({ employee, onClose, onUpdate }) {
  const [updatedEmployeeData, setUpdatedEmployeeData] = useState({
    name: employee.name,
    phone: employee.phone,
    position: employee.position,
    salary:employee.salary,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedEmployeeData((prevEmployeeData) => ({
      ...prevEmployeeData,
      [name]: value,
    }));
  };

  const handleUpdateEmployee = async () => {
    try {
      const updatedEmployee = await updateEmployee(
        employee._id,
        updatedEmployeeData
      );
      onUpdate(updatedEmployee); // Notify the parent about the updated Employee
      onClose(); // Close the modal after updating the Employee
    } catch (error) {
      console.error('Error updating Employee:', error);
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
          value={updatedEmployeeData.name}
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
          value={updatedEmployeeData.phone}
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
          value={updatedEmployeeData.position}
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
          value={updatedEmployeeData.salary}
          onChange={handleInputChange}
          required
        />
      </Form.Group>


      <Button
        variant="primary"
        onClick={handleUpdateEmployee}
        className="mt-2 form-control rounded-10 w-100"
      >
        Update Employee
      </Button>
    </Form>
  );
}

export default UpdateEmployeeForm;
