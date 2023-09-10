import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaFileAlt, FaPrint } from 'react-icons/fa';
import CustomerReport from './CustomerReport';
import './Customers.css';
import {
  getAllCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../api';
import AddCustomerForm from './AddCustomer';
import UpdateCustomerForm from './UpdateCustomerForm';
import { Modal, Button, Form } from 'react-bootstrap';

function Customers() {
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

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getAllCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleShowUpdateModal = (customer) => {
    setSelectedCustomer(customer);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedCustomer(null);
    setShowUpdateModal(false);
  };

  const handleUpdateCustomer = (updatedCustomer) => {
    // Update the state with the updated emp data
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer._id === updatedCustomer._id ? updatedCustomer : customer
      )
    );
  };

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
      fetchCustomers(); // Fetch employees again after adding a new user
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      await deleteCustomer(customerId);
      setCustomers((prevCustomers) =>
        prevCustomers.filter((customer) => customer._id !== customerId)
      );
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  // filter by name

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.fullname.toLowerCase().includes(filterName.toLowerCase())
  );

  // State to handle showing the printable report
  const [showReport, setShowReport] = useState(false);

  // Function to toggle the printable report
  const toggleReport = () => setShowReport(!showReport);

  // Pagination
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container py-5">
      {showReport ? ( // If showReport is true, show the printable report
        <CustomerReport customers={customers} />
      ) : (
        <div className="bg-white rounded p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">Customers Data</h2>
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center me-3">
                <span className="me-2">Search: </span>
                <input
                  type="text"
                  value={filterName}
                  onChange={handleFilterChange}
                  placeholder="Filter by name..."
                  className="form-control me-2"
                />
              </div>
              {/* <Link to="/create" className="btn btn-success me-2">
              Add +
            </Link> */}
              {/* <Button
                className="me-2"
                variant="success"
                onClick={handleShowModal}
              >
                Add Customer
              </Button> */}
              {/* <button className="btn btn-secondary me-2" onClick={toggleReport}>
                <FaFileAlt className="me-2" />
                Report
              </button> */}
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>OrderDetails</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map((customer, index) => (
                <tr key={customer._id}>
                  <td>{(currentPage - 1) * customersPerPage + index + 1}</td>
                  <td>{customer.fullname}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.Address}</td>
                  <td>{customer.OrderDetails}</td>
                  <td >{customer.status}</td>
                  <td>
                    <Button
                      className="me-2"
                      variant="info"
                      onClick={() => handleShowUpdateModal(customer)}
                    >
                      Edit
                    </Button>
                    <button
                      className="btn btn-danger "
                      onClick={() => handleDeleteCustomer(customer._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav className="d-flex justify-content-center">
            <ul className="pagination">
              {Array.from({
                length: Math.ceil(filteredCustomers.length / customersPerPage),
              }).map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? 'active' : ''
                  }`}
                >
                  <button
                    onClick={() => paginate(index + 1)}
                    className="page-link"
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
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

          {/* edit modal */}

          <Modal
            show={showUpdateModal}
            onHide={handleCloseUpdateModal}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Update Customer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedCustomer && (
                <UpdateCustomerForm
                  customer={selectedCustomer}
                  onUpdate={handleUpdateCustomer}
                  onClose={handleCloseUpdateModal}
                />
              )}
            </Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Customers;
