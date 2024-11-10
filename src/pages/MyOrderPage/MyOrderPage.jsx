import React, { useState } from 'react';
import { Row, Col, Typography, Button, List, Divider, message } from 'antd';
import './MyOrderPage.css';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as OrderService from '../../services/OrderService';
import Loading from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const MyOrderPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [cancelLoading, setCancelLoading] = useState({});

  const fetchMyOrder = async () => {
    try {
      const res = await OrderService.getOrderDetails(user?.id, user?.access_token);
      return res.data;
    } catch (error) {
      message.error('Failed to fetch order details');
      throw error;
    }
  };

  const isEnabled = Boolean(user?.id && user?.access_token);
  const { data, isPending } = useQuery({ queryKey: ["orders"], queryFn: fetchMyOrder, enabled: isEnabled });

  const handleCancelOrder = async (orderId) => {
    setCancelLoading((prev) => ({ ...prev, [orderId]: true }));
    try {
      await OrderService.deleteOrderDetails(orderId, user?.access_token);
      message.success("Order canceled successfully");
      
      // Refetch the orders list
      queryClient.invalidateQueries("orders");
    } catch (error) {
      message.error("Failed to cancel order");
    } finally {
      setCancelLoading((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  const handleViewDetailsOrder = (id) => {
    navigate(`/viewOrderDetails/${id}`, {
      state: { token: user?.access_token },
    });
  };

  return (
    <div className="my-order-page">
      <Loading isPending={isPending}>
        <Title level={2} className="page-title">My Orders</Title>
        <Row gutter={24}>
          {data?.map((order, index) => (
            <Col span={24} key={order._id}>
              <div className="order-item-wrapper">
                <Title level={4} className="order-number">Order {index + 1}</Title>
                <List
                  itemLayout="horizontal"
                  dataSource={order.orderItems}
                  renderItem={(item) => (
                    <List.Item className="order-page-product-item">
                      <img src={item.image} alt={item.name} className="order-page-product-image" />
                      <List.Item.Meta
                        title={<span className="order-page-item-meta-title">{item.name}</span>}
                        description={
                          <span className="order-page-item-meta-description">
                            Price: ${(item.price || 0).toFixed(2)} | Quantity: {item.amount} | Amount after discount: {order.itemsPrice} | All Shipping Price: {order.shippingPrice} | All Total: ${(order.totalPrice || 0).toFixed(2)}
                          </span>
                        }
                      />
                    </List.Item>
                  )}
                />
                <div className="order-actions">
                  <Button type="primary" onClick={() => handleViewDetailsOrder(order._id)}>View Details</Button>
                  <Button
                    type="danger"
                    onClick={() => handleCancelOrder(order._id)}
                    loading={cancelLoading[order._id]} 
                    style={{ marginLeft: 10 }}
                  >
                    Cancel Order
                  </Button>
                </div>
              </div>
              <Divider />
            </Col>
          ))}
        </Row>
        <Row>
          <Col span={24}>
            <Title level={4} className="total-price">Total: ${data?.reduce((sum, order) => sum + order.itemsPrice, 0).toFixed(2)}</Title>
          </Col>
        </Row>
      </Loading>
    </div>
  );
};

export default MyOrderPage;
