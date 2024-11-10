import React, { useEffect, useState } from 'react';
import { Checkbox, InputNumber, Button, Card, Divider, List, Row, Col, Typography, Modal, Form, Input, message, Space } from 'antd';
import { DeleteOutlined, EnvironmentOutlined, GiftOutlined, PlusOutlined, MinusOutlined, CarOutlined, DollarCircleOutlined } from '@ant-design/icons';
import './OrderPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderItemQuantity, orderRemove } from '../../redux/slices/orderSlice';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from "../../services/UserService";
import Loading from '../../components/LoadingComponent/Loading';
import { updateUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const { Text, Title } = Typography;

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  
  const [isModalOpenInfor, setIsModalOpenInfor] = useState(false)
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const shippingFeePerItem = 2;
  const [form] = Form.useForm()

  const [stateUserDetails, setStateUserDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
  });

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleQuantityChange = (productId, type) => {
    const updatedAmount = type === 'increase' ? 1 : -1;
    dispatch(updateOrderItemQuantity({ productId, updatedAmount }));
  };

  const handleDelete = (productId) => {
    dispatch(orderRemove({ idProduct: productId }));
    // Update selectedItems after deletion
    setSelectedItems((prevSelected) => prevSelected.filter((id) => id !== productId));
  };

  const handleSelectItem = (productId) => {
    setSelectedItems((prevSelected) => 
      prevSelected.includes(productId) 
        ? prevSelected.filter((id) => id !== productId) 
        : [...prevSelected, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]); 
    } else {
      setSelectedItems(order.orderItems.map((item) => item.product));
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = () => {
    selectedItems.forEach((productId) => {
      dispatch(orderRemove({ idProduct: productId }));
    });
    setSelectedItems([]);
    setSelectAll(false);
  };
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data || {};
    if (!id) {
      console.error("ID not found in data:", data);
      return Promise.reject("ID is missing");
    }
    return UserService.updateUser(id, rests, token);
  });

  const {isPending} = mutationUpdate
 

  const handleAddCart = () => {
    if (selectedItems.length === 0) {
      message.error('Please select products before purchasing!!!');
    } else if (!user?.phone || !user?.name || !user?.address || !user?.city) {
      setIsModalOpenInfor(true);
    } else {
      const selectedProducts = selectedItems.map((productId) => {
        const item = order.orderItems.find((item) => item.product === productId);
        return {
          id: item.product,
          name: item.name,
          price: item.price,
          amount: item.amount,
          discount: item.discount || 0,
          image: item.image,
        };
      });
      navigate('/payment', {
        state: { 
          selectedProducts,
          userDetails: {
            name: user.name,
            phone: user.phone,
            address: user.address,
            city: user.city
          }
        }
        
      });
    }
  };
  


  useEffect(() => {
    if (isModalOpenInfor) {
      form.setFieldsValue(stateUserDetails);
    }
  }, [isModalOpenInfor,stateUserDetails, form]);
  

  useEffect(() => {
    if (isModalOpenInfor) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone,
      });
      
    }
  }, [isModalOpenInfor, user]);
  

  const handleChangeAddress = () =>{
    setIsModalOpenInfor(true)
  }

  const handleCancelUpdateInfor = () => {
    setStateUserDetails({
      name: '',
      email: '',
      phone: '',
      city: '',

    });
    form.resetFields();
    setIsModalOpenInfor(false)
  }

  const handleConfirmInfor = () => {
    console.log('stateUserDetails', stateUserDetails);
    const { name, phone, address, city } = stateUserDetails;
    
    if (name && phone && address && city) {
      mutationUpdate.mutate(
        { id: user?.id, token: user?.access_token, ...stateUserDetails }, 
        {
          onSuccess: () => {
            dispatch(updateUser({ name, phone, address, city }));
            setIsModalOpenInfor(false);
            window.location.reload();
          }
        }
      );
    }
  };
  
  const subtotal = selectedItems.reduce((sum, productId) => {
    const item = order.orderItems.find((item) => item.product === productId);
    const price = item?.price || 0;
    const amount = item?.amount || 0;
    return sum + (price * amount);
  }, 0);
  
  const totalDiscount = selectedItems.reduce((sum, productId) => {
    const item = order.orderItems.find((item) => item.product === productId);
    const discount = item?.discount || 0;
    const price = item?.price || 0;
    const amount = item?.amount || 0;
    return sum + (price * (discount / 100)) * amount; 
  }, 0);

  const shippingFee = selectedItems.length * shippingFeePerItem;
  const totalAmount = subtotal - totalDiscount + shippingFee;

  return (
    <div className="order-page">
      <Title level={2} className="page-title">Shopping Cart</Title>
      <Row gutter={24}>
        <Col span={16}>
          <Card className="product-card">
          <div className="select-all">
            <Checkbox 
              checked={selectAll}
              onChange={handleSelectAll}
            >
              All ({order?.orderItems?.length} products)
            </Checkbox>
            <Text className="price-header">Selling Price</Text>
            <Text className="price-header"></Text>
            <Text className="price-header">Quantity-Total Amount</Text>
            <Button 
              type="text" 
              icon={<DeleteOutlined />} 
              className="delete-btn"
              onClick={handleDeleteSelected}
              disabled={selectedItems.length === 0}
            />
          </div>
            <Divider />
            {order?.orderItems?.map((orderItem) => (
              <div className="product-item" key={orderItem.product}>
                <Divider />
                <List.Item className="product-details">
                  <Checkbox 
                    checked={selectedItems.includes(orderItem.product)}
                    onChange={() => handleSelectItem(orderItem.product)}
                  />
                  <div className="product-info">
                    <img src={orderItem?.image} alt="Product" className="product-image" />
                    <div>
                      <Text strong className="product-name-1">{orderItem?.name}</Text>
                      <div className="product-price">
                        {orderItem?.discount > 0 ? (
                          <>
                            <Text delete className="original-price">
                              ${(orderItem.price).toFixed(2)} 
                            </Text>
                            <Text strong className="current-price">
                              ${(orderItem.price * (1 - (orderItem.discount / 100))).toFixed(2)} 
                            </Text>
                            <Text strong className="discount">{orderItem?.discount}% Discount</Text>
                            {/* <br />
                        <Text>Số lượng còn lại: {order.countInStock}</Text>
                        <br />
                        <Text>Đã bán: {order.selled}</Text> */}
                          </>
                        ) : (
                          <Text strong className="current-price">
                            ${(orderItem.price).toFixed(2)} 
                          </Text>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="quantity-control">
                    <Button
                      icon={<MinusOutlined />}
                      onClick={() => handleQuantityChange(orderItem.product, 'decrease')}
                      disabled={orderItem.amount <= 1} 
                    />
                    <InputNumber value={orderItem?.amount} readOnly className="quantity-input" />
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => handleQuantityChange(orderItem.product, 'increase')}
                    />
                  </div>
                  <Text strong className="total-price-1">
                    {((orderItem?.price * orderItem?.amount * (1 - (orderItem.discount || 0) / 100)) || 0).toFixed(2)}$
                  </Text>
                  <Button 
                    type="text" 
                    icon={<DeleteOutlined />} 
                    className="delete-btn" 
                    onClick={() => handleDelete(orderItem.product)} 
                  />
                </List.Item>
              </div>
            ))}
          </Card>
        </Col>
        <Col span={8}>
          <Card className="order-summary">
            <div className="shipping-info">
              <Text className="address"><EnvironmentOutlined /> Delivery to: {`${user?.address}, ${user?.city}`}</Text>
              <Button type="link" className="change-btn" onClick={handleChangeAddress}>Change Address</Button>
            </div>
            <Divider />
            <div className="discounts">
              <Space direction="vertical">
                <Text className="subtotal">
                <DollarCircleOutlined /> Estimated Price: {subtotal.toFixed(2)}$
                  </Text>
                <Text className="shipping-fee">
                  <CarOutlined /> Shipping Fee: {shippingFee.toFixed(2)}$
                </Text>
              </Space>
            </div>
            <Divider />
            <div className="totals">
              <Text><GiftOutlined /> Total Discount Price: {totalDiscount.toFixed(2)}$</Text>
              <Title level={4} className="grand-total">Total Payment: {totalAmount.toFixed(2)}$</Title>
            </div>
            <Button type="primary" block className="purchase-btn" onClick={() => handleAddCart()}>Purchase ({selectedItems.length})</Button> 
          </Card>
        </Col>
      </Row>
      <Modal
        title="User Information"
        open={isModalOpenInfor}
        onCancel={handleCancelUpdateInfor}
        onOk={handleConfirmInfor}
      >
        <Loading isPending={isPending}>
        <Form layout="vertical" form={form}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please enter the user name" },
              ]}
            >
              <Input
                placeholder="Enter your name"
                value={stateUserDetails.name}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: true, message: "Please enter the address" }]}
            >
              <Input
                placeholder="Enter your address"
                value={stateUserDetails.address}
                onChange={handleOnchangeDetails}
                name="address"
              />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please enter the city" }]}
            >
              <Input
                placeholder="Enter your city"
                value={stateUserDetails.city}
                onChange={handleOnchangeDetails}
                name="city"
              />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[{ required: true, message: "Please enter your phone" }]}
            >
              <Input
                type="number"
                placeholder="Enter your phone"
                value={stateUserDetails.phone}
                onChange={handleOnchangeDetails}
                name="phone"
              />
            </Form.Item>
          </Form>
        </Loading>
      </Modal>
    </div>
  );
};

export default OrderPage;
