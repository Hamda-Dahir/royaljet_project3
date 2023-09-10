import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { FaUsers, FaShoppingCart, FaDollarSign, FaUser } from 'react-icons/fa';
import './Stats.css';

import {
  // getAllUsers,
  getAllCustomers,
  getAllOrders,
  getAllExpenses,
  getAllEmployees,
} from '../api';

const Stats = () => {
  const [customersCount, setCustomersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [expensesCount, setExpensesCount] = useState(0);
  const [employeesCount, setEmployeesCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const users = await getAllCustomers();
        const orders = await getAllOrders();
        const expenses = await getAllExpenses();
        const employees = await getAllEmployees();
        setCustomersCount(users.length);
        setOrdersCount(orders.length);
        setExpensesCount(expenses.length);
        setEmployeesCount(employees.length);
      } catch (error) {
        // handle error
      }
    }

    fetchData();
  }, []);

  return (
    <div className="card-container d-flex justify-content-around flex-wrap">
      <Card className="custom-card users-card bg-primary text-white">
        <Card.Body>
          <FaUser className="icon" />
          <Card.Title>Customer</Card.Title>
          <h3>{customersCount}</h3>
        </Card.Body>
      </Card>
      <Card className="custom-card orders-card bg-warning">
        <Card.Body>
          <FaShoppingCart className="icon" />
          <Card.Title>Orders</Card.Title>
          <h3>{ordersCount}</h3>
        </Card.Body>
      </Card>
      <Card className="custom-card expenses-card bg-info">
        <Card.Body>
          <FaDollarSign className="icon" />
          <Card.Title>Expenses</Card.Title>
          <h3>{expensesCount}</h3>
        </Card.Body>
      </Card>
      <Card className="custom-card employees-card bg-dark text-white">
        <Card.Body>
          <FaUsers className="icon" />
          <Card.Title>Employee</Card.Title>
          <h3>{employeesCount}</h3>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Stats;
