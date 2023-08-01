import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createCustomer } from '../../api';
import AddCustomerForm from './customer/AddCustomer';
const Home = () => {
    const [customers, setCustomers] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [customersPerPage] = useState(8);
    const [filterName, setFilterName] = useState('');
    const [newCustomerData, setNewCustomerData] = useState({
      fullname: '',
      phone: 0,
      Address: '',
      OrderDetails: '',
      status: '',
    });

  const handleShowModal = () => {
    setShowAddCustomerModal(true); // Open the modal
  };
  const handleCloseModal = () => {
    setShowAddCustomerModal(false); // Close the modal
  };
  const handleAddCustomer = async (customerData) => {
    try {
      await createCustomer(customerData);
      handleCloseModal();
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };
  return (
    <div>
      <div className="bg-green-300 h-screen w-full">
        <h1>Welcome to royal jet</h1>
        <Button className="me-2" variant="success" onClick={handleShowModal}>
          Order Design 
        </Button>
      </div>
      {/* Modal to display the "Add Emp" form */}
      <Modal show={showAddCustomerModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddCustomerForm
            onAddCustomer={handleAddCustomer}
            onClose={handleCloseModal}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default Home;