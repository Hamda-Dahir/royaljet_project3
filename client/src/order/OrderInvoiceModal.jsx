import React from 'react';

const OrderInvoiceModal = ({ order, onClose }) => {
  // utility function to format a date string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handlePrintInvoice = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!-- The invoice content to be printed -->
      `);

      // You can directly include the content from the modal, or use a separate function to generate the content
      const invoiceContent = `
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
            <p><strong>Date:</strong> ${formatDate(order.date)}</p>
            <p><strong>Detail:</strong> ${order.details}</p>
            <p><strong>Category:</strong> ${order.category}</p>
            <p><strong>Price:</strong> ${order.price}</p>
            <p><strong>PaymentType:</strong> ${order.paymentType}</p>
          </body>
        </html>
      `;

      printWindow.document.write(invoiceContent);
      printWindow.document.close();

      // Automatically trigger the print dialog when the window finishes loading
      printWindow.onload = function () {
        printWindow.print();
        printWindow.close();
      };
    } else {
      // Display an alternative option for printing the invoice
      alert(
        'The invoice could not be printed because pop-ups are blocked. Please click the "Print Invoice" button again and allow pop-ups for this website.'
      );

      // You can also provide a link or button that opens the invoice content in a new tab
      const alternativePrint = window.open('', '_blank');
      if (alternativePrint) {
        alternativePrint.document.write(invoiceContent);
        alternativePrint.document.close();
      } else {
        // If the alternative print option fails, you can provide further instructions or fallback options.
        alert(
          'The invoice could not be printed. Please try alternative print options.'
        );
      }
    }
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <div className="modal-body p-2">
          {order ? (
            <div>
              <h4>Order Detail Invoice:</h4>
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
                <strong>Date:</strong> {formatDate(order.date)}
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
          <button className=" me-2 btn btn-secondary" onClick={onClose}>
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
