import React from "react";
import { Typography } from "antd";
import OrderTable from "../OrderTable/OrderTable";
import * as OrderService from '../../services/OrderService';
import { useQuery } from "@tanstack/react-query";
import './AdminOrder.css';
import Loading from "../LoadingComponent/Loading";

const { Title } = Typography;

const AdminOrder = () => {
  const fetchOrders = async () => {
    const res = await OrderService.getAllOrder();
    return res.data;
    
  };

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });
  
  
  
  return (
    <div className="admin-order-container">
        <Loading isPending={isLoading}>
            <Title level={2} className="title">Quản lý Đơn hàng</Title>
            <OrderTable orders={orders} />
        </Loading>
      
    </div>
  );
};

export default AdminOrder;
