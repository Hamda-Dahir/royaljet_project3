import React from 'react';
import './orders.css';

const OrderInvoice = ({ orderData }) => {
  // Extract order data
  const { fullname, phone, date, details, category, price, paymentType } =
    orderData;

  return (
    <div className="order-invoice">
      <h2>Order Invoice</h2>
      <p>Full Name: {fullname}</p>
      <p>Phone: {phone}</p>
      <p>Date: {date}</p>
      <p>Details: {details}</p>
      <p>Category: {category}</p>
      <p>Price: {price}</p>
      <p>Payment Type: {paymentType}</p>
    </div>
  );
};

export default OrderInvoice;
