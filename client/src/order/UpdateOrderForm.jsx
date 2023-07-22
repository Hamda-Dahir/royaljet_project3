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

  return <div>UpdateOrderForm</div>;
};

export default UpdateOrderForm;
