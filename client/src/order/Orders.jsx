import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaFilter, FaFileAlt } from 'react-icons/fa';
import OrderReport from './OrderReport';
import './orders.css';
import { getAllOrders, createOrder, updateOrder, deleteOrder } from '../api';
import AddOrderForm from './AddOrder';
import UpdateOrderForm from './UpdateOrderForm';
import { Modal, Button, Form } from 'react-bootstrap';
import OrderInvoiceModal from './OrderInvoiceModal';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(8);
  const [filterName, setFilterName] = useState('');
  const [newOrderData, setNewOrderData] = useState({
    fullname: '',
    phone: 0,
    date: '',
    details: '',
    category: '',
    price: '',
    paymentType: '',
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const handleShowInvoiceModal = (order) => {
    setSelectedOrder(order);
    setShowInvoiceModal(true);
  };

  const handleCloseInvoiceModal = () => {
    setShowInvoiceModal(false);
  };

  // Function to handle printing the order invoice
  const handlePrintInvoice = () => {
    window.print();
  };

  const handleShowUpdateModal = (order) => {
    setSelectedOrder(order);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedOrder(null);
    setShowUpdateModal(false);
  };

  const handleUpdateOrder = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === updatedOrder._id ? updatedOrder : order
      )
    );
  };

  const handleShowModal = () => {
    setShowAddOrderModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setShowAddOrderModal(false); // Close the modal
  };

  const handleAddOrder = async (orderData) => {
    try {
      await createOrder(orderData);
      handleCloseModal();
      fetchOrders(); // Fetch orders again after adding a new expense
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  // filter by name

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  const filteredOrders = orders.filter((order) =>
    order.details.toLowerCase().includes(filterName.toLowerCase())
  );

  // State to handle showing the printable report
  const [showReport, setShowReport] = useState(false);

  // Function to toggle the printable report
  const toggleReport = () => setShowReport(!showReport);

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container py-5">
      {showReport ? ( // If showReport is true, show the printable report
        <OrderReport orders={orders} />
      ) : (
        <div className="bg-white rounded p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">Orders Data</h2>
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
              <Button
                className="me-2"
                variant="success"
                onClick={handleShowModal}
              >
                Add Order
              </Button>
              <button className="btn btn-secondary me-2" onClick={toggleReport}>
                <FaFileAlt className="me-2" />
                Report
              </button>
              {/* "Print" button */}
              <button
                onClick={handlePrintInvoice}
                className="btn btn-secondary"
              >
                Print Invoice
              </button>
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>FullName</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Detail</th>
                <th>Category</th>
                <th>Price</th>
                <th>PaymentType</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order, index) => (
                <tr key={order._id}>
                  <td>{(currentPage - 1) * ordersPerPage + index + 1}</td>
                  <td>{order.fullname}</td>
                  <td>{order.phone}</td>
                  <td>{order.date}</td>
                  <td>{order.details}</td>
                  <td>{order.category}</td>
                  <td>{order.price}</td>
                  <td>{order.paymentType}</td>
                  <td>
                    {/* <Link
                        onClick={() => handleUpdateUser(user._id)}
                        className="btn btn-success me-2"
                      >
                        Update
                      </Link> */}
                    <Button
                      className="me-2"
                      variant="info"
                      onClick={() => handleShowUpdateModal(order)}
                    >
                      Edit
                    </Button>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleShowInvoiceModal(order)}
                    >
                      View Invoice
                    </button>
                    <button
                      className="btn btn-danger "
                      // onClick={() => handleDelete(user._id)}
                      onClick={() => handleDeleteOrder(order._id)}
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
                length: Math.ceil(filteredOrders.length / ordersPerPage),
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

          {/* Modal to display the order invoice */}
          <Modal
            show={showInvoiceModal}
            onHide={handleCloseInvoiceModal}
            centered
          >
            <OrderInvoiceModal
              order={selectedOrder}
              onClose={handleCloseInvoiceModal}
            />
          </Modal>

          {/* Modal to display the "Add Orders" form */}
          <Modal show={showAddOrderModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddOrderForm
                onAddOrder={handleAddOrder}
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
              <Modal.Title>Update Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedOrder && (
                <UpdateOrderForm
                  order={selectedOrder}
                  onUpdate={handleUpdateOrder}
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

export default Orders;
