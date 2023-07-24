import React from 'react';

const OrderInvoiceModal = ({ order, onClose }) => {
  const handlePrintInvoice = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Order Invoice Royal Jet</title>
            <style>
              /* Custom styles for the printable invoice */
              /* Add your styles here, for example: */
              /* body { font-family: Arial, sans-serif; } */
              /* ... */
            </style>
          </head>
          <body>
            <h1>Order Invoice</h1>
            <p><strong>FullName:</strong> ${order.fullname}</p>
            <p><strong>Phone:</strong> ${order.phone}</p>
            <p><strong>Date:</strong> ${order.date}</p>
            <p><strong>Detail:</strong> ${order.details}</p>
            <p><strong>Category:</strong> ${order.category}</p>
            <p><strong>Price:</strong> ${order.price}</p>
            <p><strong>PaymentType:</strong> ${order.paymentType}</p>
            <script>
              // Automatically trigger the print dialog when the window finishes loading
              window.onload = function() {
                window.print();
                window.close();
              };
            </script>
          </body>
        </html>
      `);

      printWindow.document.close();
    } else {
      alert(
        'Error: The invoice could not be printed. Please allow pop-ups for this website and try again.'
      );
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-body">
          {order ? (
            <div>
              <h4>Order Details:</h4>
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>FullName:</strong> {order.fullname}
              </p>
              <p>
                <strong>Phone:</strong> {order.phone}
              </p>
              <p>
                <strong>Date:</strong> {order.date}
              </p>
              <p>
                <strong>Detail:</strong> {order.details}
              </p>
              <p>
                <strong>Category:</strong> {order.category}
              </p>
              <p>
                <strong>Price:</strong> {order.price}
              </p>
              <p>
                <strong>PaymentType:</strong> {order.paymentType}
              </p>
            </div>
          ) : (
            <p>Loading order details...</p>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handlePrintInvoice}>
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderInvoiceModal;
