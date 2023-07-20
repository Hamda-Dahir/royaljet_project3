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

const Orders = () => {
  return <div>Orders</div>;
};

export default Orders;
