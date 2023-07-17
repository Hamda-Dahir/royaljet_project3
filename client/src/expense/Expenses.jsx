import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaFileAlt, FaPrint } from 'react-icons/fa';
import ExpenseReport from './ExpenseReport';
import './expenses.css';
import { getAllExpenses, createExpense } from '../api';
import AddExpenseForm from './AddExpense';
import UpdateExpenseForm from './UpdateExpenseForm';
import { Modal, Button, Form } from 'react-bootstrap';

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  // const [filteredUsers, setFilteredUsers] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expensesPerPage] = useState(8);
  const [filterName, setFilterName] = useState('');
  const [newExpenseData, setNewExpenseData] = useState({
    description: '',
    amount: 0,
    date: '',
    category: '',
  });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await getAllExpenses();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleShowUpdateModal = (expense) => {
    setSelectedExpense(expense);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedExpense(null);
    setShowUpdateModal(false);
  };

  const handleUpdateExpense = (updatedExpense) => {
    // Update the state with the updated user data
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense._id === updatedExpense._id ? updatedExpense : expense
      )
    );
  };

  const handleShowModal = () => {
    setShowAddExpenseModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setShowAddExpenseModal(false); // Close the modal
  };

  const handleAddExpense = async (expenseData) => {
    try {
      await createExpense(expenseData);
      handleCloseModal();
      fetchExpenses(); // Fetch expenses again after adding a new expense
    } catch (error) {
      console.error('Error creating expense:', error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await deleteExpense(expenseId);
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense._id !== expenseId)
      );
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  // filter by name

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  const filteredExpenses = expenses.filter((expense) =>
    expense.name.toLowerCase().includes(filterName.toLowerCase())
  );

  // State to handle showing the printable report
  const [showReport, setShowReport] = useState(false);

  // Function to toggle the printable report
  const toggleReport = () => setShowReport(!showReport);

  // Pagination
  const indexOfLastExpense = currentPage * expensesPerPage;
  const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
  const currentExpenses = filteredExpenses.slice(
    indexOfFirstExpense,
    indexOfLastExpense
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container py-5">
      {showReport ? ( // If showReport is true, show the printable report
        <ExpenseReport expenses={expenses} />
      ) : (
        <div className="bg-white rounded p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">Expenses Data</h2>
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center me-3">
                <span className="me-2">Search: </span>
                <input
                  type="text"
                  value={filterName}
                  onChange={handleFilterChange}
                  placeholder="Filter by name..."
                  className="form-control me-2"
                />
              </div>
              {/* <Link to="/create" className="btn btn-success me-2">
                  Add +
                </Link> */}
              <Button
                className="me-2"
                variant="success"
                onClick={handleShowModal}
              >
                Add Expense
              </Button>
              <button className="btn btn-secondary me-2" onClick={toggleReport}>
                <FaFileAlt className="me-2" />
                Report
              </button>
            </div>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentExpenses.map((expense, index) => (
                <tr key={expense._id}>
                  <td>{(currentPage - 1) * expensesPerPage + index + 1}</td>
                  <td>{expense.description}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.date}</td>
                  <td>{expense.category}</td>
                  <td>
                    {/* <Link
                        onClick={() => handleUpdateUser(user._id)}
                        className="btn btn-success me-2"
                      >
                        Update
                      </Link> */}
                    <Button
                      className="me-2"
                      variant="info"
                      onClick={() => handleShowUpdateModal(expense)}
                    >
                      Edit
                    </Button>
                    <button
                      className="btn btn-danger "
                      // onClick={() => handleDelete(user._id)}
                      onClick={() => handleDeleteExpense(expense._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav className="d-flex justify-content-center">
            <ul className="pagination">
              {Array.from({
                length: Math.ceil(filteredExpenses.length / expensesPerPage),
              }).map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? 'active' : ''
                  }`}
                >
                  <button
                    onClick={() => paginate(index + 1)}
                    className="page-link"
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          {/* Modal to display the "Add Expenses" form */}
          <Modal show={showAddExpenseModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddExpenseForm
                onAddExpense={handleAddExpense}
                onClose={handleCloseModal}
              />
            </Modal.Body>
          </Modal>

          {/* edit modal */}

          <Modal
            show={showUpdateModal}
            onHide={handleCloseUpdateModal}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Update Expense</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedExpense && (
                <UpdateExpenseForm
                  expense={selectedExpense}
                  onUpdate={handleUpdateExpense}
                  onClose={handleCloseUpdateModal}
                />
              )}
            </Modal.Body>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Expenses;
