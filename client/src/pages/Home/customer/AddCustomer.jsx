import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import {createCustomer }from '../../../api';
import { Form, Button} from 'react-bootstrap';


const AddCustomerForm = ({onClose})=>{
    const navigate = useNavigate();
    const [newCustomerData, setNewCustomerData]= useState({
      fullname:'',
      phone:0,
      Address:'',
      OrderDetails:'',
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewCustomerData((prevCustomerData) => ({
          ...prevCustomerData,
          [name]: value,
        }));
      };
    
      const handleAddCustomer = async () => {
        try {
          await createCustomer(newCustomerData);
          onClose(); // Close the modal after adding a customer
          navigate('/home');
        } catch (error) {
         console.error('Error creating customer:',error);
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
              value={newCustomerData.fullname}
              placeholder="Enter fullname"
              onChange={handleInputChange}
              required
            />
          </Form.Group>
    
          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              name="phone"
              className="form-control rounded-0 w-100"
              value={newCustomerData.phone}
              placeholder="Enter phone number"
              onChange={handleInputChange}
              required
            />
        
    
          <Form.Group controlId="formaddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="Address"
              className="form-control rounded-0 w-100"
              value={newCustomerData.Address}
              placeholder="Enter detail"
              onChange={handleInputChange}
              required
            />
            
          </Form.Group>
          </Form.Group>
          <Form.Group controlId="formOrderDetails">
            <Form.Label>OrderDetails</Form.Label>
            <Form.Control
              type="text"
              name="OrderDetails"
              className="form-control rounded-0 w-100"
              value={newCustomerData.OrderDetails}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          

         
    
          <Button
            variant="primary"
            onClick={handleAddCustomer}
            className="mt-2 form-control rounded-10 w-100"
          >
            Add Customer
          </Button>
        </Form>
      );
    };
    
    export default AddCustomerForm;
    