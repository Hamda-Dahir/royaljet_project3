import React, { useState } from 'react';
import { updateExpense } from '../api';
import { Form, Button } from 'react-bootstrap';

const UpdateExpenseForm = ({ expense, onClose, onUpdate }) => {
  const [updatedExpenseData, setUpdatedExpenseData] = useState({
    description: expense.description,
    amount: expense.amount,
    date: expense.date,
    category: expense.category,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedExpenseData((prevExpenseData) => ({
      ...prevExpenseData,
      [name]: value,
    }));
  };

  const handleUpdateExpense = async () => {
    try {
      const updatedExpense = await updateExpense(
        expense._id,
        updatedExpenseData
      );
      onUpdate(updatedExpense);
      onClose();
    } catch (error) {
      console.error('Error updating Expense:', error);
    }
  };

  return (
    <Form>
      <Form.Group controlId="formDesc">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          className="mt-2 form-control rounded-0 w-100"
          value={updatedExpenseData.description}
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
          value={updatedExpenseData.amount}
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
          value={updatedExpenseData.date}
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
          value={updatedExpenseData.category}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button
        variant="primary"
        onClick={handleUpdateExpense}
        className="mt-2 form-control rounded-10 w-100"
      >
        Update Expense
      </Button>
    </Form>
  );
};

export default UpdateExpenseForm;
