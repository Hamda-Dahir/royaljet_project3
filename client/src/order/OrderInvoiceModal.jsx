import React, { useEffect } from 'react';

const OrderInvoiceModal = ({ order, onClose }) => {
  useEffect(() => {
    // After the modal is mounted, wait for a short delay (e.g., 500ms) and then trigger print
    const printTimeout = setTimeout(() => {
      window.print(); // Trigger the browser's print functionality
      onClose(); // Close the modal after printing (you can remove this if not needed)
    }, 500);

    return () => {
      clearTimeout(printTimeout); // Clean up the timeout when the modal is unmounted
    };
  }, [onClose]);

  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-body">
          {/* Display the order details for printing */}
          <h4>Order Details:</h4>
          <p>
            <strong>Order ID:</strong> {order.orderId}
          </p>
          <p>
            <strong>Full Name:</strong> {order.fullname}
          </p>
          <p>
            <strong>Phone:</strong> {order.phone}
          </p>
          <p>
            <strong>Date:</strong> {order.date}
          </p>
          <p>
            <strong>Details:</strong> {order.details}
          </p>
          <p>
            <strong>Category:</strong> {order.category}
          </p>
          <p>
            <strong>Price:</strong> {order.price}
          </p>
          <p>
            <strong>Payment Type:</strong> {order.paymentType}
          </p>
        </div>
        <div className="modal-footer">
          {/* Remove the print button, as printing will be triggered automatically */}
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderInvoiceModal;
