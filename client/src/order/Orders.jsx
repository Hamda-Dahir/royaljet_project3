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

  return <div>Orders</div>;
}

export default Orders;
