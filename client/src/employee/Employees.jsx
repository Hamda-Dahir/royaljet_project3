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

  return <div>Employees</div>;
}

export default Employees;
