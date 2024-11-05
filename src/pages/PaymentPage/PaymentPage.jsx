import React, { useState } from 'react';
import './PaymentPage.css';
import { Button, Divider, List, Row, Col, Typography, Radio, message } from 'antd';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as OrderService from "../../services/OrderService";
import Loading from '../../components/LoadingComponent/Loading';

const { Text, Title } = Typography;

const PaymentPage = () => {
  const location = useLocation();
  const selectedProducts = location.state?.selectedProducts || [];
  const userDetails = location.state?.userDetails || {};
  console.log('User Details:', userDetails);
  console.log('Selected Products:', selectedProducts);

  const user = useSelector((state) => state.user);
  // const order = useSelector((state) => state.order);
  // const [stateUserDetails, setStateUserDetails] = useState({
  //   name: '',
  //   phone: '',
  //   address: '',
  //   city: '',
  // });


  const [shippingMethod, setShippingMethod] = useState('standard'); // Mặc định là giao hàng tiết kiệm
  const [paymentMethod, setPaymentMethod] = useState('cash'); // Mặc định là thanh toán bằng tiền mặt


  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data
    const res = OrderService.createOrder(
      {...rests}, token)
      return res
  });

  const {isPending} = mutationAddOrder

  // Tính toán subtotal và tổng tiền
  const subtotal = selectedProducts.reduce((sum, product) => {
    const priceAfterDiscount = product.price * (1 - product.discount / 100);
    return sum + (priceAfterDiscount * product.amount);
  }, 0);
  
  const shippingFee = shippingMethod === 'express' ? selectedProducts.length * 5 : selectedProducts.length * 2;
  const totalAmount = subtotal + shippingFee;

  const handlePlaceOrder = () => {
    // Tính toán giá trị itemsPrice từ selectedProducts
    const itemsPrice = subtotal; // Tổng giá sản phẩm (không bao gồm phí giao hàng)
    const totalPrice = itemsPrice + shippingFee; // Tổng giá bao gồm phí giao hàng
    if (user?.access_token && selectedProducts && user?.name && user?.address && user?.phone && user?.city
        && itemsPrice && user?.id
    ) {
        mutationAddOrder.mutate(
            {
                token: user?.access_token,
                orderItems: selectedProducts, 
                fullName: userDetails.name || user?.name, 
                address: userDetails.address || user?.address,
                phone: userDetails.phone || user?.phone,
                city: userDetails.city || user?.city,
                paymentMethod: paymentMethod,
                itemsPrice: itemsPrice, 
                shippingPrice: shippingFee, 
                totalPrice: totalPrice, 
                user: user?.id, 
            },
            {
                onSuccess: () => {
                    message.success("Your order has been placed successfully!");
                },
                onError: (error) => {
                    message.error("An error occurred while placing your order: " + error.message);
                }
            }
        );
    }
};

  

  return (
    <div className="payment-page-container">
      <Loading isPending={isPending}>
     <Row gutter={24}>
        <Col xs={24} md={10}>
          <div className="payment-page-box">
            <Title level={2}>Phương thức giao hàng</Title>
            <Radio.Group
              onChange={(e) => setShippingMethod(e.target.value)}
              value={shippingMethod}
              className="payment-page-shipping-options"
            >
              <Radio value="standard">Giao hàng tiết kiệm</Radio>
              <Radio value="express">Giao hàng nhanh</Radio>
            </Radio.Group>
          </div>

          <div className="payment-page-box" style={{ marginTop: '20px' }}>
            <Title level={2}>Phương thức thanh toán</Title>
            <Radio.Group
              onChange={(e) => setPaymentMethod(e.target.value)}
              value={paymentMethod}
              className="payment-page-payment-options"
            >
              <Radio value="cash">Thanh toán bằng tiền mặt</Radio>
            </Radio.Group>
          </div>
        </Col>

        <Col xs={24} md={14}>
          <div className="payment-page-summary-box">
            <Title level={2}>Tóm tắt đơn hàng</Title>
            <Divider />
              <Text strong>Name: {userDetails.name}</Text>
              <br />
              <Text strong>Phone: {userDetails.phone}</Text>
              <br />
              <Text strong>Address: {userDetails.address}</Text>
              <br />
              <Text strong>City: {userDetails.city}</Text>
              <Divider />
            <List
              itemLayout="horizontal"
              dataSource={selectedProducts}
              renderItem={item => (
                <List.Item className="payment-page-product-item">
                  <img src={item.image} alt="Product" className="payment-page-product-image" />
                  <List.Item.Meta
                    title={<span className="payment-page-item-meta-title">{item.name}</span>}
                    description={<span className="payment-page-item-meta-description">Price: ${item.price.toFixed(2)} | Quantity: {item.amount} | Discount: {item.discount}%</span>}
                  />
                  <Text strong>
                    Total: ${(item.price * (1 - item.discount / 100) * item.amount).toFixed(2)}
                  </Text>
                </List.Item>
              )}
            />
            <Divider />
            <Row justify="space-between" className="payment-page-summary-row">
              <Text strong>Shipping Fee:</Text>
              <Text>{shippingFee.toFixed(2)}$</Text>
            </Row>
            <Row justify="space-between" className="payment-page-summary-row">
              <Text strong>Total Amount:</Text>
              <Text strong>{totalAmount.toFixed(2)}$</Text>
            </Row>
            
            <Button type="primary" onClick={handlePlaceOrder} className="payment-page-place-order-button">
              Đặt hàng
            </Button>
          </div>
        </Col>
      </Row>   
      </Loading>
      
    </div>
  );
};

export default PaymentPage;
