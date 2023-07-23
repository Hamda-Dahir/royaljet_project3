import React from 'react';

const OrderInvoiceModal = ({ order, onClose }) => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Order Invoice</h5>
          <button className="close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {/* Display the order details here */}
          <p>Order ID: {order._id}</p>
          <p>Full Name: {order.fullname}</p>
          <p>Phone: {order.phone}</p>
          <p>Date: {order.date}</p>
          <p>Details: {order.details}</p>
          <p>Category: {order.category}</p>
          <p>Price: {order.price}</p>
          <p>Payment Type: {order.paymentType}</p>
          {/* Add more details as needed */}
        </div>
        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
          {/* You can add a print button here if needed */}
        </div>
      </div>
    </div>
  );
};

export default OrderInvoiceModal;
