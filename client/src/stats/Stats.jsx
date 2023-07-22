import React from 'react';
import { Card } from 'react-bootstrap';
import { FaUsers, FaShoppingCart, FaDollarSign } from 'react-icons/fa';
import './Stats.css';

const Stats = () => {
  return (
    <div className="card-container d-flex justify-content-around flex-wrap">
      <Card className="custom-card users-card">
        <Card.Body>
          <FaUsers className="icon" />
          <Card.Title>Users</Card.Title>
          <h3>500</h3>
        </Card.Body>
      </Card>
      <Card className="custom-card orders-card">
        <Card.Body>
          <FaShoppingCart className="icon" />
          <Card.Title>Orders</Card.Title>
          <h3>150</h3>
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
