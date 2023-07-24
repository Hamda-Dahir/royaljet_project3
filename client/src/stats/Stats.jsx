import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { FaUsers, FaShoppingCart, FaDollarSign } from 'react-icons/fa';
import './Stats.css';

import { getAllUsers, getAllOrders } from '../api';

const Stats = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const users = await getAllUsers();
        const orders = await getAllOrders();
        setUsersCount(users.length);
        setOrdersCount(orders.length);
      } catch (error) {
        // handle error
      }
    }

    fetchData();
  }, []);

  return (
    <div className="card-container d-flex justify-content-around flex-wrap">
      <Card className="custom-card users-card">
        <Card.Body>
          <FaUsers className="icon" />
          <Card.Title>Users</Card.Title>
          <h3>{usersCount}</h3>
        </Card.Body>
      </Card>
      <Card className="custom-card orders-card">
        <Card.Body>
          <FaShoppingCart className="icon" />
          <Card.Title>Orders</Card.Title>
          <h3>{ordersCount}</h3>
        </Card.Body>
      </Card>
      <Card className="custom-card expenses-card">
        <Card.Body>
          <FaDollarSign className="icon" />
          <Card.Title>Expenses</Card.Title>
          <h3>$2000</h3>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Stats;
