import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../api';
import { Form, Button } from 'react-bootstrap';

const AddOrderForm = ({ onClose }) => {
  const navigate = useNavigate();
  const [newOrderData, setNewOrderData] = useState({
    fullName: '',
    phone: 0,
    date: '',
    details: '',
    category: '',
    price: 0,
    paymentType: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewOrderData((prevOrderData) => ({
      ...prevOrderData,
      [name]: value,
    }));
  };

  const handleAddOrder = async () => {
    try {
      await createOrder(newOrderData);
      onClose(); // Close the modal after adding a Order
      navigate('/orders');
    } catch (error) {
      console.error('Error creating orders:', error);
    }
  };

  return (
    <Form>
      <Form.Group controlId="formName">
        <Form.Label>FullName</Form.Label>
        <Form.Control
          type="text"
          name="fullName" // should be "description"
          value={newOrderData.fullName}
          placeholder="Enter fullname"
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formAmount">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="number"
          name="phone"
          value={newOrderData.phone}
          placeholder="Enter phone number"
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formDate">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={newOrderData.date}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formCategory">
        <Form.Label>Detail</Form.Label>
        <Form.Control
          type="text"
          name="details"
          value={newOrderData.details}
          placeholder="Enter detail"
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          name="category"
          value={newOrderData.category}
          placeholder="Enter Category"
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formCategory">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={newOrderData.price}
          placeholder="Enter price"
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formCategory">
        <Form.Label>Payment Type</Form.Label>
        <Form.Control
          type="text"
          name="paymentType"
          value={newOrderData.paymentType}
          placeholder="Enter payment type"
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant="primary" onClick={handleAddOrder}>
        Add Order
      </Button>
    </Form>
  );
};

export default AddOrderForm;
