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
  return <div>Employees</div>;
}

export default Employees;
