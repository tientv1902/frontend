import React, { useEffect, useState } from 'react';
import './PaymentPage.css';
import { Button, Divider, List, Row, Col, Typography, Radio, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as OrderService from "../../services/OrderService";
import Loading from '../../components/LoadingComponent/Loading';
import { orderRemove } from '../../redux/slices/orderSlice';
import { PayPalButton } from "react-paypal-button-v2";
import * as PaymentService from '../../services/PaymentService'

const { Text, Title } = Typography;

const PaymentPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const selectedProducts = location.state?.selectedProducts || [];
  const userDetails = location.state?.userDetails || {};
  console.log('User Details:', userDetails);
  console.log('Selected Products:', selectedProducts);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [shippingMethod, setShippingMethod] = useState('standard'); 
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const [sdkReady, setSdkReady] = useState(false)


  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data
    const res = OrderService.createOrder(
      {...rests}, token)
      return res
  });

  const {isPending} = mutationAddOrder


  const subtotal = selectedProducts.reduce((sum, product) => {
    const priceAfterDiscount = product.price * (1 - product.discount / 100);
    return sum + (priceAfterDiscount * product.amount);
  }, 0);
  
  const shippingFee = shippingMethod === 'express' ? selectedProducts.length * 5 : selectedProducts.length * 2;
  const totalAmount = subtotal + shippingFee;

  const handlePlaceOrder = () => {
    const itemsPrice = subtotal; 
    const totalPrice = itemsPrice + shippingFee; 
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
                selectedProducts.forEach(product => {
                  dispatch(orderRemove({ idProduct: product.id }));
                });
                navigate('/successOrder', {
                  state: {
                    selectedProducts,
                    userDetails,
                    shippingMethod,
                    paymentMethod,
                    subtotal,
                    shippingFee,
                    totalAmount
                  },
                });
              },
              onError: (error) => {
                message.error("An error occurred while placing your order: " + error.message);
              }
            }
        );
    }
};

const onSuccessPaypal = (details, data) =>{
  const itemsPrice = subtotal; 
  const totalPrice = itemsPrice + shippingFee; 
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
        isPaid: true,
        paidAt: details.update_time
  },{
    onSuccess: () => {
      message.success("Your order has been placed successfully!");
      selectedProducts.forEach(product => {
        dispatch(orderRemove({ idProduct: product.id }));
      });
      navigate('/successOrder', {
        state: {
          selectedProducts,
          userDetails,
          shippingMethod,
          paymentMethod,
          subtotal,
          shippingFee,
          totalAmount
        },
      });
    },
    onError: (error) => {
      message.error("An error occurred while placing your order: " + error.message);
    }
  })
  console.log('details, data',details, data)
}

const addpaypalScript = async () => {
  const { data } = await PaymentService.getConfig()
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = `https://sandbox.paypal.com/sdk/js?client-id=${data}`
  script.async = true
  script.onload = () => {
    setSdkReady(true)
  }
  document.body.appendChild(script)

}


useEffect(() =>{
  if(!window.paypal){
    addpaypalScript()
  }else {
    setSdkReady(true)
  }
  
}, [])
  

  return (
    <div className="payment-page-container">
      <Loading isPending={isPending}>
      <Title level={2} className="page-title">Payment</Title>
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
              <Radio value="paypal">Thanh toán bằng Paypal</Radio>
            </Radio.Group>
            
          </div>
        </Col>

        <Col xs={24} md={14}>
          <div className="payment-page-summary-box">
            <Title level={2}>Tóm tắt đơn hàng</Title>
            <Divider />
              <Text strong>Name: <Text style={{ fontWeight: 'normal' }}>{userDetails.name}</Text></Text>
              <br />
              <Text strong>Phone: <Text style={{ fontWeight: 'normal' }}>{userDetails.phone}</Text></Text>
              <br />
              <Text strong>Address: <Text style={{ fontWeight: 'normal' }}>{userDetails.address}</Text></Text>
              <br />
              <Text strong>City: <Text style={{ fontWeight: 'normal' }}>{userDetails.city}</Text></Text>
            <Divider />
            <List
              itemLayout="horizontal"
              dataSource={selectedProducts}
              renderItem={item => (
                <List.Item className="payment-page-product-item">
                  <img src={item.image} alt="Product" className="payment-page-product-image" />
                  <List.Item.Meta
                    title={<span className="payment-page-item-meta-title">{item.name}</span>}
                    description={
                      <>
                        <span className="payment-page-item-meta-description">
                          Price: ${item.price.toFixed(2)} | Quantity: {item.amount} | Discount: {item.discount}%
                        </span>
                      </>
                    }
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
            {paymentMethod === "paypal" && sdkReady ? (
              <div>
                <PayPalButton
                amount={totalAmount.toFixed(2)}
                onSuccess={onSuccessPaypal}
                onError={() => {
                  alert('Error')
                }}
              />
              </div>
              ) : (
                <Button type="primary" onClick={handlePlaceOrder} className="payment-page-place-order-button">
              Đặt hàng
            </Button>
              )}
            
          </div>
        </Col>
      </Row>   
      </Loading>
      
    </div>
  );
};

export default PaymentPage;
