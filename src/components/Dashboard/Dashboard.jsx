import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card">
          <h2 className="card-title">Total Users</h2>
          <p className="card-value">5</p>
        </div>
        <div className="card">
          <h2 className="card-title">Total Products</h2>
          <p className="card-value">3</p>
        </div>
        <div className="card">
          <h2 className="card-title">Sales This Month</h2>
          <p className="card-value">$6,000</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
