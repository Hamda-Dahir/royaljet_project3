import React, { useState } from 'react';
import { updateCustomer } from '../api';
import { Form, Button } from 'react-bootstrap';

function UpdateCustomerForm({ customer, onClose, onUpdate }) {
  const [updatedCustomerData, setUpdatedCustomerData] = useState({
    fullname: customer.fullname,
    phone: customer.phone,
    Address: customer.Address,
    OrderDetails: customer.OrderDetails,
    status: customer.status,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedCustomerData((prevCustomerData) => ({
      ...prevCustomerData,
      [name]: value,
    }));
  };

  const handleUpdateCustomer = async () => {
    try {
      const updatedCustomer = await updateCustomer(
        customer._id,
        updatedCustomerData
      );
      onUpdate(updatedCustomer); // Notify the parent about the updated Customer
      onClose(); // Close the modal after updating the Customer
    } catch (error) {
      console.error('Error updating Customer:', error);
    }
  };

  return (
    <Form>
      <Form.Group controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="fullname"
          className="mt-2 form-control rounded-0 w-100"
          value={updatedCustomerData.fullname}
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
          value={updatedCustomerData.phone}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formPosi">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          name="Address"
          className="mt-2 form-control rounded-0 w-100"
          value={updatedCustomerData.Address}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formPosi">
        <Form.Label>OrderDetails</Form.Label>
        <Form.Control
          type="text"
          name="OrderDetails"
          className="mt-2 form-control rounded-0 w-100"
          value={updatedCustomerData.OrderDetails}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formStatus">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          name="status"
          className="mt-2 form-control rounded-0 w-100"
          value={updatedCustomerData.status}
          onChange={handleInputChange}
          required
        >
          {/* <option value="">Select option</option> */}
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
        </Form.Control>
      </Form.Group>

      <Button
        variant="primary"
        onClick={handleUpdateCustomer}
        className="mt-2 form-control rounded-10 w-100"
      >
        Update Customer
      </Button>
    </Form>
  );
}

export default UpdateCustomerForm;
