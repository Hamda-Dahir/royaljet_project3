import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../api';
import { Form, Button } from 'react-bootstrap';

const AddOrderForm = ({ onClose }) => {
  const navigate = useNavigate();
  const [newOrderData, setNewOrderData] = useState({
    fullname: '',
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
          name="fullname" // should be "description"
          className="form-control rounded-0 w-100"
          value={newOrderData.fullname}
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
          className="form-control rounded-0 w-100"
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
          className="form-control rounded-0 w-100"
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
          className="form-control rounded-0 w-100"
          value={newOrderData.details}
          placeholder="Enter detail"
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          name="category"
          className="form-control rounded-0 w-100"
          value={newOrderData.category}
          placeholder="Enter Category"
          onChange={handleInputChange}
          required
        >
          <option value="">Select Category</option>
          <option value="indoor">Indoor</option>
          <option value="outdoor">Outdoor</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formCategory">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          name="price"
          className="form-control rounded-0 w-100"
          value={newOrderData.price}
          placeholder="Enter price"
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formCategory">
        <Form.Label>Payment Type</Form.Label>
        <Form.Control
          as="select"
          name="paymentType"
          className="form-control rounded-0 w-100"
          value={newOrderData.paymentType}
          placeholder="Enter payment type"
          onChange={handleInputChange}
          required
        >


        <option value="">select payment Type</option>
        <option value="">Zaad</option>
        <option value="">Edahab</option>
        <option value="">Cash</option>
       </Form.Control>
      </Form.Group>

      <Button
        variant="primary"
        onClick={handleAddOrder}
        className="mt-2 form-control rounded-10 w-100"
      >
        Add Order
      </Button>
    </Form>
  );
};

export default AddOrderForm;
