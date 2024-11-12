import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import './Dashboard.css';
import * as OrderService from '../../services/OrderService'; 
import * as UserService from '../../services/UserService';
import Loading from '../LoadingComponent/Loading'; 

const Dashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProductsSold, setTotalProductsSold] = useState(0); 

  const fetchOrders = async () => {
    const res = await OrderService.getAllOrder(); 
    return res.data; 
  };

  const fetchUsers = async () => {
    const res = await UserService.getAllUser(); 
    return res.data; 
  };

  const { data: orders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  useEffect(() => {
    if (orders) {
      const revenue = orders.reduce((acc, order) => acc + order.totalPrice, 0); 
      setTotalRevenue(revenue);

      
      const productsSold = orders.reduce((acc, order) => {
        return acc + order.orderItems.reduce((itemAcc, item) => itemAcc + item.amount, 0);
      }, 0);
      setTotalProductsSold(productsSold);
    }
  }, [orders]);

  useEffect(() => {
    if (users) {
      setTotalUsers(users.length); 
    }
  }, [users]);

  const isPending = isLoadingOrders || isLoadingUsers;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <Loading isPending={isPending}>
        <div className="dashboard-cards">
          <div className="card total-users">
            <div className="card-header">
              <i className="card-icon fas fa-users"></i>
              <h2 className="card-title">Total Users</h2>
            </div>
            <p className="card-value">{totalUsers}</p>
          </div>
          <div className="card total-products">
            <div className="card-header">
              <i className="card-icon fas fa-cogs"></i>
              <h2 className="card-title">Total Products Sold</h2>
            </div>
            <p className="card-value">{totalProductsSold}</p>
          </div>
          <div className="card sales">
            <div className="card-header">
              <i className="card-icon fas fa-dollar-sign"></i>
              <h2 className="card-title">Total Store Sales</h2>
            </div>
            <p className="card-value">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </Loading>
    </div>
  );
};

export default Dashboard;
