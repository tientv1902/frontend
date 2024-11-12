import React, { useEffect, useState } from "react";
import "./PaymentPage.css";
import { Button, Divider, List, Row, Col, Typography, Radio, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as OrderService from "../../services/OrderService";
import Loading from "../../components/LoadingComponent/Loading";
import { orderRemove } from "../../redux/slices/orderSlice";
import * as PaymentService from "../../services/PaymentService";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const { Text, Title } = Typography;

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedProducts = location.state?.selectedProducts || [];
  const userDetails = location.state?.userDetails || {};
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paypalClientId, setPaypalClientId] = useState(null);

  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data;
    const res = OrderService.createOrder({ ...rests }, token);
    return res;
  });

  const { isPending } = mutationAddOrder;

  const subtotal = selectedProducts.reduce((sum, product) => {
    const priceAfterDiscount = product.price * (1 - product.discount / 100);
    return sum + priceAfterDiscount * product.amount;
  }, 0);

  const shippingFee = shippingMethod === "express" ? selectedProducts.length * 5 : selectedProducts.length * 2;
  const totalAmount = subtotal + shippingFee;
  console.log(totalAmount)

  const handlePlaceOrder = () => {
    const itemsPrice = subtotal;
    const totalPrice = itemsPrice + shippingFee;
    if (
      user?.access_token &&
      selectedProducts &&
      user?.name &&
      user?.address &&
      user?.phone &&
      user?.city &&
      itemsPrice &&
      user?.id
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
          email: user?.email,
        },
        {
          onSuccess: () => {
            message.success("Your order has been placed successfully!");
            selectedProducts.forEach((product) => {
              dispatch(orderRemove({ idProduct: product.id }));
            });
            navigate("/successOrder", {
              state: {
                selectedProducts,
                userDetails,
                shippingMethod,
                paymentMethod,
                subtotal,
                shippingFee,
                totalAmount,
              },
            });
          },
          onError: (error) => {
            message.error("An error occurred while placing your order: " + error.message);
          },
        }
      );
    }
  };

  const onSuccessPaypal = (details) => {
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
        paymentMethod: "paypal",
        itemsPrice: itemsPrice,
        shippingPrice: shippingFee,
        totalPrice: totalPrice,
        user: user?.id,
        isPaid: true,
        paidAt: details.update_time,
        email: user?.email,
      },
      {
        onSuccess: () => {
          message.success("Your order has been placed successfully!");
          selectedProducts.forEach((product) => {
            dispatch(orderRemove({ idProduct: product.id }));
          });
          navigate("/successOrder", {
            state: {
              selectedProducts,
              userDetails,
              shippingMethod,
              paymentMethod: "paypal",
              subtotal,
              shippingFee,
              totalAmount,
            },
          });
        },
        onError: (error) => {
          message.error("An error occurred while placing your order: " + error.message);
        },
      }
    );
  };

  useEffect(() => {
    const fetchPaypalClientId = async () => {
      const { data } = await PaymentService.getConfig();
      setPaypalClientId(data);
    };
    fetchPaypalClientId();
  }, []);

  return (
    <div className="payment-page-container">
      <Loading isPending={isPending}>
        <Title level={2} className="page-title">Payment</Title>
        <Row gutter={24}>
          <Col xs={24} md={10}>
            <div className="payment-page-box">
              <Title level={2}>Phương thức giao hàng</Title>
              <Radio.Group onChange={(e) => setShippingMethod(e.target.value)} value={shippingMethod}>
                <Radio value="standard">Giao hàng tiết kiệm</Radio>
                <Radio value="express">Giao hàng nhanh</Radio>
              </Radio.Group>
            </div>

            <div className="payment-page-box" style={{ marginTop: "20px" }}>
              <Title level={2}>Phương thức thanh toán</Title>
              <Radio.Group onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod}>
                <Radio value="cash">Thanh toán bằng tiền mặt</Radio>
                <Radio value="paypal">Thanh toán bằng Paypal</Radio>
              </Radio.Group>
            </div>
          </Col>

          <Col xs={24} md={14}>
            <div className="payment-page-summary-box">
              <Title level={2}>Tóm tắt đơn hàng</Title>
              <Divider />
              <Text strong>Name: <Text style={{ fontWeight: "normal" }}>{userDetails.name}</Text></Text>
              <br />
              <Text strong>Phone: <Text style={{ fontWeight: "normal" }}>{userDetails.phone}</Text></Text>
              <br />
              <Text strong>Address: <Text style={{ fontWeight: "normal" }}>{userDetails.address}</Text></Text>
              <br />
              <Text strong>City: <Text style={{ fontWeight: "normal" }}>{userDetails.city}</Text></Text>
              <Divider />
              <List
                itemLayout="horizontal"
                dataSource={selectedProducts}
                renderItem={(item) => (
                  <List.Item>
                    <img src={item.image} alt="Product" style={{ width: 60, height: 60, marginRight: 10 }} />
                    <List.Item.Meta
                      title={item.name}
                      description={`Price: $${item.price.toFixed(2)} | Quantity: ${item.amount} | Discount: ${item.discount}%`}
                    />
                    <Text strong>Total: ${(item.price * (1 - item.discount / 100) * item.amount).toFixed(2)}</Text>
                  </List.Item>
                )}
              />
              <Divider />
              <Row justify="space-between">
                <Text strong>Shipping Fee:</Text>
                <Text>{shippingFee.toFixed(2)}$</Text>
              </Row>
              <Row justify="space-between">
                <Text strong>Total Amount:</Text>
                <Text strong>{totalAmount.toFixed(2)}$</Text>
              </Row>

              {paymentMethod === "paypal" && paypalClientId && (
                <PayPalScriptProvider options={{ clientId: paypalClientId, currency: "USD" }}>
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{
                        amount: {
                          value: totalAmount.toFixed(2),
                        },
                      }],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      onSuccessPaypal(details);
                    });
                  }}
                  onError={(err) => {
                    console.error('Error processing PayPal transaction', err);
                    message.error("Thanh toán thất bại. Vui lòng thử lại.");
                  }}
                />
              </PayPalScriptProvider>
              
              )}
              {paymentMethod === "cash" && (
                <Button
                  className="payment-order-btn"
                  size="large"
                  type="primary"
                  onClick={handlePlaceOrder}
                  loading={isPending}
                  style={{ width: "100%" }}
                >
                  Thanh toán khi nhận hàng
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
