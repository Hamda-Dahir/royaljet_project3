import React from 'react';

const SingleOrderDetails = ({ order }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="single-order-details">
      <h2>Order Details</h2>
      <p>ID: {order._id}</p>
      <p>Full Name: {order.fullname}</p>
      <p>Phone: {order.phone}</p>
      <p>Date: {order.date}</p>
      <p>Details: {order.details}</p>
      <p>Category: {order.category}</p>
      <p>Price: {order.price}</p>
      <p>Payment Type: {order.paymentType}</p>
      <button onClick={handlePrint}>Print</button>
    </div>
  );
};

export default SingleOrderDetails;
