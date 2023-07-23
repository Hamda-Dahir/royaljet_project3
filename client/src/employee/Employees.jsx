import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFilter, FaFileAlt, FaPrint } from 'react-icons/fa';
import EmployeeReport from './EmployeeReport';
import './Employees.css';
import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../api';
import AddEmployeeForm from './AddEmployee';
import UpdateEmployeeForm from './UpdateEmployeeForm';
import { Modal, Button, Form } from 'react-bootstrap';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(8);
  const [filterName, setFilterName] = useState('');
  const [newEmployeeData, setNewEmployeeData] = useState({
    name: '',
    phone: 0,
    position: '',
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleShowUpdateModal = (employee) => {
    setSelectedEmployee(employee);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedEmployee(null);
    setShowUpdateModal(false);
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    // Update the state with the updated emp data
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee._id === updatedEmployee._id ? updatedEmployee : employee
      )
    );
  };

  const handleShowModal = () => {
    setShowAddEmployeeModal(true); // Open the modal
  };

  const handleCloseModal = () => {
    setShowAddEmployeeModal(false); // Close the modal
  };

  const handleAddEmployee = async (employeeData) => {
    try {
      await createEmployee(employeeData);
      handleCloseModal();
      fetchEmployees(); // Fetch employees again after adding a new user
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await deleteEmployee(employeeId);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== userId)
      );
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  // filter by name

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(filterName.toLowerCase())
  );

  // State to handle showing the printable report
  const [showReport, setShowReport] = useState(false);

  // Function to toggle the printable report
  const toggleReport = () => setShowReport(!showReport);

  // Pagination
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container py-5">
      {showReport ? ( // If showReport is true, show the printable report
        <EmployeeReport employees={employees} />
      ) : (
        <div className="bg-white rounded p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">Employees Data</h2>
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
                Add Employee
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
                <th>Name</th>
                <th>Phone</th>
                <th>Position</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee, index) => (
                <tr key={employee._id}>
                  <td>{(currentPage - 1) * employeesPerPage + index + 1}</td>
                  <td>{employee.name}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.position}</td>
                  <td>
                    <Button
                      className="me-2"
                      variant="info"
                      onClick={() => handleShowUpdateModal(employee)}
                    >
                      Edit
                    </Button>
                    <button
                      className="btn btn-danger "
                      onClick={() => handleDeleteEmployee(employee._id)}
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
                length: Math.ceil(filteredEmployees.length / employeesPerPage),
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
          {/* Modal to display the "Add Emp" form */}
          <Modal show={showAddEmployeeModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Add Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddEmployeeForm
                onAddEmployee={handleAddEmployee}
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
              <Modal.Title>Update Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedEmployee && (
                <UpdateEmployeeForm
                  employee={selectedEmployee}
                  onUpdate={handleUpdateEmployee}
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

export default Employees;
