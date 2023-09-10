import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createExpense } from '../api';
import { Form, Button } from 'react-bootstrap';

const AddExpenseForm = ({ onClose }) => {
  const navigate = useNavigate();
  const [newExpenseData, setNewExpenseData] = useState({
    description: '',
    amount: '',
    date: '',
    category: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewExpenseData((prevExpenseData) => ({
      ...prevExpenseData,
      [name]: value,
    }));
  };

  const handleAddExpense = async () => {
    try {
      await createExpense(newExpenseData);
      onClose(); // Close the modal after adding a Expense
      navigate('/expenses');
    } catch (error) {
      console.error('Error creating expenses:', error);
    }
  };

  return (
    <Form>
      <Form.Group controlId="formName">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description" // should be "description"
          className="mt-2 form-control rounded-0 w-100"
          value={newExpenseData.description}
          placeholder="Enter description"
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formAmount">
        <Form.Label>Amount</Form.Label>
        <Form.Control
          type="number"
          name="amount"
          className="mt-2 form-control rounded-0 w-100"
          value={newExpenseData.amount}
          placeholder="Enter price"
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formDate">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          className="mt-2 form-control rounded-0 w-100"
          value={newExpenseData.date}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          name="category"
          className="mt-2 form-control rounded-0 w-100"
          value={newExpenseData.category}
          placeholder="Enter Category"
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button
        variant="primary"
        onClick={handleAddExpense}
        className="mt-2 form-control rounded-10 w-100"
      >
        Add Expense
      </Button>
    </Form>
  );
};

export default AddExpenseForm;
