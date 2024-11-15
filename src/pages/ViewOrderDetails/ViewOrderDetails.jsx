import React from 'react';
import { Row, Col, Typography, Button, List, Divider, message } from 'antd';
import './ViewOrderDetails.css';
import { useQuery } from '@tanstack/react-query';
import * as OrderService from '../../services/OrderService';
import Loading from '../../components/LoadingComponent/Loading';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const { Title, Text } = Typography;

const ViewOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const fetchOrderDetails = async () => {
    try {
      const res = await OrderService.getOrderDetailsById(id, state?.token);
      return res.data;
    } catch (error) {
      message.error('Failed to fetch order details');
      throw error;
    }
  };

  const { data, isPending } = useQuery({
    queryKey: ['orders-details'],
    queryFn: fetchOrderDetails,
    enabled: !!id,
  });

  const handleBackToMyOrder = () => {
    navigate('/myOrder');
  };

  return (
    <div className="view-order-page-container">
      <Loading isPending={isPending}>
        <Title level={2} className="page-title">View Order Details</Title>
        <Row gutter={24}>
          <Col xs={24} md={10}>
            <div className="view-order-method-box">
              <Title level={4}>Shipping Method</Title>
              <Text className="view-order-method-item">{data?.shippingMethod ? (data.shippingMethod === 'express' ? "Express Shipping" : "Standard Shipping") : 'Standard Shipping'}</Text>
            </div>

            <div className="view-order-method-box" style={{ marginTop: '20px' }}>
              <Title level={4}>Payment Method</Title>
              <Text className="view-order-method-item-1">
                {data?.paymentMethod ? (data.paymentMethod === 'cash' ? "Cash payment: Not paid yet" : "Pay with Paypal: Payment successful") : 'N/A'}
              </Text>
            </div>

            <div className="view-order-method-box" style={{ marginTop: '20px' }}>
              <Title level={4}>Recipient information</Title>
              <Text strong>Name: </Text><Text>{data?.shippingAddress?.fullName || 'N/A'}</Text><br />
              <Text strong>Phone: </Text><Text>{data?.shippingAddress?.phone || 'N/A'}</Text><br />
              <Text strong>Address: </Text><Text>{data?.shippingAddress?.address || 'N/A'}</Text><br />
              <Text strong>City: </Text><Text>{data?.shippingAddress?.city || 'N/A'}</Text><br />
            </div>
          </Col>

          <Col xs={24} md={14}>
            <div className="view-order-summary">
              <Title level={4}>Order Summary</Title>
              <Divider />
              <List
                itemLayout="horizontal"
                dataSource={data?.orderItems || []}
                renderItem={(item) => (
                  <List.Item className="view-order-product-item">
                    <img src={item.image} alt="Product" className="view-order-product-image" />
                    <List.Item.Meta
                      title={<span className="view-order-item-title">{item.name}</span>}
                      description={<span className="view-order-item-description">
                        Price: ${item.price} | Quantity: {item.amount}
                      </span>}
                    />
                    <Text strong>Total: ${item.price * item.amount * (1 - (item.discount || 0) / 100)}</Text>
                  </List.Item>
                )}
              />
              <Divider />
              <Row justify="space-between" className="view-order-summary-row">
                <Text strong>Amount after discount:</Text>
                <Text>${data?.itemsPrice || 0}</Text>
              </Row>
              <Row justify="space-between" className="view-order-summary-row">
                <Text strong>Shipping Fee:</Text>
                <Text>${data?.shippingPrice || 0}</Text>
              </Row>
              <Row justify="space-between" className="view-order-summary-row">
                <Text strong>Total Amount:</Text>
                <Text strong>${data?.totalPrice || 0}</Text>
              </Row>
            </div>
            <Button type="primary" onClick={handleBackToMyOrder} className="view-order-back-to-home-button">
              Return to My Order page
            </Button>
          </Col>
        </Row>
      </Loading>
    </div>
  );
};

export default ViewOrderDetails;
