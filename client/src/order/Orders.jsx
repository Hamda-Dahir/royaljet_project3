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

function Orders() {
  const [orders, setOrders] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(8);
  const [filterName, setFilterName] = useState('');
  const [newOrderData, setNewOrderData] = useState({
    fullName: '',
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
    order.description.toLowerCase().includes(filterName.toLowerCase())
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

  return <div>Orders</div>;
}

export default Orders;
