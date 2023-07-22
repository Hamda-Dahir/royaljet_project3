import React, { useState } from 'react';
import { updateOrder } from '../api';
import { Form, Button } from 'react-bootstrap';

const UpdateOrderForm = ({ order, onClose, onUpdate }) => {
  const [updatedOrderData, setUpdatedOrderData] = useState({
    fullname: order.fullname,
    phone: order.phone,
    date: order.date,
    details: order.details,
    category: order.category,
    price: order.price,
    paymentType: order.paymentType,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedOrderData((prevOrderData) => ({
      ...prevOrderData,
      [name]: value,
    }));
  };

  const handleUpdateOrder = async () => {
    try {
      const updatedOrder = await updateOrder(order._id, updatedOrderData);
      onUpdate(updatedOrder);
      onClose();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <Form>
      <Form.Group controlId="formName">
        <Form.Label>FullName</Form.Label>
        <Form.Control
          type="text"
          name="fullname"
          value={updatedOrderData.fullname}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="number"
          name="phone"
          value={updatedOrderData.phone}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formDate">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={updatedOrderData.dadte}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formDetails">
        <Form.Label>Detail</Form.Label>
        <Form.Control
          type="text"
          name="details"
          value={updatedOrderData.details}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          name="category"
          value={updatedOrderData.category}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPrice">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={updatedOrderData.price}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPayment">
        <Form.Label>PaymentType</Form.Label>
        <Form.Control
          type="text"
          name="paymentType"
          value={updatedOrderData.paymentType}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant="primary" onClick={handleUpdateOrder}>
        Update Order
      </Button>
    </Form>
  );
};

export default UpdateOrderForm;
