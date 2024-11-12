import React from 'react';
import './SuccessOrderPage.css';
import { Divider, List, Row, Col, Typography } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const { Text, Title } = Typography;

const SuccessOrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const {
    selectedProducts,
    userDetails,
    shippingMethod,
    paymentMethod,
    subtotal,
    shippingFee,
    totalAmount
  } = location.state || {};


  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="success-order-page-container">
      <Title level={2} className="page-title">Order Successful</Title>
      <Row gutter={24}>
        <Col xs={24} md={10}>
          <div className="success-order-method-box">
            <Title level={4} >Phương thức giao hàng</Title>
            <Text className='success-order-method-item'>{shippingMethod === 'express' ? "Giao hàng nhanh" : "Giao hàng tiết kiệm"}</Text>
          </div>

          <div className="success-order-method-box" style={{ marginTop: '20px' }}>
            <Title level={4}>Phương thức thanh toán</Title>
            <Text className='success-order-method-item-1'>
              {paymentMethod === 'cash' 
                ? "Thanh toán bằng tiền mặt" 
                : paymentMethod === 'paypal' 
                  ? "Thanh toán bằng PayPal" 
                  : "Khác"}
            </Text>
          </div>
          
          <div className="success-order-method-box" style={{ marginTop: '20px' }}>
            <Title level={4}>Thông tin người nhận</Title>
            <Text strong>Name: </Text><Text>{userDetails?.name}</Text><br />
            <Text strong>Phone: </Text><Text>{userDetails?.phone}</Text><br />
            <Text strong>Address: </Text><Text>{userDetails?.address}</Text><br />
            <Text strong>City: </Text><Text>{userDetails?.city}</Text><br />
          </div>
        </Col>

        <Col xs={24} md={14}>
          <div className="order-summary">
            <Title level={4}>Order Summary</Title>
            <Divider />
            <List
              itemLayout="horizontal"
              dataSource={selectedProducts}
              renderItem={item => (
                <List.Item className="success-order-product-item">
                  <img src={item.image} alt="Product" className="success-order-product-image" />
                  <List.Item.Meta
                    title={<span className="success-order-item-title">{item.name}</span>}
                    description={<span className="success-order-item-description">Price: ${item.price.toFixed(2)} | Quantity: {item.amount} | Discount: {item.discount}%</span>}
                  />
                  <Text strong>
                    Total: ${(item.price * (1 - item.discount / 100) * item.amount).toFixed(2)}
                  </Text>
                </List.Item>
              )}
            />
            <Divider />
            <Row justify="space-between" className="order-summary-row">
              <Text strong>Subtotal:</Text>
              <Text>${subtotal.toFixed(2)}</Text>
            </Row>
            <Row justify="space-between" className="order-summary-row">
              <Text strong>Shipping Fee:</Text>
              <Text>${shippingFee.toFixed(2)}</Text>
            </Row>
            <Row justify="space-between" className="order-summary-row">
              <Text strong>Total Amount:</Text>
              <Text strong>${totalAmount.toFixed(2)}</Text>
            </Row>
          </div>
          <Button type="primary" onClick={handleBackToHome} className="back-to-home-button">
            Quay về trang chủ
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SuccessOrderPage;
